const { TwitterApi } = require("twitter-api-v2");
const {TWITTER_API_KEY,TWITTER_API_SECRET,TWITTER_ACCESS_TOKEN,TWITTER_ACCESS_TOKEN_SECRET} = require('./config') 
// Create a client instance with API key and access tokens
const client = new TwitterApi({
    appKey: TWITTER_API_KEY,
    appSecret: TWITTER_API_SECRET,
    accessToken: TWITTER_ACCESS_TOKEN,
    accessSecret: TWITTER_ACCESS_TOKEN_SECRET,
  });
  const twitterClient = client.readWrite;
  module.exports = { twitterClient };