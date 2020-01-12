import Discord from 'discord.js';
import Commands from './commands';
import { CommandArgs } from './models/CommandArgs';
import { Command } from './models/Command';
import AppConfig from './AppConfig';

const runBot = (token: string|undefined) => {
  if (!token) {
    console.log('Bot Token is undefined');
    return;
  }

  const onMessage = (msg: Discord.Message) => {
    const { commandPrefix } = AppConfig;

    if (!commandPrefix) {
      console.error('Please enter a bot prefix in the .env file');
      return;
    }

    const userCommand = msg.content.split(' ')[0].toLowerCase().replace(commandPrefix, '').trim();

    const commandToRun:Command | undefined = Commands.find((command) => {
      if (command.name.toLowerCase() === userCommand
      || command.triggers.includes(userCommand)) {
        return command;
      }

      return null;
    });

    const commandArgs: CommandArgs = {
      msg,
      trigger: userCommand,
    };

    if (commandToRun) {
      commandToRun.action(commandArgs);
    }
  };

  const client = new Discord.Client();

  client.on('message', onMessage);

  client.login(token)
    .then(() => {
      console.log('Bot logged in');
      console.log('Commands: \n', Commands.map((command) => command.name));
    })
    .catch((err: Error) => {
      console.log('Failed to login\n', err.message);
    });
};

export default {
  runBot,
};
