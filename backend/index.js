var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var passport = require('passport')
var TwitterStrategy = require('passport-twitter').Strategy
var oauth = require('./const/oauth')
require('dotenv').config()
var user ;
var allowedOrigins = [
  'http://localhost:3000',
  'https://api.twitter.com'
]
var app = express();
app.use(cors())
app.use(function(req, res, next) {
  var origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(logger('[:date[clf]] :method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
// app.get('/auth/twitter' , (req, res) => {
//   // var ret = await passport.authenticate('twitter')
//   // console.log("ret===========", ret)
//   // res.send({state: "ok", code: JSON.stringify(ret)})
//   res.send(passport.authenticate('twitter'))
// });
app.get('/auth/twitter' , passport.authenticate('twitter'));
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', {failureRedirect: '/' }), //successRedirect: '/success'
  (req, res) => {res.status(200).send({
    accessToken: req.user.token,
    accessTokenSecret: req.user.tokenSecret,
  });}  // Redirect on successful authentication
);
passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_API_KEY,
  consumerSecret: process.env.TWITTER_API_SECRET,
  callbackURL: 'http://localhost:4100/auth/twitter/callback'
},
function(token, tokenSecret, profile, done) {
  user = {
      token: token,
      tokenSecret: tokenSecret,
      screenName: profile.screenName
  }
  // console.log(user)
  done(null, user);
}));
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
app.get('/success', (req, res) => {
  res.send(req.isAuthenticated())
});

function isAuthentication(req, res, next){
  if(!req.isAuthenticated())
  {
    console.log('not')
    res.status(100).send({error:'Log in required'})
  }else{
    next()
  }
}
var twitterRouter = require('./router/twitter');
app.use('/post', isAuthentication ,  twitterRouter);
app.use('/', (req, res) => {
  res.send('API is working')
});

console.log('--  Server Started  --')

const port = process.env.PORT || 4100;
//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
