import Discord from 'discord.js';
import mongoose from 'mongoose';
import Commands from './commands';
import { ICommandArgs } from './models/ICommandArgs';
import { ICommand } from './models/ICommand';
import AppConfig from './AppConfig';
import MongoDbHelper from './services/db/MongoDbHelper';

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

    const commandToRun:ICommand | undefined = Commands.find((command) => {
      if (command.name.toLowerCase() === userCommand
      || command.triggers.includes(userCommand)) {
        return command;
      }

      return null;
    });

    const commandArgs: ICommandArgs = {
      msg,
      trigger: userCommand,
    };

    if (commandToRun) {
      commandToRun.action(commandArgs);
    }
  };

  const client = new Discord.Client();

  client.on('message', onMessage);
  client.on('disconnect', MongoDbHelper.disconnect);
  client.on('error', MongoDbHelper.disconnect);

  client.login(token)
    .then(() => {
      console.log('Commands: \n', Commands.map((command) => command.name));
      console.log(`\n Bobo Waifu bot version ${AppConfig.version} ready \n`);
    })
    .catch((err: Error) => {
      console.log('Failed to login\n', err.message);
    });
};

export default {
  runBot,
};
