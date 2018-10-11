const speak = require('./index.js')
const botkit = require('botkit');
const controller = botkit.slackbot({debug: false});
require('dotenv').config();

const start = ()=>{
  const BOT = controller.spawn({
    token: process.env.slack_token
  }).startRTM((err)=>{
    if(err) {
      console.log(err)//throw new Error(err);
      start()
    }
  });
}
start()
/*
BOT.say({
  channel: 'ねこbotハウス',
  text: `${speak.talk()}`
});
*/
controller.hears(/.*/, ['ambient'], async (bot, msg)=>{
  bot.reply(msg, await speak.reply(msg.text));
});