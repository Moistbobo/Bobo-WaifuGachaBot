let waifulist = require('../helpers/loadwaifu').rollList;
let cmds = require('../helpers/loadcommands').cmdDetail;
let Discord = require('discord.js');

exports.run = async (message, bot) => {

    console.log(cmds);

    let msg = '';
    cmds.sort((a,b)=>{
        return b.cost < a.cost? 1
            : b.cost > a.cost ? -1
            :0;
    });
    cmds.forEach((cmd) => {
        msg += `\n\n**^${cmd.cmdName}** [**^${cmd.alias}**] [${cmd.cost}] - ${cmd.description}`
    });

    let emb = new Discord.RichEmbed()
        .setTitle(`Available commands`)
        .setDescription(msg);

    message.channel.send(emb);
};

exports.conf = {
    name: "Help",
    fullcmd: "help",
    alias: "cmds",
    description: "Show available commands",
    timer: 300,
    tokenCost: 0
};