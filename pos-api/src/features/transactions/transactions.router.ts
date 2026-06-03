import { Router } from 'express';
import { transactionsController } from './transactions.controller';

export const transactionsRouter = Router();

transactionsRouter.post('/', transactionsController.create);