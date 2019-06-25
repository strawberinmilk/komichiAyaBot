const twitterModule = require("twitter")
const fs = require('fs')
const ignore = require('./ignore.js')
const twitter = new twitterModule({
  consumer_key: ignore.twitter.consumer_key,
  consumer_secret: ignore.twitter.consumer_secret,
  access_token_key: ignore.twitter.access_token_key,
  access_token_secret: ignore.twitter.access_token_secret
})

