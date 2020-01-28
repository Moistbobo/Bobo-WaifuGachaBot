import { ICommandArgs } from '../../../models/ICommandArgs';
import GlobalTools from '../../../tools/GlobalTools';
import MongoDbHelper from '../../../services/MongoDbHelper';
import Tools from './tools';
import VndbHelper from '../../../services/VndbHelper';
import MALHelper from '../../../services/MALHelper';

const action = async (args: ICommandArgs) => {
  const {
    msg: {
      content, author: user, channel, guild: { id: serverId, name: serverName },
    }, trigger, botClient,
  } = args;
  const seriesName = GlobalTools.removeTriggerFromMsg(trigger, content);

  if (seriesName.length <= 1) {
    channel.send(GlobalTools.createEmbed({ contents: 'Series name should be more than one character.' }, true));
    return;
  }

  try {
    channel.startTyping(15);
    const characters = await MongoDbHelper.findWaifuInSeries(seriesName);
    const serverClaims = await MongoDbHelper.fetchClaimedWaifuForServer(serverId);

    if (characters.length === 0) {
      const embed = GlobalTools.createEmbed({ contents: `No characters found for series ${seriesName}` });
      return channel.send(embed);
    }

    const [firstCharacter] = characters;
    const { series, type } = firstCharacter;

    const characterList = Tools.createCharacterList(characters, serverClaims);

    if (type === 'vn') {
      const vnInformation = await VndbHelper.getVnWithTitle(series);
      const embed = vnInformation
        ? Tools.generateVnSeriesInfoEmbed({ user, characterList, vnInformation })
        : Tools.generateSeriesInfoEmbed({ user, characterList, series });
      channel.send(embed);
    } else if (type === 'manga') {
      const mangaInfo = await MALHelper.getMangaWithTitle(series);

      const embed = mangaInfo
        ? Tools.generateMangaSeriesInfoEmbed({ user, characterList, mangaInfo })
        : Tools.generateSeriesInfoEmbed({ user, characterList, series });

      channel.send(embed);
    } else {
      const embed = Tools.generateSeriesInfoEmbed({ user, characterList, series });
      channel.send(embed);
    }
  } catch (error) {
    GlobalTools.logErrorToConsole(error, serverId, serverName);

    const embed = GlobalTools.createEmbed(
      {
        contents: `An error has occured. Please include this information if submitting a bug report:
            \`\`\`Command: ${trigger}\nError: ${error}\`\`\``,
      },
    );

    channel.send(embed);
  } finally {
    channel.stopTyping(true);
  }
};

export default action;
