const fs = require("fs")
const keitaisoTxt = fs.readFileSync("./data/keitaiso.txt", "utf8");
const keitaiso = keitaisoTxt.split(",");
const kuromoji = require('kuromoji');
const builder = kuromoji.builder({
  dicPath: 'node_modules/kuromoji/dict/'
});




const sendReply = word=>{
  console.log(word)
}
const searchHotWord = word=>{
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
    sendReply(hitWord[Math.floor(Math.random() * hitWord.length)])
  }else{
    builder.build(function(err, tokenizer) {
      var tokens = tokenizer.tokenize(word);
      for(let i=0;i<tokens.length;i++){
        if(tokens[i].pos==="名詞"){
          let tmp = keitaisoTxt.match(new RegExp(tokens[i].surface_form,"g"))
          if(tmp)hitWordList.push(tmp[0])
        }
      }
      if(hitWordList.length === 0){
        for(let i=0;i<tokens.length;i++){
          if(tokens[i].pos==="形容詞"){
            let tmp = keitaisoTxt.match(new RegExp(tokens[i].surface_form,"g"))
            if(tmp)hitWordList.push(tmp[0])
          } 
        }
      }
      if(hitWordList.length === 0){
        for(let i=0;i<tokens.length;i++){
          if(tokens[i].pos==="動詞"){
            let tmp = keitaisoTxt.match(new RegExp(tokens[i].surface_form,"g"))
            if(tmp)hitWordList.push(tmp[0])
          } 
        }
      }
      sendReply(hitWordList[Math.floor(Math.random() * hitWordList.length)])
    });
  }
}

searchHotWord("リプライの内容可愛いわよね")
