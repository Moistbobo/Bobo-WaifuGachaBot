let waifulist = require('../helpers/loadwaifu').rollList;
let Discord = require('discord.js');

exports.run = async (message, bot) => {
	require('../helpers/claimWaifuEmbedGenerator').createAndSendClaimEmbed(waifulist.animeWaifu, message, bot);

};

exports.conf = {
	name: "Roll Waifu",
	fullcmd: "waifu",
	alias: "w",
	description: "Roll a random waifu from the waifu list",
	timer: 1250
};