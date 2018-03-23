小路綾bot

きんいろモザイク原作1巻のアヤヤの発言を文字列化し、形態素解析を行いマルコフ連鎖により文字列を生成してツイートするプログラムです。  

著作権の都合上アヤヤのセリフは付属しません。   

keitaiso.jsで単語ごとに分割したファイルを生成、index.jsで再構成してツイートという役割分担になっています。  

keitaiso.jsで./dataの中にkeitaiso-(timestamp).txtを生成し、それをindex.jsで利用します。  

インストール、使用方法  

1 `$ git clone`します  

2 `$ npm install`します  

3 なにかファイルを生成し、keitaiso.jsの一番下の行を書き換え`$ node keitaiso.js`します  

4 競合を防ぐためにtimestampをつけたファイルが生成されるので、適切にkeitaiso.txtというファイルにします  

5 ./.envを適切に設定します  

6 `$ node index.js`すると10分ごとにツイートされます　 