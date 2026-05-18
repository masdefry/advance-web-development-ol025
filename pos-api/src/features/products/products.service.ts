import { Prisma } from '../../../generated/prisma/client';
import { FILE_UPLOAD_DIRECTORY } from '../../configs/dotenv.config';
import { prisma } from '../../database/database';
import { ProductsCreateRequest, ProductsListQuery } from './products.model';
import { cloudinaryUpload } from '../../lib/cloudinary.lib';
import redisConfig from '../../database/redis';

export const productsService = {
  async create(
    productsRequest: ProductsCreateRequest,
    files: Express.Multer.File[],
  ) {
    return await prisma.$transaction(
      async (tx) => {
        const createdProduct = await tx.product.create({
          data: {
            ...productsRequest,
            price: parseInt(productsRequest.price),
            isAvailable: Boolean(productsRequest.isAvailable),
          },
        });

        /* DISK STORAGE: */
        // const productImagesRequest = files?.map((file: Express.Multer.File) => {
        //   return {
        //     url: `${FILE_UPLOAD_DIRECTORY}/${file.filename}`,
        //     productId: createdProduct.id,
        //   };
        // });

        /* MEMORY STORAGE FOR CLOUDINARY: */
        const cloudinaryUploaded: any = files?.map(async (file) => {
          const { secureUrl } = await cloudinaryUpload(file?.buffer);
          return { url: secureUrl, productId: createdProduct.id };
        });

        const productIMagesRequest = await Promise.all(cloudinaryUploaded);

        await tx.productImage.createMany({
          data: productIMagesRequest,
        });

        return {
          name: productsRequest.name,
          price: productsRequest.price,
          categoryId: productsRequest.categoryId,
        };
      },
      {
        timeout: 10000,
      },
    );
  },

  async getAll(query: ProductsListQuery) {
    const offset = (query.page - 1) * query.limit;
    const where: Prisma.ProductWhereInput = {};
    const redisKey = `products:${query.page}`;

    if (query.search)
      where.name = { contains: query.search, mode: 'insensitive' };
    if (query.categoryId) where.categoryId = query.categoryId;

    let cacheProducts = await redisConfig.get(redisKey);

    if (cacheProducts) {
      cacheProducts = await JSON.parse(cacheProducts);

      return {
        products: cacheProducts?.products,
        meta: cacheProducts?.meta,
      };
    }

    console.log('cacheProducts Not Found');
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip: offset,
        include: {
          productImages: true,
        },
      }),

      prisma.product.count({ where }),
    ]);

    await redisConfig.set(
      redisKey,
      JSON.stringify({
        products,
        meta: {
          page: query.page,
          limit: query.limit,
          total,
          totalPage: Math.ceil(total / query.limit),
        },
      }),
      'EX',
      30,
    );

    return {
      products,
      meta: {
        page: query.page,
        limit: query.limit,
        total,
        totalPage: Math.ceil(total / query.limit),
      },
    };
  },
};
