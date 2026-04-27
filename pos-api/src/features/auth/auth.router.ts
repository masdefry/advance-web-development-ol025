import { authController } from './auth.controller';
import { Router } from 'express';

export const authRouter = Router();

authRouter.post('/', authController.register);