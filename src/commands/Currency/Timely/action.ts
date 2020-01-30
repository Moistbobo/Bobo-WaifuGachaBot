import { ICommandArgs } from '../../../models/ICommandArgs';
import CurrencyDbHelpers from '../../../services/DbHelpers/CurrencyDbHelpers';
import { initialUserCurrency, UserCurrency } from '../../../models/UserCurrency';
import GlobalTools from '../../../tools/GlobalTools';
import AppConfig from '../../../AppConfig';

const action = async (args: ICommandArgs) => {
  const { msg: { author: { id: userId }, channel } } = args;
  const timelyPay = 50;
  const ucResponse = await CurrencyDbHelpers.getUserCurrencyForId(userId);
  const uc: UserCurrency = ucResponse || new UserCurrency({ ...initialUserCurrency, userId });
  const { currencyPlural } = AppConfig;

  if (uc.claimedDailyPay) {
  	const nextPayTime = CurrencyDbHelpers.getNextResetTime();
  	const timeToNext = nextPayTime.fromNow();
  	const embed = GlobalTools.createEmbed({
      contents: `You have already claimed your daily pay.
  	Next collection ${timeToNext}`,
    });
  	channel.send(embed);
  	return;
  }

  uc.currencyAmt += timelyPay;
  uc.claimedDailyPay = true;

  await uc.save();

  const embed = GlobalTools.createEmbed({ contents: `You have collected ${timelyPay} ${currencyPlural} daily pay.` });
  channel.send(embed);
};

export default action;
