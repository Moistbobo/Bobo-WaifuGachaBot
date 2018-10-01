let waifulist = require('../helpers/loadwaifu').rollList;

exports.run = async (message, bot) => {
    require('../helpers/claimWaifuEmbedGenerator').createAndSendClaimEmbed(waifulist.kpopWaifu, message, bot);
};

exports.conf = {
    name: "Roll Kpop Waifu",
    fullcmd: "kpopwaifu",
    alias: "kpop",
    description: "Roll a random waifu from the kpop waifu list",
    timer: 1250,
    tokenCost: 10
};