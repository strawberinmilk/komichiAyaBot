const speak = require('./index.js')
const botkit = require('botkit');
const controller = botkit.slackbot({debug: false});
require('dotenv').config();
const BOT = controller.spawn({
  token: process.env.slack_token
}).startRTM((err)=>{
  if(err) throw new Error(err);
});
/*
BOT.say({
  channel: 'ねこbotハウス',
  text: `${speak.talk()}`
});
*/
controller.hears(/.*/, ['ambient'], async (bot, msg)=>{
  bot.reply(msg, await speak.reply(msg.text));
});