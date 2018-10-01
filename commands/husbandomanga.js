let waifulist = require('../helpers/loadwaifu').rollList;
let Discord = require('discord.js');

exports.run = async (message, bot) => {
	require('../helpers/claimWaifuEmbedGenerator').createAndSendClaimEmbed(waifulist.mangaHusbando, message, bot);

};

exports.conf = {
	name: "Roll Husbando Manga",
	fullcmd: "husbandomanga",
	alias: "hm",
	description: "Roll a random husbando from the husbando manga list",
	timer: 1250,
    tokenCost: 5
};