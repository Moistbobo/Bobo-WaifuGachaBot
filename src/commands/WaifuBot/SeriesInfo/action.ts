import { Promise } from 'mongoose';
import { ICommandArgs } from '../../../models/ICommandArgs';
import GlobalTools from '../../../tools/GlobalTools';
import MongoDbHelper from '../../../services/MongoDbHelper';
import { ICharacter } from '../../../models/ICharacter';
import Errors from '../errors';
import { IServerClaims } from '../../../models/IServerClaims';

const action = (args: ICommandArgs) => {
  const {
    msg: {
      content, author: { username, avatarURL }, channel, guild: { id: serverId, name: serverName },
    }, trigger,
  } = args;
  const seriesName = GlobalTools.removeTriggerFromMsg(trigger, content);

  if (seriesName.length <= 1) {
    channel.send(GlobalTools.createEmbed({ contents: 'Series name should be more than one character.' }, true));
    return;
  }

  Promise.all([MongoDbHelper.findWaifuInSeries(seriesName),
    MongoDbHelper.fetchClaimedWaifuForServer(serverId)])
    .then((response: [ICharacter[], IServerClaims[]]) => {
      const [characters, serverClaims] = response;

      if (!characters || characters.length === 0) {
        throw new Error(Errors.NO_CHARACTER_FOUND);
      }
      // get the actual series name from the first character
      const [first] = characters;
      const { series } = first;

      const contents = characters.map((character: ICharacter) => {
        const { id, name } = character;
        const isClaimed = serverClaims.find((claims) => claims.characterId === id);

        return `• ${name} ${isClaimed ? '💞' : ''} `;
      });

      const embed = GlobalTools.createEmbed(
        {
          title: `Characters in ${series}`,
          contents: `${contents.join('\n')}\nTotal Characters: ${characters.length}`,
          footer: `Requested by: ${username}`,
          footerImage: avatarURL,
        },
      );

      channel.send(embed);
    })
    .catch((error: Error) => {
      const { message } = error;

      GlobalTools.logErrorToConsole(error, serverId, serverName);

      if (message === Errors.NO_CHARACTER_FOUND) {
        const embed = GlobalTools.createEmbed({ contents: `No characters found for series ${seriesName}` });
        channel.send(embed);
      }
    });
};

export default action;
