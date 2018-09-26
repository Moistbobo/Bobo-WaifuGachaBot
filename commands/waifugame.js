let waifulist = require('../helpers/loadwaifu').rollList;
let Discord = require('discord.js');

exports.run = async (message, bot) => {
    require('../helpers/claimWaifuEmbedGenerator').createAndSendClaimEmbed(waifulist.vnGameWaifu, message, bot);
};

exports.conf = {
	name: "Roll Waifu from game",
	fullcmd: "waifugame",
	alias: "wg",
	description: "Roll a random waifu from the waifugame list",
	timer: 1250
};