import { Message, User } from 'discord.js';
import { ICommandArgs } from '../../../models/ICommandArgs';
import GlobalTools from '../../../tools/GlobalTools';
import MongoDbHelper from '../../../services/DbHelpers/WaifuDbHelper';
import Tools from './tools';
import VndbHelper from '../../../services/VndbHelper';
import MALHelper from '../../../services/MALHelper';

const action = async (args: ICommandArgs) => {
  const {
    msg: {
      content, author, author: { id: userId }, channel, guild: { id: serverId, name: serverName },
    }, trigger,
  } = args;
  const itemsPerPage = 20;
  let seriesName = GlobalTools.removeTriggerFromMsg(trigger, content);
  const hasModifier = seriesName.includes('-info');
  if (hasModifier) {
    seriesName = seriesName.replace('-info', '').trim();
  }

  if (seriesName.length <= 1) {
    channel.send(GlobalTools.createEmbed({ contents: 'Series name should be more than one character.' }, true));
    return;
  }

  try {
    channel.startTyping();
    const characters = await MongoDbHelper.findWaifuInSeries(seriesName);

    if (characters.length === 0) {
      const embed = GlobalTools.createEmbed({ contents: `No characters found for series ${seriesName}` });
      channel.stopTyping(true);
      return channel.send(embed);
    }

    const [firstCharacter] = characters;
    const { series, type } = firstCharacter;

    const serverClaims = await MongoDbHelper.fetchClaimedWaifuForServerAndSeries(serverId, series);

    const characterList = Tools.createCharacterList(characters, serverClaims);
    let embed;
    const initialCharacterList = characterList.length > itemsPerPage
      ? characterList.slice(0, itemsPerPage).join('\n') : characterList.join('\n');

    if (hasModifier) {
      if (type === 'vn') {
        const vnInformation = await VndbHelper.getVnWithTitle(series);
        embed = vnInformation
          ? Tools.generateVnSeriesInfoEmbed({ author, characterList: initialCharacterList, vnInformation })
          : Tools.generateSeriesInfoEmbed({
            author,
            characterList: initialCharacterList,
            series,
            claimedAmount: serverClaims.length,
            amountClaimable: characterList.length,
          });
      } else if (type === 'manga') {
        const mangaInfo = await MALHelper.getMangaWithTitle(series);

        embed = mangaInfo
          ? Tools.generateMangaSeriesInfoEmbed({ author, characterList: initialCharacterList, mangaInfo })
          : Tools.generateSeriesInfoEmbed({
            author,
            characterList: initialCharacterList,
            series,
            claimedAmount: serverClaims.length,
            amountClaimable: characterList.length,
          });
      } else {
        embed = Tools.generateSeriesInfoEmbed({
          author,
          characterList: initialCharacterList,
          series,
          claimedAmount: serverClaims.length,
          amountClaimable: characterList.length,
        });
      }
    } else {
      embed = Tools.generateSeriesInfoEmbed({
        author,
        characterList: initialCharacterList,
        series,
        claimedAmount: serverClaims.length,
        amountClaimable: characterList.length,
      });
    }

    const message = await channel.send(embed) as Message;
    channel.stopTyping(true);
    if (characterList.length > itemsPerPage) {
      await message.react('⬅');
      await message.react('➡');

      let page = 0;

      const reactionFilter = (reaction: any, user: User) => (
        user.id === userId && (reaction.emoji.name === '⬅' || reaction.emoji.name === '➡')
      );

      const onCollect = (reaction: any) => {
        const { emoji: { name: emojiName } } = reaction;
        if (emojiName === '⬅') page -= 1;
        else if (emojiName === '➡') page += 1;

        if (page < 0) page = Math.floor(characterList.length / itemsPerPage);
        else if (page > Math.floor(characterList.length / itemsPerPage)) page = 0;

        const newMessage = GlobalTools.createEmbed({
          title: `Characters in ${series}`,
          contents: characterList.slice(page * itemsPerPage, (page + 1) * itemsPerPage).join('\n'),
          footer: `Page ${page + 1}/${Math.floor(characterList.length / itemsPerPage) + 1}`,
        });

        return message.edit(newMessage);
      };

      const reactionCollector = message.createReactionCollector(reactionFilter);
      reactionCollector.on('collect', onCollect);
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
