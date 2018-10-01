"use strict";
let loadList = () => {
    let ret = {allSeries: {}, allWaifu: {}};


    let animeWaifu = {};
    let mangaWaifu = {};
    let vnGameWaifu = {};
    let bdoWaifu = {};
    let metaData = {};

    let animeHusbando = {};
    let mangaHusbando = {};
    let vnGameHusbando = {};

    let fs = require('fs');
    // @ts-ignore
    fs.readdir('./Assets/Characters', function (err, files) {
        // @ts-ignore
        files.forEach(function (file) {
            let test = JSON.parse(fs.readFileSync('./Assets/Characters/' + file, 'utf8'));

            // Add the waifu name to a different array, sorted by series

            let seriesName = file.substr(2, file.length).replace('.json', '');
            seriesName = seriesName.replace(/_/g, ' ');

            let series = {names: [], datalist: {}};
            metaData[seriesName.toLowerCase()] = {
                url: test.url,
                img: test.img,
                description: test.description,
                type: test.type,
                extraTag: test.extraTag
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
                    case 'Manga':
                        isFemale ? mangaWaifu[character.series] = series : mangaHusbando[character.series] = series;
                }
            });
            console.log(`Loaded: ${file}`);
        });

        // For random pulls
        ret.animeWaifu = animeWaifu;
        ret.vnGameWaifu = vnGameWaifu;
        ret.bdoWaifu = bdoWaifu;
        ret.animeHusbando = animeHusbando;
        ret.vnGameHusbando = vnGameHusbando;
        ret.mangaWaifu = mangaWaifu;
        ret.mangaHusbando = mangaHusbando;
        ret.metaData = metaData;
        ret.duplicateWaifuList = {};

        let characterList = [
            animeWaifu,
            vnGameWaifu,
            bdoWaifu,
            animeHusbando,
            vnGameHusbando,
            mangaWaifu,
            mangaHusbando
        ];

        characterList.forEach((list) => {
            Object.keys(list).forEach((seriesName) => {
                if (ret.allSeries.hasOwnProperty(seriesName.toLowerCase())) {
                    list[seriesName].names.forEach((name) => {
                        ret.allSeries[seriesName.toLowerCase()].names.push(name);
                    })
                }else{
                    ret.allSeries[seriesName.toLowerCase()] = {names: list[seriesName].names}
                }

                Object.keys(list[seriesName].datalist).forEach((waifuName) => {
                    if (ret.allWaifu.hasOwnProperty(waifuName.toLowerCase())) {
                        if (metaData[seriesName.toLowerCase()].hasOwnProperty('extraTag')) {
                            let newWaifuName = waifuName + ' '+ metaData[seriesName.toLowerCase()]['extraTag'];
                            let existingWaifu = ret.allWaifu[waifuName.toLowerCase()];
                            console.log(seriesName);
                            console.log(existingWaifu);
                            ret.allWaifu[waifuName.toLowerCase().trim() +' '+ metaData[existingWaifu.series.toLowerCase()].extraTag.toLowerCase()] = existingWaifu;
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


        // Generate dictionary-life structure for faster lookups
        // Object.keys(animeWaifu).forEach((series) => {
        //     let seriesListing = {};
        //     seriesListing[series] = animeWaifu[series];
        //     ret.allSeries[series.toLowerCase()] = {names: seriesListing[series].names};
        //
        //     Object.keys(animeWaifu[series].datalist).forEach((waifuName) => {
        //         let waifuNameLower = waifuName.toLowerCase();
        //         if(ret.allWaifu.hasOwnProperty(waifuNameLower)){
        //             let tempArr = [];
        //             tempArr.push(waifuNameLower + series.extraTag);
        //         }
        //         ret.allWaifu[waifuName.toLowerCase().trim()] = animeWaifu[series].datalist[waifuName];
        //     });
        // });
        //
        // Object.keys(vnGameWaifu).forEach((series) => {
        //     let seriesListing = {};
        //     seriesListing[series] = vnGameWaifu[series];
        //     ret.allSeries[series.toLowerCase()] = {names: seriesListing[series].names};
        //
        //     Object.keys(vnGameWaifu[series].datalist).forEach((waifuName) => {
        //         ret.allWaifu[waifuName.toLowerCase().trim()] = vnGameWaifu[series].datalist[waifuName];
        //     });
        // });
        //
        // Object.keys(bdoWaifu).forEach((guild) => {
        //     let seriesListing = {};
        //     seriesListing[guild] = bdoWaifu[guild];
        //     ret.allSeries[guild.toLowerCase()] = {names: seriesListing[guild].names};
        //
        //     Object.keys(bdoWaifu[guild].datalist).forEach((memberName) => {
        //         ret.allWaifu[memberName.toLowerCase().trim()] = bdoWaifu[guild].datalist[memberName];
        //     });
        // });
        //
        // Object.keys(mangaWaifu).forEach((series) => {
        //     let seriesListing = {};
        //     seriesListing[series] = mangaWaifu[series];
        //     ret.allSeries[series.toLowerCase()] = {names: seriesListing[series].names};
        //
        //     Object.keys(mangaWaifu[series].datalist).forEach((memberName) => {
        //         ret.allWaifu[memberName.toLowerCase().trim()] = mangaWaifu[series].datalist[memberName];
        //     });
        // });
        //
        // Object.keys(animeHusbando).forEach((series) => {
        //     let seriesListing = {};
        //     seriesListing[series] = animeHusbando[series];
        //
        //     if (ret.allSeries.hasOwnProperty(series.toLowerCase())) {
        //         seriesListing[series].names.forEach((name) => {
        //             ret.allSeries[series.toLowerCase()].names.push(name);
        //         })
        //     }
        //
        //     Object.keys(animeHusbando[series].datalist).forEach((character) => {
        //         ret.allWaifu[character.toLowerCase().trim()] = animeHusbando[series].datalist[character];
        //     })
        // });
        //
        // Object.keys(vnGameHusbando).forEach((series) => {
        //     let seriesListing = {};
        //     seriesListing[series] = vnGameHusbando[series];
        //
        //     if (ret.allSeries.hasOwnProperty(series.toLowerCase())) {
        //         seriesListing[series].names.forEach((name) => {
        //             ret.allSeries[series.toLowerCase()].names.push(name);
        //         })
        //     }
        //
        //     Object.keys(vnGameHusbando[series].datalist).forEach((character) => {
        //         ret.allWaifu[character.toLowerCase().trim()] = vnGameHusbando[series].datalist[character];
        //     })
        // });
        //
        // Object.keys(mangaHusbando).forEach((series) => {
        //     let seriesListing = {};
        //     seriesListing[series] = mangaHusbando[series];
        //
        //     if (ret.allSeries.hasOwnProperty(series.toLowerCase())) {
        //         seriesListing[series].names.forEach((name) => {
        //             ret.allSeries[series.toLowerCase()].names.push(name);
        //         })
        //     }
        //
        //     Object.keys(mangaHusbando[series].datalist).forEach((character) => {
        //         ret.allWaifu[character.toLowerCase().trim()] = mangaHusbando[series].datalist[character];
        //     })
        // });
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

