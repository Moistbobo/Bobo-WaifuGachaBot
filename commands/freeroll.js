let waifulist = require('../helpers/loadwaifu').rollList;

exports.run = async (message, bot) => {

	let rand = Math.floor(Math.random() * 4 );
	console.log(rand);
	switch(rand){
		case 0:
            require('../helpers/claimWaifuEmbedGenerator').createAndSendClaimEmbed(waifulist.animeWaifu, message, bot);
			break;
		case 1:
            require('../helpers/claimWaifuEmbedGenerator').createAndSendClaimEmbed(waifulist.mangaWaifu, message, bot);
			break;
		case 2:
            require('../helpers/claimWaifuEmbedGenerator').createAndSendClaimEmbed(waifulist.vnGameWaifu, message, bot);
			break;
		case 3:
            require('../helpers/claimWaifuEmbedGenerator').createAndSendClaimEmbed(waifulist.kpopWaifu, message, bot);
			break;
	}

};

exports.conf = {
	name: "FreeRoll Waifu",
	fullcmd: "freeroll",
	alias: "fr",
	description: "Roll a waifu from all available lists. BDO characters are omitted",
	timer: 300,
	tokenCost: 0
};