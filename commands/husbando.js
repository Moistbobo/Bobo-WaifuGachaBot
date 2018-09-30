let waifulist = require('../helpers/loadwaifu').rollList;
let Discord = require('discord.js');

exports.run = async (message, bot) => {
    if(Math.floor(Math.random()*2) == 0){
        require('../helpers/claimWaifuEmbedGenerator').createAndSendClaimEmbed(waifulist.animeHusbando, message, bot);
    }else{
        require('../helpers/claimWaifuEmbedGenerator').createAndSendClaimEmbed(waifulist.mangaHusbando, message, bot);
    }
};

exports.conf = {
    name: "Roll Husbando",
    fullcmd: "husbando",
    alias: "h",
    description: "Roll a random Husbando from the husbando list",
    timer: 1250
};