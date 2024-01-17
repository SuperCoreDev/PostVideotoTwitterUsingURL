var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var allowedOrigins = [
  'http://localhost:3000'
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

app.use(logger('[:date[clf]] :method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var twitterRouter = require('./router/twitter');
app.use('/post', twitterRouter);
// app.use('/', (req, res) => {
//   res.send('API is working')
// });

console.log('--  Server Started  --')

const port = process.env.PORT || 4100;
//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
