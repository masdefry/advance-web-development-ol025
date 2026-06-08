import { addMinutes } from 'date-fns';
import { prisma } from '../../database/database';
import { AppError } from '../../utils/app-error.util';

export const transactionsService = {
  async create({
    customerName,
    payment,
    change,
    paymentMethod,
    transactionItems,
    cashierId,
  }: any) {
    const productIds = transactionItems.map((item: any) => {
      return item?.productId;
    });

    console.log(productIds);

    const findProductsByIds = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    let totalPrice = 0;

    transactionItems?.forEach((item: any) => {
      findProductsByIds?.forEach((product: any) => {
        if (item?.productId === product?.id) {
          totalPrice += product?.price * item?.quantity;
        }
      });
    });
    
    if (totalPrice !== payment - change)
      throw AppError('Total payment incorrect', 400);

    await prisma.transaction.create({
      data: {
        customerName,
        paymentMethod,
        payment,
        change,
        totalPrice,
        totalItem: transactionItems?.length,
        expiryAt: addMinutes(new Date(), 2),
        status: 'WAITING_FOR_PAYMENT',
        cashierId,
      },
    });
  },
};