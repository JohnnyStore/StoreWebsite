var express = require('express');
var commonService = require('../../service/commonService');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('account/register', { title: '用户注册', layout: null });
});

module.exports = router;
