let waifulist = require('../helpers/loadwaifu').rollList;
let Discord = require('discord.js');

exports.run = async (message, bot) => {
    require('../helpers/claimWaifuEmbedGenerator').createAndSendClaimEmbed(waifulist.vnGameHusbando, message, bot);
};

exports.conf = {
	name: "Roll Husbando from game",
	fullcmd: "husbandogame",
	alias: "hg",
	description: "Roll a random husbando from the husbando list",
	timer: 1250
};