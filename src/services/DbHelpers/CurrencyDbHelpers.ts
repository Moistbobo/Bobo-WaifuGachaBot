import cron from 'cron';
import { UserCurrency } from '../../models/UserCurrency';

const resetDailyPayStatuses = new cron.CronJob('0 0 12 * * *', () => {
  console.log('resetting daily pay status');
  UserCurrency.updateMany({}, { claimedDailyPay: false, rolledDaily: false });
});

resetDailyPayStatuses.start();

const getNextResetTime = () => resetDailyPayStatuses.nextDate();

const getUserCurrencyForId = (userId: string) => UserCurrency.findOne({ userId });

const CurrencyDbHelpers = {
  getNextResetTime,
  getUserCurrencyForId,
};

export default CurrencyDbHelpers;
