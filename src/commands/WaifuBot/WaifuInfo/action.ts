import { Message } from 'discord.js';
import { ICommandArgs } from '../../../models/ICommandArgs';
import { ICharacter } from '../../../models/ICharacter';
import AppConfig from '../../../AppConfig';
import Tools from './tools';
import GlobalTools from '../../../tools/GlobalTools';
import Errors from '../errors';
import WaifuDbHelper from '../../../services/DbHelpers/WaifuDbHelper';
import { IServerClaims } from '../../../models/IServerClaims';

const action = (args: ICommandArgs) => {
  const {
    msg: {
      guild: { members, id: serverId, name: serverName }, channel, content, author: { id: senderId },
    }, trigger, botClient,
  } = args;
  const characterName = content.replace(`${AppConfig.commandPrefix}${trigger}`, '').trim();

  if (characterName.length <= 1) {
    channel.send(GlobalTools.createEmbed({ contents: 'Character name should be more than 1 character' }));
    return;
  }

  let characterInfo: ICharacter;
  WaifuDbHelper.findWaifuForName(characterName)
    .then(async (characters: ICharacter[]) => {
      if (characters.length === 0) {
        throw new Error(Errors.NO_CHARACTER_FOUND);
      } else if (characters.length > 1) {
        // Since the next promise chain expects a promise that resolves to a message, we need to write a custom
        // promise that allows the user to pick from a list of characters that have the same name and then
        // outputting the selected character's information
        return new Promise<Message | Message[]>((resolve, reject) => {
          try {
            const contents = `
          More than one character found with name \`${characterName}\` Enter the a number to proceed\n`
                    + `${characters.map(
                      (character, index) => `${index + 1}: ${character.name} - ${character.series}\n`,
                    ).join('\n')}`;

            const embed = GlobalTools.createEmbed({ contents });
            channel.send(embed)
              .then((sentMessage) => {
                const message = sentMessage as Message;

                const collectorOptions = { maxMatches: 1, time: 15000 };
                const filter = (m: Message) => (
                  !Number.isNaN(Number.parseInt(m.content, 10)) && m.author.id === senderId
                );

                message.channel.awaitMessages(filter, collectorOptions)
                  .then((collected) => {
                    const enteredNumber = Number.parseInt(collected.first().content, 10);
                    const selectedCharacter = characters[enteredNumber - 1];
                    characterInfo = selectedCharacter;
                    const msgEmbed = Tools.createWaifuInfoEmbed(selectedCharacter);

                    resolve(channel.send(msgEmbed));
                  });
              });
          } catch (err) {
            console.log(`${Errors.DUPLICATE_CHARACTER_ERROR}: ${err.message}`);
            reject(new Error(Errors.DUPLICATE_CHARACTER_ERROR));
          }
        });
      } else {
        [characterInfo] = characters;
        const { id: characterId } = characterInfo;
        const claimedInfo: IServerClaims | null = await WaifuDbHelper.fetchClaimStatusFromDb(serverId, characterId);
        if (claimedInfo) {
          const owningMember = members.find((member) => member.id === claimedInfo.ownerId);
          const embed = Tools.createWaifuInfoEmbed(characterInfo, 0, owningMember.user);

          return channel.send(embed);
        }
        const embed = Tools.createWaifuInfoEmbed(characterInfo);

        return channel.send(embed);
      }
    })
    .then((sentMessage: Message | Message[] | undefined) => (
      Tools.outputCharacterInfo({ botClient, characterInfo }, sentMessage)))
    .catch((err: Error) => {
      GlobalTools.logErrorToConsole(err, serverId, serverName);
      if (err.message === Errors.NO_CHARACTER_FOUND) {
        channel.send(GlobalTools.createEmbed({ contents: `Could not find a character named ${characterName}` }));
      } else {
        channel.send(GlobalTools.createEmbed({ contents: 'General error. Please report this to the devleoper' }));
      }
    });
};

export default action;
