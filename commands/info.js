let waifulist = require('../helpers/loadwaifu').rollList;
let Discord = require('discord.js');

exports.run = (message, bot) => {
	if (waifulist[message.args.toLowerCase()]) {

		let series = waifulist[message.args.toLowerCase()];
		let msg = series.waifu.map((content) =>
			content + '\n');
		let emb = new Discord.RichEmbed()
			.setTitle(message.args)
			.setColor(0xE06666)
			.setDescription(`Series Type: ${series.type} \n ${series.url} 
			\n**Obtainable Characters:** \n ${msg.toString().replace(/,/g, '')}`)
			.setThumbnail(series.img);

		message.channel.send(emb);
		return;
	}

	// Scan all waifus
	if(waifulist.waifulist[message.args]){
		let waifu = waifulist.waifulist[message.args];

		let series = waifulist[message.args.toLowerCase()];
		let emb = new Discord.RichEmbed()
			.setTitle(`${waifu.name}`)
			.setColor(0x00AE86)
			.setDescription(`${waifu.series}\n\n${message.author.username}`)
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