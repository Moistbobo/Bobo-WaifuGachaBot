let waifulist = require('../helpers/loadwaifu').rollList;

exports.run = async (message, bot) => {

	if(Math.floor(Math.random()*2)== 0){
        require('../helpers/claimWaifuEmbedGenerator').createAndSendClaimEmbed(waifulist.animeWaifu, message, bot);
    }else{
        require('../helpers/claimWaifuEmbedGenerator').createAndSendClaimEmbed(waifulist.mangaWaifu, message, bot);
    }
};

exports.conf = {
	name: "Roll Waifu",
	fullcmd: "waifu",
	alias: "w",
	description: "Roll a random waifu from the waifu list",
	timer: 1250
};