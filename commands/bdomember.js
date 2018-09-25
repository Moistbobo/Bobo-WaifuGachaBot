let waifulist = require('../helpers/loadwaifu').rollList;
let Discord = require('discord.js');

exports.run = (message, bot) => {
	let rollList = waifulist.bdoWaifu;
	let guild = Object.keys(rollList)[Math.floor(Math.random() * Object.keys(rollList).length)];
	let guildRoster = rollList[guild].datalist;

	let member = guildRoster[Object.keys(guildRoster)[Math.floor(Math.random() * Object.keys(guildRoster).length)]];

	let embed = new Discord.RichEmbed()
		.setTitle(`${member.name}`)
		.setColor(0x00AE86)
		.setDescription(`${member.series}\n\nRolled by: ${message.author.username}`)
		.setImage(`${member.img[0]}`);

	message.channel.send(embed);
};

exports.conf = {
	name: "Roll BDO Member",
	fullcmd: "bdomember",
	alias: "bm",
	description: "Roll a random BDO player from an actual guild",
	timer: 1500
};