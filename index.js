const fs = require("fs");
const kuromoji = require('kuromoji');
const builder = kuromoji.builder({
  dicPath: 'node_modules/kuromoji/dict/'
});

const keitaisoTxt = fs.readFileSync("./data/keitaiso.txt", "utf8");
const keitaiso = keitaisoTxt.split(",");

let call = (serchWord)=>{
  let ayayaSay = (serchWord)=>{

    let ayaya = [serchWord];
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
        if(indexofStart=== -1 && noDataFlag) return ["nothit","ごめんなさい、わからないわ。"];
        noDataFlag = false;
        if (indexofStart === -1 || indexofStart === keitaiso.length - 1) {
          indexofStart = null;
          break;
        };
        wordNumberList.push(indexofStart + 1);
      };
      let wordNumber = wordNumberList[Math.floor(Math.random() * (wordNumberList.length) )];
      indexofStart = null;
      wordNumberList = null;
      if (keitaiso[wordNumber] === " ") {
        break;
      } else {
        serchWord = keitaiso[wordNumber];
        ayaya.push(keitaiso[wordNumber]);
        if(ayaya.length>100)break;
      }
      wordNumber = null
    }
    serchWord = null;
    ayaya = ayaya.join("");
    return [null,ayaya];
    ayaya = null;
}

let ans = ayayaSay(serchWord)[1]+""
return ans


/*
  while (true) {
    let ayaya = ayayaSay(serchWord);
    if(ayaya[0]) return ayaya[1]
    ayaya = ayaya[1]
    if (!ayaya.match(/しね$/) && ayaya.length > 25) {
      return ayaya;
      ayaya = null;
      break;
    } else {
      ayaya = null;
      continue;
    }
  }
  */

}
console.log(call("綾"))
//テストコード twitterを殺してから実行すること
/*
let num = 0;
for(let i=0;i<3;i++){
  let tmp = call("陽子");
  num += tmp.length
  console.log(`${tmp}${i}`)
//  console.log(process.memoryUsage().heapUsed + "/" +process.memoryUsage().heapTotal)
}
*/

/*
setInterval(()=>{
  console.log(new Date + process.memoryUsage().heapUsed + "/" +process.memoryUsage().heapTotal)
},10000)
*/


const twitter = require("twitter");
const cron = require('cron').CronJob;
require('dotenv').config();
const key = new twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret
});

let mydata
key.get("account/verify_credentials", function (error, data) {
  mydata = JSON.stringify(data)
  mydata = JSON.parse(mydata)
  //console.log(mydata)
  console.log("認証アカウント")
  console.log("@" + mydata.screen_name)
  console.log(mydata.name)
  console.log("\n")
})

key.post('statuses/update',
{ status: `再起動しました\n${new Date}` },
(error, tweet, response) => {
})


const posttweet = () =>{
  key.post('statuses/update',
  { status: call() },
  (error, tweet, response) => {
  })
}


const cronAyaya = new cron({
    cronTime: '0 0,10,20,30,40,50 * * * *',
//    cronTime: '* * * * * *',
    onTick:  () => {
        posttweet()
    },
    start: false,
    timeZone: 'Asia/Tokyo'
});
cronAyaya.start();
posttweet()


//リプライ対応機能
const sendReply = (word,replyId)=>{
  key.post('statuses/update',
  { status: `@${replyId.screenName} \n${call(word)}`,
    in_reply_to_status_id : replyId.id
  },
  (error, tweet, response) => {
  })
}
const searchHotWord = (word,replyId)=>{
  let hitWord
  let hitWordList = []
  hitWord = word.match(/大宮|忍|シノ|しの|アリス|カータレット|小路|綾|あや|アヤ|あやや|アヤヤ|猪熊|陽子|九条|カレン/g)
  if(hitWord){
    for(let i=0;i<hitWord.length;i++){
      hitWord[i] = hitWord[i].replace(/小路|綾|あや|アヤ|あやや|アヤヤ/g,"綾")
      hitWord[i] = hitWord[i].replace(/大宮|忍|シノ|しの/g,"しの")
      hitWord[i] = hitWord[i].replace(/カータレット/g,"アリス")
      hitWord[i] = hitWord[i].replace(/猪熊/,"陽子")
      hitWord[i] = hitWord[i].replace(/九条/,"カレン")
    }
    sendReply(hitWord[Math.floor(Math.random() * hitWord.length)],replyId)
  }else{
    builder.build(function(err, tokenizer) {
      let tokens = tokenizer.tokenize(word);
      for(let i=0;i<tokens.length;i++){
        if(tokens[i].pos==="名詞"){
          console.log(tokens[i].surface_form)//debug
          let tmp = keitaisoTxt.match(new RegExp(tokens[i].surface_form,"g"))
          if(tmp)hitWordList.push(tmp[0])
        }
      }
      if(hitWordList.length === 0){
        for(let i=0;i<tokens.length;i++){
          if(tokens[i].pos==="形容詞"){
            console.log(tokens[i].surface_form)//debug
            let tmp = keitaisoTxt.match(new RegExp(tokens[i].surface_form,"g"))
            if(tmp)hitWordList.push(tmp[0])
          } 
        }
      }
      if(hitWordList.length === 0){
        for(let i=0;i<tokens.length;i++){
          if(tokens[i].pos==="動詞"){
            console.log(tokens[i].surface_form)//debug
            let tmp = keitaisoTxt.match(new RegExp(tokens[i].surface_form,"g"))
            if(tmp)hitWordList.push(tmp[0])
          } 
        }
      }
      sendReply(hitWordList[Math.floor(Math.random() * hitWordList.length)],replyId)
    });
  }
}
const cronReply = new cron({
  cronTime: '* * * * * *',
  onTick:  () => {
    let replyId = fs.readFileSync("./data/nextId.txt","utf8");
    key.get('statuses/mentions_timeline',
    { 
      count: 200,
      since_id :replyId
    },
    (error, tweet, response) => {
      fs.writeFileSync("./debug.json",JSON.stringify(tweet),"utf8")
      if(tweet.length!=0)fs.writeFileSync("./data/nextId.txt",tweet[0].id_str,"utf8")
      for(let i=0;i<tweet.length;i++){
        if(tweet[i].user.screen_name === mydata.screen_name) continue;
        searchHotWord(tweet[i].text.replace(/@\w+/g,""),{"id":tweet[i].id_str,"screenName":tweet[i].user.screen_name})
      }
    })

  },
  start: false,
  timeZone: 'Asia/Tokyo'
})
cronReply.start();
