const { TwitterApi} = require("twitter-api-v2");
const { TwitterApiRateLimitPlugin } = require('@twitter-api-v2/plugin-rate-limit');
const rateLimitPlugin = new TwitterApiRateLimitPlugin();
require("dotenv").config();

// Create a client instance with API key and access tokens
const client = new TwitterApi({
  bearerToken : process.env.TWITTER_BEARER_TOKEN,
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
},{plugins:[rateLimitPlugin]});

// Create a bearer token instance
const bearer = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);
// Export the read/write client and read-only bearer token
const twitterClient = client.readWrite;
const twitterBearer = bearer.readOnly;

module.exports = { twitterClient, twitterBearer };