const fs = require("fs");

let keitaiso = fs.readFileSync("./data/keitaiso.txt", "utf8");
keitaiso = keitaiso.split(",");

function ayayasBrain(){
let ayaya = [];
let serchWord = " ";
while (1 === 1) {
    let indexofStart = -1;
    let wordNumberList = [];
    while (1 === 1) {
        indexofStart += 1;
        indexofStart = keitaiso.indexOf(serchWord, indexofStart);
        if (indexofStart === -1 || indexofStart === keitaiso.length - 1) {
            break;
        };
        wordNumberList.push(indexofStart + 1);
    };
    let wordNumber = wordNumberList[Math.floor(Math.random() * wordNumberList.length)];
    if (keitaiso[wordNumber] === " ") {
        break;
    } else {
        serchWord = keitaiso[wordNumber];
        ayaya.push(keitaiso[wordNumber]);
    }
}
ayaya = ayaya.join("");
console.log(ayaya);
return ayaya
}

for(i=0;i<10;i++){
    ayayasBrain()
}