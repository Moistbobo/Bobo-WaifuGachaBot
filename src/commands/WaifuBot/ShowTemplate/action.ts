import { ICommandArgs } from '../../../models/ICommandArgs';

const action = (args: ICommandArgs) => {
  const { msg: { channel } } = args;

  // as of 0.0.1-b
  channel.send(`
  Instructions: Fill in your character's information and submit the data using the Add waifu command.
  \n
  Optional fields:\n nameJp, nameAlt, images, meta\`\`\`{
"name": "",
"nameJp::"",
"nameAlt": ["",""]:
"type": "",
"series":"",
"gender": "",
"images": ["", ""],
"meta":""
}\`\`\``);
};

export default action;
