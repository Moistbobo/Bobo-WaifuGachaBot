let botToken = require('./config').botToken;

"use strict";

const Discord = require('discord.js');
const bot = new Discord.Client();
module.exports = bot;

require('./events/onMessage');
require('./events/onError');
require('./helpers/loadcommands').load();
bot.login(botToken);

bot.conf = {
	prefix: '^',
	claimTimeout: '15'
};
