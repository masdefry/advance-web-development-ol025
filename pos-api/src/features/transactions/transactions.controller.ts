import { Request, Response } from 'express';
import { transactionsService } from './transactions.service';

export const transactionsController = {
  async create(req: Request, res: Response) {
    const { customerName, payment, change, paymentMethod, transactionItems } =
      req?.body;

    const payload = res?.locals?.payload;

    await transactionsService.create({
      customerName,
      payment,
      change,
      paymentMethod,
      transactionItems,
      cashierId: payload?.userId,
    });

    res.status(201).json({
      success: true,
      message: 'Transaction created successgfully',
      data: {
        customerName,
      },
    });
  },
};
