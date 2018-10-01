let totalWaifu = require('../helpers/loadwaifu').rollList;

exports.run = (message, bot) => {
    message.channel.send(`There are ${totalWaifu.totalCounts.grandTotal} characters in my database.`);
};

exports.conf = {
    name: "Total Characters",
    fullcmd: "total",
    alias: "t",
    description: "Show total characters that can be claimed",
    timer: 500
}