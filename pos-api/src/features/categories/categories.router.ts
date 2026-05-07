import { categoriesController } from './categories.controller';
import { Router } from 'express';

export const categoriesRouter = Router();

categoriesRouter.post('/', categoriesController.create);
