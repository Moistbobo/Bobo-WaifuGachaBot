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

exports.claimWaifu = async (user, waifu) => {
    let db = new sqlite3.Database('./waifu.db', err => {

        if (err) {
            console.log('encountered error: ')
            console.log(err.message)
        }
    });
    let claimDAO = {
        key: `${user.serverid.toString()}_${user.id.toString()}_${waifu.series.toLowerCase()}_${waifu.name.toLowerCase()}`,
        serverid: user.serverid.toString(),
        userid: user.id.toString(),
        waifucode: `${waifu.series.toLowerCase()}_${waifu.name.toLowerCase()}`
    };

    db.serialize(async () => {
        db.run(`CREATE TABLE IF NOT EXISTS claimedList(ukey text NOT NULL PRIMARY KEY, serverid text, userid text, waifuCode text,claimedAmount smallint)`);
        // Check if value exists
        db.get(`SELECT * FROM claimedList WHERE ukey='${claimDAO.key}'`, (err, row) => {
            if (err) {
                console.log(err);
                return;
            }

            if (row === undefined) {
                console.log('inserting new entry for: ');
                console.log(claimDAO);
                db.run(`INSERT into claimedList(ukey,serverid , userid , waifuCode, claimedAmount) 
                VALUES('${claimDAO.key}','${claimDAO.serverid}','${claimDAO.userid}','${claimDAO.waifucode}','1')`)
            }else{
                // Entry exists, increase claimed count
                console.log(row);
                console.log('row exists, increase claimedAmount by one');
                db.run(`UPDATE claimedList SET claimedAmount = ${row.claimedAmount + 1}
                WHERE ukey='${claimDAO.key}'`);
            }
        })
    });
};

exports.getMarryList = async(user)=>{

};