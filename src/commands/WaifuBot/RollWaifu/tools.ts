import { Client, Message, User } from 'discord.js';
import { ICharacter } from '../../../models/ICharacter';
import GlobalTools from '../../../tools/GlobalTools';
import MongoDbHelper from '../../../services/DbHelpers/WaifuDbHelper';

const createRollWaifuEmbed = (character: ICharacter, claimingUser?: User) => {
  const {
    name, nameJp, type, nameAlt, gender, series, images, meta, _id,
  } = character;

  if (claimingUser) {
    return GlobalTools.createEmbed(
      {
        image: images && images[0],
        contents: `${nameJp}\n${series}`,
        title: name,
        footer: `Claimed by: ${claimingUser.username}`,
      },
    );
  }

  return GlobalTools.createEmbed(
    {
      image: images && images[0],
      contents: `${nameJp}\n${series}`,
      title: name,
      footer: `Type: ${type} | ID: ${_id}`,
    },
  );
};

interface createClaimReactArgs {
    message: Message;

    botClient: Client;

    characterInfo: ICharacter;
}
const createClaimReactCollector = (args: createClaimReactArgs) => {
  const {
    message, message: { channel, guild: { id: serverId } }, botClient: { user: { id: botId } }, characterInfo,
  } = args;
  const validClaimEmoji = ['💖', '💗', '💞', '💓'];

  const claimEmoji = validClaimEmoji[GlobalTools.getRandomInt(validClaimEmoji.length - 1)];
  const reactionFilter = (reaction: any, user: User) => user.id !== botId && reaction.emoji.name === claimEmoji;
  message.react(claimEmoji)
    .then(() => {
      message.awaitReactions(reactionFilter, { max: 1, time: 15000 })
        .then((collected) => {
          const collectingUser = collected.first().users.array()[1];
          const { id: ownerId, username } = collectingUser;
          const { _id: characterId, name: characterName, series } = characterInfo;

          MongoDbHelper.writeClaimStatusToDb({
            serverId, characterId, ownerId, seriesName: series,
          });

          const claimedEmbed = createRollWaifuEmbed(characterInfo, collectingUser);

          const claimConfirmEmbed = GlobalTools.createEmbed({
            contents: `${username} has claimed ${characterName}`,
          });

          message.edit(claimedEmbed);
          channel.send(claimConfirmEmbed);
        }).catch(() => {
          message.clearReactions();
          console.log(`Claim period for ${characterInfo.name} has ended.`);
        });
    });
};

export default {
  createRollWaifuEmbed,
  createClaimReactCollector,
};
