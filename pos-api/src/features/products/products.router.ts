import { productsController } from './products.controller';
import { Router } from 'express';

export const productsRouter = Router();

productsRouter.post('/', productsController.create);
