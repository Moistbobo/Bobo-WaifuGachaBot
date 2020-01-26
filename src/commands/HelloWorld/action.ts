import { ICommandArgs } from '../../models/ICommandArgs';

const action = (args: ICommandArgs) => {
  const { msg, msg: { channel } } = args;

  // Split the message by spaces
  // First index will always be the command trigger

  const msgArgs = msg.content.split(' ');

  channel.send(`Entered content:\n \`\`\`${msg.content}\`\`\``);
};

export default action;
