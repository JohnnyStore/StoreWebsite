var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var errorCode = req.query.errorCode;
  res.render('error', {
    title: '网站出错啦',
    errorCode: errorCode
  });

});

module.exports = router;