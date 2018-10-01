let waifulist = require('../helpers/loadwaifu').rollList;
let Discord = require('discord.js');

exports.run = async (message, bot) => {
	require('../helpers/claimWaifuEmbedGenerator').createAndSendClaimEmbed(waifulist.mangaWaifu, message, bot);

};

exports.conf = {
	name: "Roll Waifu Manga",
	fullcmd: "waifumanga",
	alias: "wm",
	description: "Roll a random waifu from the waifu manga list",
	timer: 1250,
    tokenCost: 5
};