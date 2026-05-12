import { Prisma } from '../../../generated/prisma/client';
import { FILE_UPLOAD_DIRECTORY } from '../../configs/dotenv.config';
import { prisma } from '../../database/database';
import { ProductsCreateRequest, ProductsListQuery } from './products.model';
import { cloudinaryUpload } from '../../lib/cloudinary.lib';

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

    if (query.search)
      where.name = { contains: query.search, mode: 'insensitive' };
    if (query.categoryId) where.categoryId = query.categoryId;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip: offset,
      }),

      prisma.product.count({ where }),
    ]);

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
