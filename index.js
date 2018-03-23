const fs = require("fs");

let keitaiso = fs.readFileSync("./data/keitaiso.txt", "utf8");
keitaiso = keitaiso.split(",");

function ayayaSay() {
    let ayaya = [];
    let serchWord = " ";
    while (1 === 1) {
        let indexofStart = -1;
        let wordNumberList = [];
        while (1 === 1) {
            indexofStart += 1;
            indexofStart = keitaiso.indexOf(serchWord, indexofStart);
            if (indexofStart === -1 || indexofStart === keitaiso.length - 1) {
                break;
            };
            wordNumberList.push(indexofStart + 1);
        };
        let wordNumber = wordNumberList[Math.floor(Math.random() * wordNumberList.length)];
        if (keitaiso[wordNumber] === " ") {
            break;
        } else {
            serchWord = keitaiso[wordNumber];
            ayaya.push(keitaiso[wordNumber]);
        }
    }
    ayaya = ayaya.join("");
    return ayaya
}

const twitter = require("twitter");
const cron = require('cron').CronJob;
require('dotenv').config();
key = new twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token_key,
    access_token_secret: process.env.access_token_secret
});

key.get("account/verify_credentials", function (error, data) {
    mydata = JSON.stringify(data)
    mydata = JSON.parse(mydata)
    //console.log(mydata)

    console.log("認証アカウント")
    console.log("@" + mydata.screen_name)
    console.log(mydata.name)
    console.log("\n")

})

key.stream('user', function (stream) {
    stream.on('follow', function (data) {
        key.post('friendships/create', { user_id: data.source.id_str });
    });
});

let cronAyaya = new cron({
    cronTime: '0 0,10,20,30,40,50 * * * *',
    onTick: function () {
        let postData = ayayaSay()
        key.post('statuses/update',
            { status: postData },
            function (error, tweet, response) {
            })
    },
    start: false,
    timeZone: 'Asia/Tokyo'
});
cronAyaya.start();
