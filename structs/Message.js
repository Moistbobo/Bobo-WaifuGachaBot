let bot = require('../bot');

const extendMessage = (message) => {

	let _message = message;

	let cmd = message.content.substr(1, message.content.length).split(' ')[0];
	_message.cmd = cmd.toLowerCase();
	_message.args = message.content.replace(bot.conf.prefix + cmd,'').trim();

	return _message;
};

module.exports = extendMessage;