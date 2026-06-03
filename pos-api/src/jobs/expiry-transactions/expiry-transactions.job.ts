import { prisma } from '../../database/database';

export const expiryTransactionsJob = {
  async update() {
    const expiredTransactions = await prisma.transaction.updateMany({
      where: {
        expiryAt: {
          lte: new Date(),
        },
      },
      data: {
        status: 'EXPIRY',
      },
    });

    console.log(
      `[⌚CRONN] ${expiredTransactions.count} transations has been expiry`,
    );
  },
};
