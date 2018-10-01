"use strict";

let loadList = () => {
    let ret = {allSeries: {}, allWaifu: {}};

    let animeWaifu = {};
    let mangaWaifu = {};
    let vnGameWaifu = {};
    let bdoWaifu = {};
    let metaData = {};
    let totalCounts = {};
    let kpopWaifu = {};

    let animeHusbando = {};
    let mangaHusbando = {};
    let vnGameHusbando = {};
    let kpopHusbando = {};

    let totalWaifu = 0;
    let fs = require('fs');

    // @ts-ignore
    fs.readdir('./Assets/Characters', function (err, files) {
        // @ts-ignore
        files.forEach(function (file) {
            let test = JSON.parse(fs.readFileSync('./Assets/Characters/' + file, 'utf8'));

            let seriesName = file.substr(2, file.length).replace('.json', '');
            seriesName = seriesName.replace(/_/g, ' ');

            console.log(`Loading: ${seriesName}`);

            let series = {names: [], datalist: {}};
            metaData[seriesName.toLowerCase()] = {
                name: seriesName,
                url: test.url,
                img: test.img,
                description: test.description,
                type: test.type,
                extraTag: test.extraTag
            };

            let isFemale = file.substr(0, 1) === 'F' ? true : false;
            let fileTotal = 0;
            test['characters'].forEach((character) => {
                fileTotal++;
                character.series = seriesName;
                series.names.push(character.name);
                series.datalist[character.name] = character;
                switch (test['type']) {
                    case 'Anime':
                        isFemale ? animeWaifu[character.series] = series : animeHusbando[character.series] = series;
                        break;
                    case 'BDO':
                        bdoWaifu[character.series] = series;
                        break;
                    case 'Game':
                        isFemale ? vnGameWaifu[character.series] = series : vnGameHusbando[character.series] = series;
                        break;
                    case 'Manga':
                        isFemale ? mangaWaifu[character.series] = series : mangaHusbando[character.series] = series;
                        break;
                    case 'Kpop':
                        isFemale? kpopWaifu[character.series] = series: kpopHusbando[character.series] = series;
                        break;

                }
            });
            if (totalCounts.hasOwnProperty(test['type'])) {
                totalCounts[test['type']] = totalCounts[test['type']] += fileTotal;
            } else {
                totalCounts[test['type']] = fileTotal;
            }
            totalWaifu += fileTotal;
        });


        totalCounts.grandTotal = totalWaifu;
        // For random pulls
        ret.animeWaifu = animeWaifu;
        ret.vnGameWaifu = vnGameWaifu;
        ret.bdoWaifu = bdoWaifu;
        ret.animeHusbando = animeHusbando;
        ret.vnGameHusbando = vnGameHusbando;
        ret.mangaWaifu = mangaWaifu;
        ret.mangaHusbando = mangaHusbando;
        ret.kpopWaifu = kpopWaifu;
        ret.kpopHusbando = kpopHusbando;
        ret.metaData = metaData;
        ret.duplicateWaifuList = {};
        console.log(totalCounts);
        ret.totalCounts = totalCounts;


        let characterList = [
            animeWaifu,
            vnGameWaifu,
            bdoWaifu,
            animeHusbando,
            vnGameHusbando,
            mangaWaifu,
            mangaHusbando,
            kpopWaifu,
            kpopHusbando
        ];

        characterList.forEach((list) => {
            Object.keys(list).forEach((seriesName) => {
                if (ret.allSeries.hasOwnProperty(seriesName.toLowerCase())) {
                    list[seriesName].names.forEach((name) => {
                        ret.allSeries[seriesName.toLowerCase()].names.push(name);
                    })
                } else {
                    ret.allSeries[seriesName.toLowerCase()] = {names: list[seriesName].names}
                }

                Object.keys(list[seriesName].datalist).forEach((waifuName) => {
                    if (ret.allWaifu.hasOwnProperty(waifuName.toLowerCase())) {
                        if (metaData[seriesName.toLowerCase()].hasOwnProperty('extraTag')) {
                            let newWaifuName = waifuName + ' ' + metaData[seriesName.toLowerCase()]['extraTag'];
                            let existingWaifu = ret.allWaifu[waifuName.toLowerCase()];
                            ret.allWaifu[waifuName.toLowerCase().trim() + ' ' + metaData[existingWaifu.series.toLowerCase()].extraTag.toLowerCase()] = existingWaifu;
                            ret.allWaifu[newWaifuName.toLowerCase().trim()] = list[seriesName].datalist[waifuName];

                            let duplicateWaifuNames = [];
                            duplicateWaifuNames.push({
                                name: existingWaifu.name,
                                extraTag: metaData[existingWaifu.series.toLowerCase()].extraTag
                            });
                            duplicateWaifuNames.push({
                                name: waifuName,
                                extraTag: metaData[seriesName.toLowerCase()].extraTag
                            });
                            ret.duplicateWaifuList[waifuName.toLowerCase().trim()] = duplicateWaifuNames
                        }
                    } else {
                        ret.allWaifu[waifuName.toLowerCase().trim()] = list[seriesName].datalist[waifuName];
                    }
                })
            })
        });
    });
    return ret;
};

let loadNSFW = () => {
    let fs = require('fs');
    let file = JSON.parse(fs.readFileSync('./Assets/nsfw_list.json', 'utf8'));
    return file;
};

const rollList = loadList();
const nsfwList = loadNSFW();

exports.rollList = rollList;
exports.nsfwList = nsfwList;

