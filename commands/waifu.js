let waifulist = require('../helpers/loadwaifu').rollList;
let Discord = require('discord.js');

exports.run = async (message, bot) => {
	let randWaifuName = waifulist.waifuNames[Math.floor(Math.random() * waifulist.waifuNames.length)];
	let waifu = waifulist.waifulist[randWaifuName];

	console.log(randWaifuName);
	console.log(waifu);
	let embed = new Discord.RichEmbed()
		.setTitle(`${waifu.name}`)
		.setColor(0x00AE86)
		.setDescription(`${waifu.series}\n\nRolled by: ${message.author.username}`)
		.setImage(`${waifu.img[0]}`);
	message.channel.send(embed).then(
		// Create the reactionCollector
		message => {
			message.react(message.guild.emojis.get('492394595393732618'));
			//message.react('💓');
			let filter = (reaction, user) => reaction.emoji.id === '492394595393732618' && user.id !== bot.user.id;
			let collector = message.createReactionCollector(filter, {time: 15000});
			collector.on('collect', r => {
				collector.stop();
				message.clearReactions().then();
			});
			collector.on('end', collected => {
				if (collected.get('492394595393732618')) {
					let userID = collected.get('492394595393732618').users.lastKey();
					message.channel.send('<@' + userID + '>' + ' has claimed ' + waifu.name + '!');
					let claimedEmbed = new Discord.RichEmbed()
						.setTitle(`${waifu.name}`)
						.setColor(0xE06666)
						.setDescription(`${waifu.series}\n\nRolled by: ${collected.get('492394595393732618').users.get(userID).username}`)
						.setImage(`${waifu.img[0]}`)
						.setFooter(`Claimed by ${collected.get('492394595393732618').users.get(userID).username}`,
							collected.get('492394595393732618').users.get(userID).avatarURL);

					message.edit(claimedEmbed);
				}
				message.clearReactions().then();
			});
		}
	);
};

exports.conf = {
	name: "Roll Waifu",
	fullcmd: "waifu",
	alias: "w",
	description: "Roll a random waifu from the waifu list",
	timer: 1250
};