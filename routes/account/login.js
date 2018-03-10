var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('account/login', { title: '登陆/注册' });
});

module.exports = router;
