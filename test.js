const fs = require("fs")

let word = "リプの内容"

const kuromoji = require('kuromoji');
const builder = kuromoji.builder({
  dicPath: 'node_modules/kuromoji/dict/'
});

let hitWord
hitWord = word.match(/大宮|忍|シノ|しの|アリス|カータレット|小路|綾|あや|アヤ|あやや|アヤヤ|猪熊|陽子|九条|カレン|しの|シノ|あやや|アヤヤ|勇|久世橋|烏丸/g)
if(!hitWord){
  builder.build(function(err, tokenizer) {
    let hitWordTemp = [];
    var tokens = tokenizer.tokenize(word);
    for(let i=0;i<tokens.length;i++){
      if(tokens[i].pos==="名詞")hitWordTemp.push(tokens[i].surface_form)
    }
    hitWord = hitWordTemp
  });
}
let interval = setInterval(()=>{
  if(hitWord){
    console.log(hitWord)    
    let ans
    if(hitWord.length===0){
      ans = null;
    }else{
      ans = hitWord[Math.floor(Math.random()*hitWord.length)]
    }
    hitWord = null
    console.log(ans)
    clearInterval(interval)
  }
},500)

