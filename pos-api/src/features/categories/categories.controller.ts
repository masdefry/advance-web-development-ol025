import { Request, Response } from 'express';
import { categoriesService } from './categories.service';

export const categoriesController = {
  async create(req: Request, res: Response) {
    const { name } = req.body;

    const createdCategory = await categoriesService.create({ name });

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: createdCategory,
    });
  },

  async getAll(req: Request, res: Response){
    const categories = await categoriesService.getAll()

    res.status(200).json({
      success: true, 
      message: 'Categories retrieved successfully', 
      data: categories
    })
  }
};
