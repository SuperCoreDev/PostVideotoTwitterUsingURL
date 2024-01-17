var express = require('express');
var router = express.Router();

const { postTwitte } = require('./../controller/twitter');
router.post('/', postTwitte);

module.exports = router;
