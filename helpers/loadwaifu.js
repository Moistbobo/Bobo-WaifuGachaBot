"use strict";
let loadList = () => {
	let ret = {};
	let waifulist = {};
	let waifuNames = [];
	let bdoMemberList = [];
	let animeWaifu = {};
	let vnGameWaifu = {};
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
			switch (test['type']) {
				case 'Anime':
					test['waifus'].forEach((waifu) => {
						waifu.series = seriesName;
						let name = waifu.name;
						waifulist[name] = waifu;
						waifuBySeries.waifu.push(waifu.name);
						waifuNames.push(waifu.name);

						series.names.push(waifu.name);
						series.datalist[waifu.name] = waifu;
						animeWaifu[waifu.series] = series;
					});
					break;
				case 'BDO':
					test['members'].forEach((member) => {
						member.guild = seriesName;
						let tempMember = {};
						tempMember[member.name] = member;
						//waifulist[member.name] = member;
						bdoMemberList.push(member);
						waifuBySeries.waifu.push(member.name);
						//waifuNames.push(member.name);
					});
					break;
				case 'VN/Game':
					test['waifus'].forEach((waifu) => {
						waifu.series = seriesName;
						let tempWaifu = {};
						waifulist[waifu.name] = waifu;

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
			// ret['waifulist'] = waifulist;
			// ret['bdoMemberList'] = bdoMemberList.sort();
			// ret['seriesListing'] = {};
			// ret['waifuNames'] = waifuNames;
			// waifuBySeries['name'] = seriesName;
			// waifuBySeries['url'] = test.url;
			// waifuBySeries['img'] = test.img;
			// waifuBySeries['type'] = test.type;
			// waifuBySeries['description'] = test.description;
			// waifuBySeries.waifu.sort();
			// ret[seriesName.toLowerCase()] = waifuBySeries;


			ret.animeWaifu = animeWaifu;
			ret.vnGameWaifu = vnGameWaifu;
		});
	});

	return ret;
};

const rollList = loadList();

exports.rollList = rollList;

