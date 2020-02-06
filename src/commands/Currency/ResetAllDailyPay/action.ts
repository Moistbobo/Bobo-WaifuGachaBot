import { ICommandArgs } from '../../../models/ICommandArgs';
import GlobalTools from '../../../tools/GlobalTools';
import CurrencyDbHelpers from '../../../services/DbHelpers/CurrencyDbHelpers';

const action = (args: ICommandArgs) => {
  const { msg: { channel, member } } = args;
  if (!member.hasPermission(['MANAGE_GUILD'])) {
    const embed = GlobalTools.createEmbed({ contents: 'You do not have permissions to use this command' });
    return channel.send(embed);
  }
  try {
    CurrencyDbHelpers.resetAllDailyPayStatus()
      .then((res) => {
        console.log(res);
        const embed = GlobalTools.createEmbed({ contents: 'Timely pay status for all users successfully reset.' });
        return channel.send(embed);
      });
  } catch (error) {
    console.log(error);
  }
};

export default action;
