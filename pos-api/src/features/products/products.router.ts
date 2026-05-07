import { productsController } from './products.controller';
import { Router } from 'express';
import { multerUploads } from '../../lib/multer.lib';

export const productsRouter = Router();

productsRouter.post(
  '/',
  multerUploads.uploads(['jpg', 'jpeg', 'png', 'webp', 'svg']).fields([
    {
      name: 'productImages',
      maxCount: 3,
    },
  ]),
  productsController.create,
);
