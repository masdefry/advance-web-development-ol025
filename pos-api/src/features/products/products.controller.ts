import { Request, Response } from 'express';
import { productsService } from './products.service';

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
      data: createdProduct
    })
  },
};
