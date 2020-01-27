import { ICommandArgs } from '../../../models/ICommandArgs';
import MongoDbHelper from '../../../services/db/MongoDbHelper';
import { ICharacter } from '../../../models/ICharacter';
import GlobalTools from '../../../tools/GlobalTools';

const action = (args: ICommandArgs) => {
  const { msg: { channel } } = args;
  MongoDbHelper.rollWaifu()
    .then((waifu: ICharacter[]) => {
      console.log(waifu[0]);
      const {
        name, nameJp, type, nameAlt, gender, series, images, meta, _id,
      } = waifu[0];
      const embed = GlobalTools.createEmbed(
        {
          image: images && images[0],
          contents: `${nameJp}\n${series}`,
          title: name,
          footer: `Type: ${type} | ID: ${_id}`,
        },
      );

      channel.send(embed);
    });
};

export default action;
