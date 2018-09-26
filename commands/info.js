let allSeries = require('../helpers/loadwaifu').rollList.allSeries;
let allWaifu = require('../helpers/loadwaifu').rollList.allWaifu;
let rollList = require('../helpers/loadwaifu').rollList;
let Discord = require('discord.js');

exports.run = (message, bot) => {

    let args = message.args.toLowerCase();
    if (allSeries[args]) {
        let series = allSeries[args];

        // Pagenate the names
        let maxNamePerPage = 10;
        let pagedNames = [];
        let tempList = [];
        let counter = 0;
        series.names.sort().forEach((name) => {
            tempList.push(name);
            counter++;
            if (counter % maxNamePerPage === 0 || counter === series.names.length) {
                pagedNames.push(tempList);
                tempList = [];
            }
        });

        let nameList = pagedNames[0].map((content) =>
            content + '\n');
        let emb = new Discord.RichEmbed()
            .setTitle(message.args.toUpperCase())
            .setColor(0xE06666)
            .setDescription(`Series Type: ${rollList['metaData'][args]['type']} \n ${rollList['metaData'][args]['url']} 
			\n**Obtainable Characters [${series.names.length}]:** \n ${nameList.toString().replace(/,/g, '')}`)
            .setThumbnail(rollList['metaData'][args]['img'])
            .setFooter(`1/${pagedNames.length}`);

        message.channel.send(emb).then(msg => {
            if (series.names.length > maxNamePerPage) {
                msg.react('◀').then(r => msg.react('▶'));
                let filter = (reaction, user) => user.id !== bot.user.id;
                let collector = msg.createReactionCollector(filter, {time: 30000});
                let index = 0;
                collector.on('collect', e => {
                    switch (e.emoji.name) {
                        case '◀':
                            index--;
                            break;
                        case '▶':
                            index++;
                            break;
                    }

                    index = normalizeValue(index, pagedNames.length);

                    let nameList = pagedNames[index].map((content) =>
                        content + '\n');
                    let emb = new Discord.RichEmbed()
                        .setTitle(message.args.toUpperCase())
                        .setColor(0xE06666)
                        .setDescription(`Series Type: ${rollList['metaData'][args]['type']} \n ${rollList['metaData'][args]['url']} 
			\n**Obtainable Characters [${series.names.length}]:** \n ${nameList.toString().replace(/,/g, '')}`)
                        .setThumbnail(rollList['metaData'][args]['img'])
                        .setFooter(`${index + 1}/${pagedNames.length}`);

                    msg.edit(emb).then().catch();
                });

                collector.on('end', e => {
                    msg.clearReactions().then().catch();
                });
            }
        });
    }

    // Scan all waifus
    if (allWaifu[args]) {
        let waifu = allWaifu[args];

        let emb = new Discord.RichEmbed()
            .setTitle(`${waifu.name}`)
            .setColor(0x00AE86)
            .setDescription(`${waifu.series}\n\nRequested by: ${message.author.username}`)
            .setImage(`${waifu.img[0]}`)
            .setFooter(`1/${waifu.img.length}`);

        message.channel.send(emb).then(msg => {
            if (waifu.img.length > 1) {
                msg.react('◀').then(r => msg.react('▶'));
                let filter = (reaction, user) => user.id !== bot.user.id;
                let collector = msg.createReactionCollector(filter, {time: 30000});
                let index = 0;

                collector.on('collect', e => {
                    switch (e.emoji.name) {
                        case '◀':
                            index--;
                            break;
                        case '▶':
                            index++;
                            break;
                    }

                    index = normalizeValue(index, waifu.img.length);

                    let emb = new Discord.RichEmbed()
                        .setTitle(`${waifu.name}`)
                        .setColor(0x00AE86)
                        .setDescription(`${waifu.series}\n\nRequested by: ${message.author.username}`)
                        .setFooter(`${index + 1}/${waifu.img.length}`)
                        .setImage(`${waifu.img[index]}`);

                    msg.edit(emb).then().catch();
                });

                collector.on('end', e => {
                    msg.clearReactions().then().catch();
                });
            }
        });
        return;
    }
};

let normalizeValue = (num, max) => {
    if (num < 0) return max - 1;
    if (num > max - 1) return 0;
    return num;
}

exports.conf = {
    name: "Show Image",
    fullcmd: "info",
    alias: "im",
    description: "Show additional information of a character",
    timer: 500
};