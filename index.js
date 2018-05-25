const fs = require("fs");

const keitaiso = fs.readFileSync("./data/keitaiso.txt", "utf8").split(",");

const ayayaSay = () =>{
    let ayaya = [];
    let serchWord = " ";
    while (true) {
        let indexofStart = -1;
        let wordNumberList = [];
        while (true) {
            indexofStart += 1;
            indexofStart = keitaiso.indexOf(serchWord, indexofStart);
            if (indexofStart === -1 || indexofStart === keitaiso.length - 1) {
                indexofStart = null;
                break;
            };
            wordNumberList.push(indexofStart + 1);
        };
        let wordNumber = wordNumberList[Math.floor(Math.random() * wordNumberList.length)];
        indexofStart = null;
        wordNumberList = null;
        if (keitaiso[wordNumber] === " ") {
            break;
        } else {
            serchWord = keitaiso[wordNumber];
            ayaya.push(keitaiso[wordNumber]);
        }
        wordNumber = null
    }
    serchWord = null;
    ayaya = ayaya.join("");
    return ayaya;
    ayaya = null;
}

const call = () => {
    while (true) {
        let ayaya = ayayaSay();
        if ( !ayaya.match(/しね$/) && ayaya.length > 25) {
            return ayaya;
            ayaya = null;
            break;
        }else{
            ayaya = null;
            continue;
        }
    }
}

//テストコード twitterを殺してから実行すること
/*
let num = 0;
for(let i=0;i<1000;i++){
    let tmp = call();
    num += tmp.length
    console.log(`${tmp}${i}`)
    console.log(process.memoryUsage().heapUsed + "/" +process.memoryUsage().heapTotal)
}
console.log(num/1000);
*/

setInterval(()=>{
  console.log(new Date + process.memoryUsage().heapUsed + "/" +process.memoryUsage().heapTotal)
},10000)

const twitter = require("twitter");
const cron = require('cron').CronJob;
require('dotenv').config();
const key = new twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token_key,
    access_token_secret: process.env.access_token_secret
});

key.get("account/verify_credentials", function (error, data) {
    let mydata = JSON.stringify(data)
    mydata = JSON.parse(mydata)
    //console.log(mydata)
    console.log("認証アカウント")
    console.log("@" + mydata.screen_name)
    console.log(mydata.name)
    console.log("\n")
    mydata = null;
})

key.stream('user', stream => {
    stream.on('follow', data => {
        key.post('friendships/create', { user_id: data.source.id_str });
    });
});

const cronAyaya = new cron({
    cronTime: '0 0,10,20,30,40,50 * * * *',
//    cronTime: '* * * * * *',
    onTick:  () => {
        key.post('statuses/update',
            { status: call() },
            function (error, tweet, response) {
            })
    },
    start: false,
    timeZone: 'Asia/Tokyo'
});
cronAyaya.start();
