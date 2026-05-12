import { productsController } from './products.controller';
import { Router } from 'express';
import { multerUploads } from '../../lib/multer.lib';
import { authMiddleware } from '../../middlewares/auth.middleware';

export const productsRouter = Router();

productsRouter.post(
  '/',
  authMiddleware.verifyToken, 
  authMiddleware.requireAuth(['ADMIN']),
  multerUploads.uploads(['jpg', 'jpeg', 'png', 'webp', 'svg']).fields([
    {
      name: 'productImages',
      maxCount: 3,
    },
  ]),
  productsController.create,
);

productsRouter.get('/', productsController.getAll);
