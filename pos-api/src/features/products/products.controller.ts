import { Request, Response } from 'express';
import { productsService } from './products.service';
import { productsValidation } from '../../validations/products.validation';
import { validate } from '../../validations/validation';

export const productsController = {
  async create(req: Request, res: Response) {
    const productsRequest = req.body;
    let files: Express.Multer.File[] = [];

    if (Array.isArray(req.files)) {
      files = req.files;
    } else if (req.files) {
      files =
        (req.files as Record<string, Express.Multer.File[]>).productImages ||
        [];
    }

    const createdProduct = await productsService.create(productsRequest, files);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: createdProduct,
    });
  },

  async getAll(req: Request, res: Response) {
    const query = validate(productsValidation.getAll, req.query);

    const { products, meta } = await productsService.getAll(query);

    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully',
      data: {
        products,
        meta,
      },
    });
  },
};
