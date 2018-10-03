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
module.exports = talk;

console.log(talk("綾"))

//テストコード
/*
let num = 0;
for(let i=0;i<10000;i++){
  let tmp = talk("しの");
  num += tmp.length
  console.log(`${tmp}${i}`)
}
*/
