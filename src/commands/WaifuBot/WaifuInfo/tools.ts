import { Client, Message, User } from 'discord.js';
import { ICharacter } from '../../../models/ICharacter';
import GlobalTools from '../../../tools/GlobalTools';
import { IServerClaims } from '../../../models/IServerClaims';

const createWaifuInfoEmbed = (character: ICharacter, imageIndex = 0, owner?: User) => {
  const {
    name, nameJp, type, nameAlt, gender, series, images, meta, _id,
  } = character;

  return GlobalTools.createEmbed(
    {
      image: images && images[imageIndex],
      contents: `Name JP: ${nameJp}\nSeries: ${series}`,
      title: name,
      footer: owner ? `Claimed by ${owner.username}` : `Type: ${type} | ID: ${_id}`,
      footerImage: owner ? owner.avatarURL : '',
    },
  );
};

const outputCharacterInfo = (
  args: {botClient: Client, characterInfo: ICharacter},
  sentMessage: Message | Message[] | undefined,
) => {
  const { botClient, characterInfo } = args;
  const { images } = characterInfo;
  const message = sentMessage as Message;

  if (images.length === 1 || !sentMessage) return;

  const reactionFilter = (reaction: any, user: User) => (
    user.id !== botClient.user.id && (reaction.emoji.name === '⬅' || reaction.emoji.name === '➡')
  );

  let imageIndex = 0;

  const onCollect = (reaction: any) => {
    const { emoji: { name: emojiName } } = reaction;
    if (emojiName === '⬅') imageIndex -= 1;
    else if (emojiName === '➡') imageIndex += 1;

    if (imageIndex < 0) imageIndex = images.length - 1;
    else if (imageIndex > images.length - 1) imageIndex = 0;

    const embed = createWaifuInfoEmbed(characterInfo, imageIndex);

    message.edit(embed);
  };

  message.react('⬅')
    .then(() => message.react('➡'))
    .then(() => {
      const collector = message.createReactionCollector(reactionFilter);
      collector.on('collect', onCollect);
    });
};

export default {
  createWaifuInfoEmbed,
  outputCharacterInfo,
};
