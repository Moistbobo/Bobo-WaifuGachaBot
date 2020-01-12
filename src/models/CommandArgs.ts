import * as Discord from 'discord.js';

export interface CommandArgs {
    // Message object
    msg: Discord.Message,

    // triggering text
    trigger: string,
}
