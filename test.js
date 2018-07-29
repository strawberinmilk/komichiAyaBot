const fs = require("fs")

const kuromoji = require('kuromoji');
const builder = kuromoji.builder({
  dicPath: 'node_modules/kuromoji/dict/'
});


let splitWord = []
builder.build(function (err, tokenizer) {
  var tokens = tokenizer.tokenize("勇さんはしのの姉なのよね");
  for (let j = 0; j < tokens.length; j++) {
  if(["大宮","忍","アリス","カータレット","小路","綾","猪熊","陽子","九条","カレン","しの","シノ","あやや","アヤヤ"/*,"勇","久世橋","烏丸"*/].indexOf(tokens[j].surface_form) != -1) {
    splitWord = [tokens[j].surface_form]
    break
  }
    if(tokens[j].pos === "名詞" || tokens[j].pos === "動詞") splitWord.push(tokens[j].surface_form);
  }
  console.log(splitWord[Math.floor(Math.random()*splitWord.length)])
})