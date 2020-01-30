import { ICommandArgs } from '../../../models/ICommandArgs';
import CurrencyDbHelpers from '../../../services/DbHelpers/CurrencyDbHelpers';
import { initialUserCurrency, UserCurrency } from '../../../models/UserCurrency';
import GlobalTools from '../../../tools/GlobalTools';
import AppConfig from '../../../AppConfig';

const action = (args: ICommandArgs) => {
  const { msg: { author: { id: userId }, channel } } = args;


  CurrencyDbHelpers.getUserCurrencyForId(userId)
	  .then((userCurrency: UserCurrency | null) => {
	  	const uc = userCurrency || new UserCurrency({ ...initialUserCurrency });

	  	const { currencyAmt } = uc;
	  	const { currencyPlural } = AppConfig;

	  	const embed = GlobalTools.createEmbed({ contents: `You have ${currencyAmt} ${currencyPlural}` });

	  	channel.send(embed);
	  });
};

export default action;
