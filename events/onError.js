const bot = require('../bot.js');

bot.on('error', (err) => {
//TODO: Log errors to a file in the future
console.log(err);
});