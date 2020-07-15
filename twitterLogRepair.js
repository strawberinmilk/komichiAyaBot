//twitterLogで作ったjsonをkeitaiso.jsできる形式に直します
const fs = require('fs')
let data = fs.readFileSync("twitterLog.json",'utf8')
data = JSON.parse(data)

let ans = ""

for(let i of data){
    i = i.text
    if(i.match(/^RT/))continue
    //if(i.match(/http/))continue
    i = i.replace(/https?:\/\/[\w!\?/\+\-_~=;\.,\*&@#\$%\(\)'\[\]]+/gi,'')
    i = i.replace(/\s/gi,'\n')
    i = i.replace(/。/gi,'。\n')
    let t =i.split('\n')
    for(let j of t){
        if(j.match(/…$/))continue
        if(j.match(/^\s+$/))continue
        if(j.match(/^$/))continue
        if(j.match(/\@/))continue
        if(j.match(/\#/))continue
        ans += j + '\n'
    }
}
fs.writeFileSync('text.txt',ans,'utf8')