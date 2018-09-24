let allSeries = require('../helpers/loadwaifu').rollList.allSeries;
let allWaifu = require('../helpers/loadwaifu').rollList.allWaifu;
let rollList = require('../helpers/loadwaifu').rollList;
let Discord = require('discord.js');

exports.run = (message, bot) => {

	let args = message.args.toLowerCase();
	if(allSeries[args]){
		let series = allSeries[args];
		let msg = series.names.map((content) =>
			content + '\n');
		let emb = new Discord.RichEmbed()
			.setTitle(message.args.toUpperCase())
			.setColor(0xE06666)
			.setDescription(`Series Type: ${rollList['metaData'][args]['type']} \n ${rollList['metaData'][args]['url']} 
			\n**Obtainable Characters [${series.names.length}]:** \n ${msg.toString().replace(/,/g, '')}`)
			.setThumbnail(rollList['metaData'][args]['img']);

		message.channel.send(emb);
		return;
	}

	// Scan all waifus
	if(allWaifu[args]){
		let waifu = allWaifu[args];

		let emb = new Discord.RichEmbed()
			.setTitle(`${waifu.name}`)
			.setColor(0x00AE86)
			.setDescription(`${waifu.series}\n\nRequested by: ${message.author.username}`)
			.setImage(`${waifu.img[0]}`);

		message.channel.send(emb);
		return;
	}
};

exports.conf = {
	name: "Show Image",
	fullcmd: "info",
	alias: "im",
	description: "Show additional information of a character",
	timer: 500
};