const fs = require("fs");
const kuromoji = require('kuromoji');
const builder = kuromoji.builder({
  dicPath: 'node_modules/kuromoji/dict/'
});

const keitaisoTxt = fs.readFileSync("./data/keitaiso.txt", "utf8");
const keitaiso = keitaisoTxt.split(",");

const talk = (serchWord)=>{

  let ans = [serchWord];
  if (!serchWord) {
    serchWord = " ";
  }
  let noDataFlag = true;
  while (true) {
    let indexofStart = -1;
    let wordNumberList = [];
    while (true) {
      indexofStart += 1;
      indexofStart = keitaiso.indexOf(serchWord, indexofStart);
      if(indexofStart=== -1 && noDataFlag) {
        indexofStart = -1;
        serchWord = " ";
        ans = [];
        continue;
      }
      noDataFlag = false;
      if (indexofStart === -1 || indexofStart === keitaiso.length - 1) {
        break;
      };
      wordNumberList.push(indexofStart + 1);
    };
    let wordNumber = wordNumberList[Math.floor(Math.random() * (wordNumberList.length) )];
    if (keitaiso[wordNumber] === " ") {
      break;
    } else {
      serchWord = keitaiso[wordNumber];
      ans.push(keitaiso[wordNumber]);
      if(ans.length>100)break;
    }
  }
  ans = ans.join("");
  return ans;
}
console.log(talk("綾"))


//テストコード twitterを殺してから実行すること
/*
let num = 0;
for(let i=0;i<10000;i++){
  let tmp = talk("しの");
  num += tmp.length
  console.log(`${tmp}${i}`)
}
*/

const twitterModule = require("twitter");
const cron = require('cron').CronJob;
require('dotenv').config();
const twitter = new twitterModule({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret
});

let mydata;
twitter.get("account/verify_credentials", function (error, data) {
  mydata = JSON.stringify(data);
  mydata = JSON.parse(mydata);
  console.log("認証アカウント");
  console.log("@" + mydata.screen_name);
  console.log(mydata.name);
  console.log("\n");
})

twitter.post('statuses/update',
{ status: `再起動しました\n${new Date}` },
(error, tweet, response) => {
})

const posttweet = () =>{
  twitter.post('statuses/update',
  { status: talk() },
  (error, tweet, response) => {
  })
}


const cronTalk = new cron({
    cronTime: '0 0,10,20,30,40,50 * * * *',
//    cronTime: '* * * * * *',
    onTick:  () => {
        posttweet();
    },
    start: false,
    timeZone: 'Asia/Tokyo'
});
cronTalk.start();
posttweet();


//リプライ対応機能
const sendReply = (word,replyId)=>{
  twitter.post('statuses/update',
  { status: `@${replyId.screenName} \n${talk(word)}`,
    in_reply_to_status_id : replyId.id
  },
  (error, tweet, response) => {
  })
}
const searchHotWord = (word,replyId)=>{
  let hitWord;
  let hitWordList = [];
  hitWord = word.match(/大宮|忍|シノ|しの|アリス|カータレット|小路|綾|あや|アヤ|あやや|アヤヤ|猪熊|陽子|九条|カレン/g);
  if(hitWord){
    for(let i=0;i<hitWord.length;i++){
      hitWord[i] = hitWord[i].replace(/小路|綾|あや|アヤ|あやや|アヤヤ/g,"綾");
      hitWord[i] = hitWord[i].replace(/大宮|忍|シノ|しの/g,"しの");
      hitWord[i] = hitWord[i].replace(/カータレット/g,"アリス");
      hitWord[i] = hitWord[i].replace(/猪熊/,"陽子");
      hitWord[i] = hitWord[i].replace(/九条/,"カレン");
    }
    sendReply(hitWord[Math.floor(Math.random() * hitWord.length)],replyId);
  }else{
    builder.build(function(err, tokenizer) {
      let tokens = tokenizer.tokenize(word);
      for(let i=0;i<tokens.length;i++){
        if(tokens[i].pos==="名詞"){
          let tmp = keitaisoTxt.match(new RegExp(tokens[i].surface_form,"g"));
          if(tmp)hitWordList.push(tmp[0]);
        }
      }
      if(hitWordList.length === 0){
        for(let i=0;i<tokens.length;i++){
          if(tokens[i].pos==="形容詞"){
            let tmp = keitaisoTxt.match(new RegExp(tokens[i].surface_form,"g"));
            if(tmp)hitWordList.push(tmp[0]);
          } 
        }
      }
      if(hitWordList.length === 0){
        for(let i=0;i<tokens.length;i++){
          if(tokens[i].pos==="動詞"){
            let tmp = keitaisoTxt.match(new RegExp(tokens[i].surface_form,"g"));
            if(tmp)hitWordList.push(tmp[0]);
          } 
        }
      }
      sendReply(hitWordList[Math.floor(Math.random() * hitWordList.length)],replyId);
    });
  }
}
const cronReply = new cron({
  cronTime: '0 * * * * *',
  onTick:  () => {
    let replyId = fs.readFileSync("./data/nextId.txt","utf8");
    twitter.get('statuses/mentions_timeline',
    { 
      count: 200,
      since_id :replyId
    },
    (error, tweet, response) => {
      if(tweet.errors)return
      if(tweet.length!=0)fs.writeFileSync("./data/nextId.txt",tweet[0].id_str,"utf8");
      for(let i=0;i<tweet.length;i++){
        if(tweet[i].user.screen_name === mydata.screen_name) continue;
        searchHotWord(tweet[i].text.replace(/@\w+|[!-@]|[\[-\`]|[\{-\~]/gi,""),{"id":tweet[i].id_str,"screenName":tweet[i].user.screen_name});
      }
    })

  },
  start: false,
  timeZone: 'Asia/Tokyo'
})
cronReply.start();
