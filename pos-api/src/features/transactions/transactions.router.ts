import { Router } from 'express';
import { transactionsController } from './transactions.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

export const transactionsRouter = Router();

transactionsRouter.post(
  '/',
  authMiddleware.verifyToken,
  authMiddleware.requireAuth(['CASHIER']),
  transactionsController.create,
);
