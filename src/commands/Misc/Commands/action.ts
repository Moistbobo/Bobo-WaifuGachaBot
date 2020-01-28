import { ICommandArgs } from '../../../models/ICommandArgs';
import Commands from '../../index';
import GlobalTools from '../../../tools/GlobalTools';

const action = (args: ICommandArgs) => {
  const { msg: { channel } } = args;

  const extraFields = Commands.map((command, index) => {
  	const { name, triggers, description } = command;

  	return {
	    name: (index + 1).toString(),
	    value: `\n\n**${name}**\n__Triggers__\n${triggers.join(', ')}\n__Description__\n${description}`,
	    inline: true,
    };
  });

  const embed = GlobalTools.createEmbed({
	  contents: 'List of Commands',
	  extraFields,
  });

  channel.send(embed);
};

export default action;
