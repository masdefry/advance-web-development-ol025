import cron from 'node-cron';
import { expiryTransactionsJob } from './expiry-transactions.job';

export const expiryTransactionsSchedule = {
  execute() {
    cron.schedule('* * * * *', () => {
      expiryTransactionsJob?.update();
    });
  },
};
