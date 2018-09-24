let sqlite3 = require('sqlite3').verbose();

// For testing purposes
exports.saveWaifu = (waifuList) => {
	let db = new sqlite3.Database('./waifu.db', (err) => {
		if (err) {
			console.log('help');
			return console.log(err.message);
		}
	});

	db.serialize(() => {
		let waifus = waifuList.map((waifu) => `('${waifu.name}', '${JSON.stringify(waifu.img)}', '${waifu.series}')`).join(',');

		try {
			db.run('CREATE TABLE IF NOT EXISTS waifu(name text PRIMARY KEY, img text, series text)');
			db.run('INSERT OR IGNORE INTO waifu(name, img, series) VALUES ' + waifus);
		} catch (err) {
			console.log(err.message);
		}


		db.close();
	})
};

exports.getWaifu = (waifuName) => {
	let db = new sqlite3.Database('./waifu.db', (err) => {
		if (err) {
			return console.log(err.message);
		}
	});

	let waifu = undefined;

	console.log('lets go nibbers');
	db.each(`SELECT *
	FROM waifu
	WHERE name = ?`, [waifuName], (err, row) => {
		if (err) {
			return console.log(err.message);
		}
		console.log(`${JSON.parse(row.img)[0]}`);
		waifu = {
			name: row.name,
			img: JSON.parse(row.img),
			series: row.series
		};
	});

	db.close();

	return waifu;
};
