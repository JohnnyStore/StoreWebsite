var express = require('express');
var commonService = require('../../service/commonService');
var router = express.Router();

router.get('/', function(req, res, next) {
  var targetUrl = req.query.targetUrl;
  if(targetUrl === undefined){
    targetUrl = '/';
  }
  res.render('account/login', { title: '登陆/注册', target: targetUrl, layout: null });
});

router.get('/userInfo', function(req, res, next) {
  var userName = req.query.userName;
  var password = req.query.password;
  var parameter = userName + '/' + password;
  var service = new commonService.commonInvoke('login');
  service.get(parameter, function (result) {
    if(result.err){
      res.json({
        err: true,
        code: result.code,
        msg: result.msg
      });
    }else{
      res.json({
        err: !result.content.result,
        code: result.content.responseCode,
        msg: result.content.responseMessage,
        data: result.content.responseData
      });
    }
  });
});

module.exports = router;
