import cron from 'cron';
import { UserCurrency } from '../../models/UserCurrency';

const resetDailyPayStatuses = new cron.CronJob('0 0 12 * * *', () => {
  UserCurrency.updateMany({}, { claimedDailyPay: false, rolledDaily: false })
    .then((res) => {
      console.log(res);
      console.log('Daily timely and gacha reset successfully');
    });
});

resetDailyPayStatuses.start();

const getNextResetTime = () => resetDailyPayStatuses.nextDate();

const getUserCurrencyForId = (userId: string) => UserCurrency.findOne({ userId });

const resetAllDailyPayStatus = () => UserCurrency.updateMany(
  {}, { claimedDailyPay: false },
);


const CurrencyDbHelpers = {
  getNextResetTime,
  getUserCurrencyForId,
  resetAllDailyPayStatus,
};

export default CurrencyDbHelpers;
