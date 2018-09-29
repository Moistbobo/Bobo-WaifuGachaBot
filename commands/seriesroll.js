let waifulist = require('../helpers/loadwaifu');
let Discord = require('discord.js');

exports.run = async (message, bot) => {

    let allSeries = waifulist.rollList.allSeries;

    if(!allSeries.hasOwnProperty(message.args.toLowerCase())){
        message.channel.send(`${message.channel.args} is not in my db, go lick a dick`);
        return;
    }

    let series = allSeries[message.args.toLowerCase()];

    let characterName = series.names[Math.floor(Math.random() * series.names.length)];

    let waifu = waifulist.rollList.allWaifu[characterName.toLowerCase()];

    let embed = new Discord.RichEmbed()
        .setTitle(`${waifu.name}`)
        .setColor(0x00AE86)
        .setDescription(`${waifu.series}\n\nRolled by: ${message.author.username}`)
        .setImage(`${waifu.img[0]}`)
        .setFooter(`NSFW does not appear in series roll.`);
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
    name: "Series Roll",
    fullcmd: "SeriesRoll",
    alias: "sr",
    description: "Roll a random character from a particular series (includes male and female)",
    timer: 1250,
    tokenCost: 5
};