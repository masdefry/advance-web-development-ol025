import { authMiddleware } from '../../middlewares/auth.middleware';
import { authController } from './auth.controller';
import { Router } from 'express';

export const authRouter = Router();

authRouter.post(
  '/register',
  authMiddleware.verifyToken,
  authMiddleware.requireAuth(['ADMIN']),
  authController.register,
);
authRouter.post('/login', authController.login);
authRouter.post(
  '/account-verification/:accountActivationToken',
  authController.accountVerification,
);
