import * as Discord from 'discord.js';

export interface ICommandArgs {
    // Message object
    msg: Discord.Message,

    // triggering text
    trigger: string,

    botClient: Discord.Client,
}
