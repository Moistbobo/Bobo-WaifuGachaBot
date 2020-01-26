import { ICommandArgs } from '../../../models/ICommandArgs';
import MongoDbHelper from '../../../services/db/MongoDbHelper';

const action = (args: ICommandArgs) => {
  const { msg: { channel } } = args;
  MongoDbHelper.rollWaifuV2()
    .then((waifu: any) => {
      console.log(waifu[0]);
      channel.send(`Rolled waifu: \`\`\`${JSON.stringify(waifu[0], null, 4)}\`\`\``);
    });
};

export default action;
