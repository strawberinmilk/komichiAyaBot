const kuromoji = require('kuromoji');
const builder = kuromoji.builder({
  dicPath: 'node_modules/kuromoji/dict/'
});
const fs = require("fs");

// 形態素解析機を作るメソッド
function keitaiso(allWord) {
  let splitWord = [" "];
  allWord = allWord.split("\n");
  allWord = allWord.join(" ");
  builder.build(function (err, tokenizer) {
    if (err) { throw err; };
    var tokens = tokenizer.tokenize(allWord);
    for (let j = 0; j < tokens.length; j++) {
      splitWord.push(tokens[j].surface_form);
    }
    splitWord.push(" ");
    console.log(splitWord);
    let date = new Date();
    fs.writeFileSync(`./data/keitaiso-${date.getTime()}.txt`, splitWord);
  });
};

keitaiso(fs.readFileSync("./data/g1.txt","utf8"));