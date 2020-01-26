import { ICommandArgs } from '../../../models/ICommandArgs';

const action = (args: ICommandArgs) => {
  const { msg: { channel } } = args;

  // as of 0.0.1-b
  channel.send(`
  Instructions: Fill in your character's information and submit the data using the Add waifu command. \`\`\`{
"name": "",
"gender": "",
"series":"",
"image": "",
"meta":""
}\`\`\``);
};

export default action;
