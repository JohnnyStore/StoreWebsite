var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var code = req.query.errorCode;
  var msg = req.query.errorMsg;
  var errorCode = code;
  var errorMsg = '';
  switch (code){
    case 'NE01':
      errorMsg = '发送请求' + msg + '失败，请检查网络设置';
      break;
    case 'NE02':
      break;
    case 'NE03':
      break
  }
  res.render('error', {
    title: '网站出错啦',
    errorCode: errorCode,
    errorMsg: errorMsg
  });

});

module.exports = router;