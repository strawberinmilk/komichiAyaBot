const fs = require("fs")

let word = "うさぎ"

const kuromoji = require('kuromoji');
const builder = kuromoji.builder({
  dicPath: 'node_modules/kuromoji/dict/'
});

let hitWord
hitWord = word.match(/大宮|忍|アリス|カータレット|小路|綾|猪熊|陽子|九条|カレン|しの|シノ|あやや|アヤヤ|勇|久世橋|烏丸/g)
if(!hitWord){
  hitWord = []
  builder.build(function (err, tokenizer) {
    var tokens = tokenizer.tokenize(word);
    for (let j = 0; j < tokens.length; j++) {
      console.log(tokens[j].pos)
      if(tokens[j].pos === "名詞" || tokens[j].pos === "動詞") hitWord.push(tokens[j].surface_form);
    }
   })
}
console.log(hitWord)
console.log(hitWord[Math.floor(Math.random()*hitWord.length)])

