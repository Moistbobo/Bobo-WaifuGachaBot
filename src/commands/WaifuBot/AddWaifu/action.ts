import { ICommandArgs } from '../../../models/ICommandArgs';
import GlobalTools from '../../../tools/GlobalTools';
import AppConfig from '../../../AppConfig';
import MongoDbHelper from '../../../services/DbHelpers/WaifuDbHelper';

const action = (args: ICommandArgs) => {
  const { msg: { content, channel, guild: { id: serverID, name: serverName } }, trigger } = args;

  try {
    const characterArgs = JSON.parse(content.replace(`${AppConfig.commandPrefix}${trigger}`, '').trim());

    channel.send(GlobalTools.createEmbed({
      contents: `Attempting to save data: \`\`\`${JSON.stringify(characterArgs)}\`\`\``,
    }));

    MongoDbHelper.writeWaifuToDb(characterArgs)
      .then(() => {
        channel.send(`Character, ${characterArgs.name} saved successfully`);
      })
      .catch((err) => {
        console.log('Something happened while saving character.');
      });
  } catch (error) {
    GlobalTools.logErrorToConsole(error, serverID, serverName);
  	channel.send(GlobalTools.createEmbed({
      contents: 'Error parsing add information',
    }));
  }
};

export default action;
