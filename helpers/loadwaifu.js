"use strict";
let loadList = () => {
	let ret = {allSeries: {}, allWaifu: {}};
	let waifulist = {};
	let waifuNames = [];
	let bdoMemberList = [];
	let animeWaifu = {};
	let vnGameWaifu = {};
	let metaData = {};
	let bdoMembers = {names: [], datalist: {}};
	let fs = require('fs');
	// @ts-ignore
	fs.readdir('./Assets', function (err, files) {
		// @ts-ignore
		files.forEach(function (file) {
			let test = JSON.parse(fs.readFileSync('./Assets/' + file, 'utf8'));

			// Add the waifu name to a different array, sorted by series
			let seriesName = file.substr(2, file.length).replace('.json', '');
			let waifuBySeries = {
				waifu: []
			};
			let series = {names: [], datalist: {}};
			metaData[seriesName.toLowerCase()] = {
				url: test.url,
				img: test.img,
				description: test.description,
				type: test.type
			};
			switch (test['type']) {
				case 'Anime':
					test['waifus'].forEach((waifu) => {
						waifu.series = seriesName;
						series.names.push(waifu.name);
						series.datalist[waifu.name] = waifu;
						animeWaifu[waifu.series] = series;
					});
					break;
				case 'BDO':
					test['members'].forEach((member) => {
						member.guild = seriesName;

						bdoMemberList.push(member);
						waifuBySeries.waifu.push(member.name);
					});
					break;
				case 'VN/Game':
					test['waifus'].forEach((waifu) => {
						waifu.series = seriesName;
						series.names.push(waifu.name);
						series.datalist[waifu.name] = waifu;
						vnGameWaifu[waifu.series] = series;
					});
					break;
				case 'GAME':
					test['waifus'].forEach((waifu) => {
						waifu.series = seriesName;
						waifulist[waifu.name] = waifu;
						waifuBySeries.waifu.push(waifu.name);
						waifuNames.push(waifu.name);
					});
					break;
			}

		});

		ret.animeWaifu = animeWaifu;
		ret.vnGameWaifu = vnGameWaifu;
		ret.metaData = metaData;

		Object.keys(animeWaifu).forEach((series) => {
			let seriesListing = {};
			seriesListing[series] = animeWaifu[series];
			ret.allSeries[series.toLowerCase()] = {names: seriesListing[series].names};

			Object.keys(animeWaifu[series].datalist).forEach((waifuName) => {
				ret.allWaifu[waifuName.toLowerCase()] = animeWaifu[series].datalist[waifuName];
			});
		});

		Object.keys(vnGameWaifu).forEach((series) => {
			let seriesListing = {};
			seriesListing[series] = vnGameWaifu[series];
			ret.allSeries[series.toLowerCase()] = {names: seriesListing[series].names};

			Object.keys(vnGameWaifu[series].datalist).forEach((waifuName) => {
				ret.allWaifu[waifuName.toLowerCase()] = vnGameWaifu[series].datalist[waifuName];
			});
		});
		console.log(ret);
	});


	return ret;
};

const rollList = loadList();

exports.rollList = rollList;

