import { Message } from 'discord.js';
import { ICommandArgs } from '../../../models/ICommandArgs';
import MongoDbHelper from '../../../services/MongoDbHelper';
import { ICharacter } from '../../../models/ICharacter';
import Tools from './tools';
import { IServerClaims } from '../../../models/IServerClaims';
import GlobalTools from '../../../tools/GlobalTools';
import Errors from '../errors';


const action = (args: ICommandArgs) => {
  const { botClient, msg: { channel, guild, guild: { id: serverId, name: serverName } } } = args;

  let characterInfo: ICharacter;

  MongoDbHelper.fetchRandomWaifuFromDb()
    .then((waifu: ICharacter[]) => {
      [characterInfo] = waifu;

      const { _id: characterId } = characterInfo;

      console.log(serverId, characterId);
      return MongoDbHelper.fetchClaimStatusFromDb(serverId, characterId);
    })
    .then((_claimStatus: IServerClaims) => {
      if (!_claimStatus) {
        const embed = Tools.createRollWaifuEmbed(characterInfo);

        return channel.send(embed);
      }

      const { ownerId } = _claimStatus;
      const { user } = GlobalTools.findGuildMemberWithId(guild, ownerId);

      if (!user) {
        throw new Error(Errors.OWNER_NOT_FOUND_ERROR);
      }

      const embed = Tools.createRollWaifuEmbed(characterInfo, user);
      channel.send(embed);
    })
    .then((message: Message) => {
      Tools.createClaimReactCollector({ message, botClient, characterInfo });
    })
    .catch((err:Error) => {
      GlobalTools.logErrorToConsole(err, serverId, serverName);
      if (err.message === Errors.OWNER_NOT_FOUND_ERROR) {
        const embed = GlobalTools.createEmbed(
          {
            contents: 'Owner not found for character. This is a db related issue.',
          },
        );
        channel.send(embed);
      }
    });
};

export default action;
