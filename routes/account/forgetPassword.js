var express = require('express');
var commonService = require('../../service/commonService');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('account/forgetPassword', { title: '忘记密码', layout: null });
});

router.post('/', function(req, res, next) {
  var service = new commonService.commonInvoke('forgetPassword');
  var data = {
    cellphone:  req.body.cellphone,
    email: req.body.email,
    password: req.body.password
  };

  service.change(data, function (result) {
    if(result.err){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: !result.content.result,
        msg: result.content.responseMessage
      });
    }
  });
});

module.exports = router;
