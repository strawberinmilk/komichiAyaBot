const fs = require("fs");
const kuromoji = require('kuromoji');
const builder = kuromoji.builder({
  dicPath: 'node_modules/kuromoji/dict/'
});
　
const keitaisoTxt = fs.readFileSync("./data/keitaiso.txt", "utf8");
const keitaiso = keitaisoTxt.split(",");
const personality = require('./data/personality.js')

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
//console.log(talk("綾"))

//テストコード
/*
let num = 0;
for(let i=0;i<10000;i++){
  let tmp = talk("しの");
  num += tmp.length
  console.log(`${tmp}${i}`)
}
*/

const searchHotWord = (word)=>{
  word = word.replace(/[!-@]|[\[-\`]|[\{-\~]/gi,"")
  let hitWord
  let hitWordList = []
  if (!word) {
    word = " "
  }
  /*
  hitWord = word.match(/大宮|忍|シノ|しの|アリス|カータレット|小路|綾|あや|アヤ|あやや|アヤヤ|猪熊|陽子|九条|カレン/g);
  if(hitWord){
    for(let i=0;i<hitWord.length;i++){
      hitWord[i] = hitWord[i].replace(/小路|綾|あや|アヤ|あやや|アヤヤ/g,"綾");
      hitWord[i] = hitWord[i].replace(/大宮|忍|シノ|しの/g,"しの");
      hitWord[i] = hitWord[i].replace(/カータレット/g,"アリス");
      hitWord[i] = hitWord[i].replace(/猪熊/,"陽子");
      hitWord[i] = hitWord[i].replace(/九条/,"カレン");
    }
    */
    hitWord = word.match(personality.matchAll);
    console.log(hitWord)
    if(hitWord){
      for(let i=0;i<hitWord.length;i++){
        for(let j=0;j<personality.matchList.length;j++){
          hitWord[i] = hitWord[i].replace(personality.matchList[j].reg,personality.matchList[j].text);
        }
      }

    return new Promise((resolve, reject) => {
      resolve(hitWord[Math.floor(Math.random() * hitWord.length)])
    })
  }else{
    return new Promise((resolve, reject) => {
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
        resolve(hitWordList[Math.floor(Math.random() * hitWordList.length)])

      });
    })
  }
}
const reply = async word=>{
  let tmp = await searchHotWord(word)
  tmp = talk(tmp)
  return new Promise((resolve, reject) => {
    resolve(tmp)
  });
}
/*
const replyの呼び方 = async word=>{
  console.log(await reply(word))
}
*/

module.exports = {talk,reply}