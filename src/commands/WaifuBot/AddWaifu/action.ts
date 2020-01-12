import { CommandArgs } from '../../../models/CommandArgs';
import Embed from '../../../helpers/Embed';
import AppConfig from '../../../AppConfig';

const action = (args: CommandArgs) => {
  const { msg, msg: { content, channel }, trigger } = args;

  try {
    console.log(content.replace(`${AppConfig.commandPrefix}${trigger}`, ''));
    const characterArgs = JSON.parse(content.replace(`${AppConfig.commandPrefix}${trigger}`, '').trim());

    channel.send(Embed.createEmbed({
      contents: `\`\`\`${JSON.stringify(characterArgs)}\`\`\``,
    }));
  } catch (error) {
  	channel.send(Embed.createEmbed({
      contents: 'Error parsing add information',
    }));
  }
};

export default action;
