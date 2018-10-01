let waifulist = require('../helpers/loadwaifu').rollList;

exports.run = async (message, bot) => {
    require('../helpers/claimWaifuEmbedGenerator').createAndSendClaimEmbed(waifulist.kpopHusbando, message, bot);
};

exports.conf = {
    name: "Roll Kpop Husbando",
    fullcmd: "kpophusbandp",
    alias: "kpoph",
    description: "Roll a random husbando from the kpop husbando list",
    timer: 1250
};