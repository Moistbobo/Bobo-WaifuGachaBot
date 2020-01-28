import Discord, { Guild } from 'discord.js';
import { IEmbedArgs } from '../models/IEmbedArgs';
import AppConfig from '../AppConfig';

const createEmbed = (args: IEmbedArgs, error = false) => {
  const {
    footer, contents, author, url, title, image, thumbnail,
    extraFields, footerImage,
  } = args;

  const embed = new Discord.RichEmbed()
    .setColor(error ? '#f08080' : '#499369');

  if (footer) embed.setFooter(footer, footerImage);
  if (contents) embed.setDescription(contents);
  if (title) embed.setTitle(title);
  if (author) embed.setAuthor(author);
  if (url) embed.setURL(url);
  if (image) embed.setImage(image);
  if (thumbnail) embed.setThumbnail(thumbnail);

  if (extraFields) {
    extraFields.forEach((ef) => {
      if (ef.name === 'blank') {
        embed.addBlankField(ef.inline);
      } else {
        embed.addField(
          ef.name || '',
          ef.value || '',
          ef.inline || false,
        );
      }
    });
  }

  return embed;
};

const getRandomInt = (max:number) => Math.floor(Math.random() * Math.floor(max));

const findGuildMemberWithId = (
  guild: Guild, id: string,
) => guild.members.find((member) => member.id === id);

// In the future, this can be expanded
const logErrorToConsole = (error: Error, serverId: string, serverName: string) => {
  console.log(`Error ${error.message} occurred in server ${serverId} | ${serverName}`);
};

const removeTriggerFromMsg = (
  trigger: string, msgContent: string,
) => msgContent.replace(`${AppConfig.commandPrefix}${trigger}`, '').trim();

const GlobalTools = {
  createEmbed,
  getRandomInt,
  findGuildMemberWithId,
  logErrorToConsole,
  removeTriggerFromMsg,
};

export default GlobalTools;
