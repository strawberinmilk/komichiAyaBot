const kuromoji = require('kuromoji');
const builder = kuromoji.builder({
  dicPath: 'node_modules/kuromoji/dict/'
});
const fs = require("fs");

function keitaiso() {
  let allWord = ""
  let filelist = fs.readdirSync("./data/original")
  for(let i=0;i<filelist.length;i++){
    if(filelist[i]==="keitaiso.txt"||filelist[i].match(/^\./)||!filelist[i].match(/\.txt$/)) continue
    allWord += fs.readFileSync(`./data/${filelist[i]}`,"utf8")
  }
  fs.writeFileSync("./test.txt",allWord,"utf8")
  let splitWord = [" "];
  allWord = allWord.split("\n");
  allWord = allWord.join(" ");
  builder.build(function (err, tokenizer) {
    if (err) { throw err; };
    var tokens = tokenizer.tokenize(allWord);
    for (let j = 0; j < tokens.length; j++) {
      splitWord.push(tokens[j].surface_form);
    }
    console.log(splitWord);
    let date = new Date();
    fs.writeFileSync(`./data/keitaiso-${date.getTime()}.txt`, splitWord);
  });
};

keitaiso();