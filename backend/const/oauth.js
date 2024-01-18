var OAuth = require('oauth')
require('dotenv').config()
var OAuth2 = OAuth.OAuth2
var twitterConsumerKey = process.env.TWITTER_API_KEY
var twitterConsumerSecret = process.env.TWITTER_API_SECRET
var twitterApiUri = process.env.TWITTER_API_URI

var oauth2 = new OAuth2(
  twitterConsumerKey,
  twitterConsumerSecret,
  twitterApiUri,
  null,
  'oauth2/token',
  null
)

module.exports = function () {
  return new Promise(function (resolve, reject) {
    oauth2.getOAuthAccessToken(
      '',
      {
        'grant_type': 'client_credentials'
      },
      function (err, access_token, refresh_token, results) {
        if (err) {
          reject(err)
        } else {
          resolve(access_token)
        }
      }
    )
  })
}