"use strict";

const Discord = require('discord.js');
const bot = new Discord.Client();
module.exports = bot;

require('./events/onMessage');
require('./helpers/loadcommands').load();
bot.login('NDE0OTk2NTc3MTQxMzkxMzY0.DoNsWA.Mp9zPbBKMrufNR6Q7zAiTqCNeH8');

bot.conf = {
	prefix: '^',
	claimTimeout: '15'
}
