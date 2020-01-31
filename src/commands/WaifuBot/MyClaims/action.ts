import { Message, User } from 'discord.js';
import { ICommandArgs } from '../../../models/ICommandArgs';
import WaifuDbHelper from '../../../services/DbHelpers/WaifuDbHelper';
import GlobalTools from '../../../tools/GlobalTools';

const action = async (args: ICommandArgs) => {
  const { msg: { channel, author: { id: userId, username }, guild: { id: serverId } } } = args;
  const itemsPerPage = 20;

  const claimed = await WaifuDbHelper.fetchUserClaimedWaifuForServer(userId, serverId);
  if (claimed.length === 0) {
    const embed = GlobalTools.createEmbed({ contents: `${username}, you have no claimed characters` });
    return channel.send(embed);
  }

  if (claimed.length < itemsPerPage) {
    const claimedCharacterIds = claimed.map((claim) => claim.characterId);

    const claimedCharacterInfo = await WaifuDbHelper.fetchCharactersById(claimedCharacterIds);

    const claimedCharacterMessage = claimedCharacterInfo.map(
      (character, index) => `[${index + 1}] ${character.name} - ${character.series}`,
    ).join('\n');

    const embed = GlobalTools.createEmbed({
      title: `${username}'s claimed characters`,
      contents: claimedCharacterMessage,
    });

    channel.send(embed);
  } else {
    const claimedCharacterIds = claimed.map((claim) => claim.characterId);

    const claimedCharacterInfo = await WaifuDbHelper.fetchCharactersById(claimedCharacterIds);

    let page = 0;

    const allClaimedInfo = claimedCharacterInfo.map(
      (character, index) => `${index + 1}) ${character.name} - ${character.series}`,
    );

    const embed = GlobalTools.createEmbed({
      title: `${username}'s claimed characters`,
      contents: allClaimedInfo.slice((page) * itemsPerPage, itemsPerPage).join('\n'),
    });

    const message = await channel.send(embed) as Message;
    await message.react('⬅');
    await message.react('➡');
    const reactionFilter = (reaction: any, user: User) => (
      user.id === userId && (reaction.emoji.name === '⬅' || reaction.emoji.name === '➡')
    );

    const onCollect = (reaction: any) => {
      const { emoji: { name: emojiName } } = reaction;
      if (emojiName === '⬅') page -= 1;
      else if (emojiName === '➡') page += 1;

      if (page < 0) page = Math.floor(allClaimedInfo.length / itemsPerPage);
      else if (page > Math.floor(allClaimedInfo.length / itemsPerPage)) page = 0;

      const newMessage = GlobalTools.createEmbed({
        title: `${username}'s claimed characters`,
        contents: allClaimedInfo.slice(page * itemsPerPage, (page + 1) * itemsPerPage).join('\n'),
      });

      return message.edit(newMessage);
    };

    const reactionCollector = message.createReactionCollector(reactionFilter);
    reactionCollector.on('collect', onCollect);
  }
};

export default action;
