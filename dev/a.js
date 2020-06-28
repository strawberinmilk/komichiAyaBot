const personality = require('./personality.js')

const searchHotWord = (word)=>{
  word = word.replace(/[!-@]|[\[-\`]|[\{-\~]/gi,"")
  let hitWord;
  let hitWordList = [];
  if (!word) {
    word = " ";
  }
  hitWord = word.match(personality.matchAll);
  console.log(hitWord)
  if(hitWord){
    for(let i=0;i<hitWord.length;i++){
      for(let j=0;j<personality.matchList.length;j++){
        hitWord[i] = hitWord[i].replace(personality.matchList[j].reg,personality.matchList[j].text);
      }
    }



    return hitWord
    //return new Promise((resolve, reject) => {
    //  resolve(hitWord[Math.floor(Math.random() * hitWord.length)])
    //})
  }else{
    return 'error'
  }
}
console.log(searchHotWord('あや陽子しののの陽アリス猪熊'))