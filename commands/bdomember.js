let waifulist = require('../helpers/loadwaifu').rollList;
let Discord = require('discord.js');

exports.run = (message, bot) => {
    require('../helpers/claimWaifuEmbedGenerator').createAndSendClaimEmbed(waifulist.bdoWaifu, message, bot);
};

exports.conf = {
	name: "Roll BDO Member",
	fullcmd: "bdomember",
	alias: "bdo",
	description: "Roll a random BDO player from an actual guild",
	timer: 1500,
    tokenCost: 1
};