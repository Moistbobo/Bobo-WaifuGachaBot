let waifulist = require('../helpers/loadwaifu').rollList;
let Discord = require('discord.js');

exports.run = (message, bot) => {
	let member = waifulist.bdoMemberList[Math.floor(Math.random() * waifulist.bdoMemberList.length)];

	let embed = new Discord.RichEmbed()
		.setTitle(`${member.name}`)
		.setColor(0x00AE86)
		.setDescription(`${member.guild}\n\nRolled by: ${message.author.username}`)
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