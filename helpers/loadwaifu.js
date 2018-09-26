"use strict";
let loadList = () => {
    let ret = {allSeries: {}, allWaifu: {}};


    let animeWaifu = {};
    let vnGameWaifu = {};
    let bdoWaifu = {};
    let metaData = {};

    let animeHusbando = {};
    let vnGameHusbando = {};

    let fs = require('fs');
    // @ts-ignore
    fs.readdir('./Assets', function (err, files) {
        // @ts-ignore
        files.forEach(function (file) {
            let test = JSON.parse(fs.readFileSync('./Assets/' + file, 'utf8'));

            // Add the waifu name to a different array, sorted by series

            let seriesName = file.substr(2, file.length).replace('.json', '');
            seriesName = seriesName.replace(/_/g, ' ');

            let series = {names: [], datalist: {}};
            metaData[seriesName.toLowerCase()] = {
                url: test.url,
                img: test.img,
                description: test.description,
                type: test.type
            };

            let isFemale = file.substr(0, 1) === 'F' ? true : false;

            test['characters'].forEach((character) => {
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
                    case 'VN/Game':
                        isFemale ? vnGameWaifu[character.series] = series : vnGameHusbando[character.series] = series;
                        break;
                }
            });

            // switch (test['type']) {
            //     case 'Anime':
            //         test['characters'].forEach((waifu) => {
            //             waifu.series = seriesName;
            //             series.names.push(waifu.name);
            //             series.datalist[waifu.name] = waifu;
            //             animeWaifu[waifu.series] = series;
            //         });
            //         break;
            //     case 'BDO':
            //         test['characters'].forEach((member) => {
            //             member.series = seriesName;
            //             series.names.push(member.name);
            //             series.datalist[member.name] = member;
            //             bdoWaifu[member.series] = series;
            //         });
            //         break;
            //     case 'VN/Game':
            //         test['characters'].forEach((waifu) => {
            //             waifu.series = seriesName;
            //             series.names.push(waifu.name);
            //             series.datalist[waifu.name] = waifu;
            //             vnGameWaifu[waifu.series] = series;
            //         });
            //         break;
            // }
            console.log(`Loaded: ${file}`);
        });

        // For random pulls
        ret.animeWaifu = animeWaifu;
        ret.vnGameWaifu = vnGameWaifu;
        ret.bdoWaifu = bdoWaifu;
        ret.animeHusbando = animeHusbando;
        ret.vnGameHusbando = vnGameHusbando;
        ret.metaData = metaData;

        // Generate dictionary-life structure for faster lookups
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

        Object.keys(bdoWaifu).forEach((guild) => {
            let seriesListing = {};
            seriesListing[guild] = bdoWaifu[guild];
            ret.allSeries[guild.toLowerCase()] = {names: seriesListing[guild].names};

            Object.keys(bdoWaifu[guild].datalist).forEach((memberName) => {
                ret.allWaifu[memberName.toLowerCase()] = bdoWaifu[guild].datalist[memberName];
            });
        });

        Object.keys(animeHusbando).forEach((series) => {
            let seriesListing = {};
            seriesListing[series] = animeHusbando[series];

            if (ret.allSeries.hasOwnProperty(series.toLowerCase())) {
                seriesListing[series].names.forEach((name) => {
                    ret.allSeries[series.toLowerCase()].names.push(name);
                })
            }

            Object.keys(animeHusbando[series].datalist).forEach((character) => {
                ret.allWaifu[character.toLowerCase()] = animeHusbando[series].datalist[character];
            })
        });

        Object.keys(vnGameHusbando).forEach((series) => {
            let seriesListing = {};
            seriesListing[series] = vnGameHusbando[series];

            if (ret.allSeries.hasOwnProperty(series.toLowerCase())) {
                seriesListing[series].names.forEach((name) => {
                    ret.allSeries[series.toLowerCase()].names.push(name);
                })
            }

            Object.keys(vnGameHusbando[series].datalist).forEach((character) => {
                ret.allWaifu[character.toLowerCase()] = vnGameHusbando[series].datalist[character];
            })
        });
    });


    return ret;
};

const rollList = loadList();

exports.rollList = rollList;

