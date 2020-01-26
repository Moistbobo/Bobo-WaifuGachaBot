import { ICommandArgs } from '../../../models/ICommandArgs';
import Embed from '../../../helpers/Embed';
import AppConfig from '../../../AppConfig';
import MongoDbHelper from '../../../services/db/MongoDbHelper';

const action = (args: ICommandArgs) => {
  const { msg: { content, channel }, trigger } = args;

  try {
    console.log(content.replace(`${AppConfig.commandPrefix}${trigger}`, ''));
    const characterArgs = JSON.parse(content.replace(`${AppConfig.commandPrefix}${trigger}`, '').trim());

    channel.send(Embed.createEmbed({
      contents: `Attempting to save data: \`\`\`${JSON.stringify(characterArgs)}\`\`\``,
    }));

    MongoDbHelper.saveWaifu(characterArgs)
      .then(() => {
        channel.send(`Character, ${characterArgs.name} saved successfully`);
      })
      .catch((err) => {
        console.log('Something happened while saving character.');
      });
  } catch (error) {
  	channel.send(Embed.createEmbed({
      contents: 'Error parsing add information',
    }));
  }
};

export default action;
