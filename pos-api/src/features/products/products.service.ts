import { FILE_UPLOAD_DIRECTORY } from '../../configs/dotenv.config';
import { prisma } from '../../database/database';
import { ProductsCreateRequest } from './products.model';

export const productsService = {
  async create(
    productsRequest: ProductsCreateRequest,
    files: Express.Multer.File[],
  ) {
    const createdProduct = await prisma.product.create({
      data: {
        ...productsRequest,
        price: parseInt(productsRequest.price),
        isAvailable: Boolean(productsRequest.isAvailable),
      },
    });

    const productImagesRequest = files?.map((file: Express.Multer.File) => {
      return {
        url: `${FILE_UPLOAD_DIRECTORY}/${file.filename}`,
        productId: createdProduct.id,
      };
    });

    await prisma.productImage.createMany({
      data: productImagesRequest,
    });

    return {
      name: productsRequest.name,
      price: productsRequest.price,
      categoryId: productsRequest.categoryId,
    };
  },
};
