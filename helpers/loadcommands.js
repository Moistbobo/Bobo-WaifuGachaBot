const fs = require('fs');
let cmds = {};

let cmdHelp = [];

exports.load = () => {
	fs.readdir('./commands/', (err, files) => {
		if (err) return console.log(err);
		files.forEach(f => {
			try {
				let cmd = require("../commands/" + f);
				let name = f.slice(0, -3);
				cmds[name] = {run: cmd.run, conf: cmd.conf};
				cmds[cmd.conf.alias] = {run: cmd.run, conf: cmd.conf, timer: new Date().getTime()}

				cmdHelp.push({cmdName: name, alias:cmd.conf.alias, description: cmd.conf.description, cost: cmd.conf.tokenCost});
			} catch (err) {
				console.log(err);
			}
		})
	})
};

exports.reload = (cmd) => {
	try {
		let check = require('../commands/' + cmd);
		delete require.cache[require.resolve('../commands/' + cmd)];
		let good = require('../commands/' + cmd);
		cmds[cmd] = {run: good.run, conf: good.conf};
		return {worked: true};
	} catch (err) {
		delete cmds[cmd];
		return {worked: false, error: err};
	}
};

exports.getCmds = () => {
	return cmds;
};

exports.cmdDetail = cmdHelp;