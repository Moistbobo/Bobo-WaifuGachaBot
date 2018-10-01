require('isomorphic-fetch');
require('es6-promise').polyfill();

let sankakuData = {
    "name:": "SankakuComplex",
    "api_url": "https://capi-beta.sankakucomplex.com",
    "query_path": "/post/index.json?",
    "login": "chowaifu",
    "password_hash": "e84f7adf31695743c85e875bc4fd30e6b2c474b1",
    "appKey": "1cafbc0ac05d0cb03cb686f24124fa5c75b40bd4"
};

let requestImagesFromSankaku = async (requestURL) => {
    let imageList = await fetch(requestURL, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            Origin: 'https://beta.sankakucomplex.com',
            Referer: 'https://beta.sankakucomplex.com',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36'
        }
    });
    let json = await imageList.json();

    let extractedImages = [];
    json.forEach((img) => {
        extractedImages.push(img.preview_url);
    });

    return extractedImages;
};

exports.getImageFromSankaku = async(tags) => {
    let authPart = `&login=${sankakuData.login}&password_hash=${sankakuData.password_hash}&appKey=${sankakuData.appKey}`;
    let requestURL = `${sankakuData.api_url + sankakuData.query_path + 'limit=10&page=1&tags=order%3arandom+-rating:s+' + tags + authPart}`;

    console.log(requestURL);

   let res =  await requestImagesFromSankaku(requestURL);

    console.log(res);
    return res[Math.floor(Math.random() * res.length)];
};
