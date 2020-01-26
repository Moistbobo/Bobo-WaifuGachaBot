import { ICommandArgs } from '../../../models/ICommandArgs';
import MongoDbHelper from '../../../services/db/MongoDbHelper';

const action = (args: ICommandArgs) => {
  const { msg: { channel } } = args;
  MongoDbHelper.rollWaifu()
    .then((waifu: any) => {
      console.log(waifu);
      channel.send('Rolled waifu:', JSON.parse(waifu));
    });
};

export default action;
