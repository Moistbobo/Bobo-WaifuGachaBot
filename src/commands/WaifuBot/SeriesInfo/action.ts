import { ICommandArgs } from '../../../models/ICommandArgs';
import GlobalTools from '../../../tools/GlobalTools';
import MongoDbHelper from '../../../services/MongoDbHelper';
import { ICharacter } from '../../../models/ICharacter';
import Errors from '../errors';
import Tools from './tools';
import { IServerClaims } from '../../../models/IServerClaims';
import VndbHelper from '../../../services/VndbHelper';

const action = async (args: ICommandArgs) => {
  const {
    msg: {
      content, author: user, channel, guild: { id: serverId, name: serverName },
    }, trigger,
  } = args;
  const seriesName = GlobalTools.removeTriggerFromMsg(trigger, content);

  if (seriesName.length <= 1) {
    channel.send(GlobalTools.createEmbed({ contents: 'Series name should be more than one character.' }, true));
    return;
  }

  try {
    const characters = await MongoDbHelper.findWaifuInSeries(seriesName);
    const serverClaims = await MongoDbHelper.fetchClaimedWaifuForServer(serverId);

    const [firstCharacter] = characters;
    const { series, type } = firstCharacter;

    const characterList = Tools.createCharacterList(characters, serverClaims);

    if (type === 'vn') {
      const vnInformation = await VndbHelper.getVnWithTitle(series);
      const embed = vnInformation ? Tools.generateVnSeriesInfoEmbed({ user, characterList, vnInformation })
        : Tools.generateSeriesInfoEmbed({ user, characterList, series });
      channel.send(embed);
    } else {
      const embed = Tools.generateSeriesInfoEmbed({ user, characterList, series });
      channel.send(embed);
    }
  } catch (error) {
    const { message } = error;

    GlobalTools.logErrorToConsole(error, serverId, serverName);

    if (message === Errors.NO_CHARACTER_FOUND) {
      const embed = GlobalTools.createEmbed({ contents: `No characters found for series ${seriesName}` });
      channel.send(embed);
    }
  }
};

export default action;
