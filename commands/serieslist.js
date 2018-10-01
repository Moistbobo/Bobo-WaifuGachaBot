let seriesList = require('../helpers/loadwaifu').rollList;
let Discord = require('discord.js');

let msg = '';
exports.run = (message, bot) => {

    // Lazy caching
    if (msg.length < 1) {
        console.log('rebuilding message');
        let allSeries = {
            Anime: [],
            Game: [],
            Manga: [],
            BDO: []
        };
        Object.keys(seriesList.allSeries).forEach(series => {
            allSeries[seriesList.metaData[series].type].push(seriesList.metaData[series].name);
        });

        // Sort everything before formatting into a proper output
        Object.keys(allSeries).forEach((seriesType) => {
            allSeries[seriesType].sort();

            msg += `\n**${seriesType} [${seriesList.totalCounts[seriesType]}]** \n `;

            allSeries[seriesType].forEach((series) => {
                msg += `${series} [${seriesList.allSeries[series.toLowerCase()].names.length}] \n`;
            });
        });
    }

    let emb = new Discord.RichEmbed()
        .setTitle('Rollable Series By Type:\n')
        .setDescription(msg+`\nTotal Rollable characters:${seriesList.totalCounts.grandTotal} \nDon't see your favorite anime? Contribute today! https://github.com/Moistbobo/WaifuBot`)

    message.author.send(emb).then(e => {
        message.react('📧').then();
    });

};

exports.conf = {
    name: 'Total',
    fullcmd: 'serieslist',
    alias: 'sl',
    description: 'List all rollable series',
    timer: 500
};