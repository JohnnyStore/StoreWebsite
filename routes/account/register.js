var express = require('express');
var commonService = require('../../service/commonService');
var commonUtils = require('../../common/commonUtils');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('account/register', { title: '用户注册', layout: null });
});

router.get('/account', function(req, res, next) {
  var account = req.query.data;
  var service = new commonService.commonInvoke('checkAccount');
  service.get(account, function (result) {
    if(result.err){
      res.json({
        err: true,
        code: result.code,
        msg: result.msg
      });
    }else{
      res.json({
        err: !result.content.result,
        msg: result.content.responseMessage,
        exist: result.content.totalCount > 0
      });
    }
  });
});

router.get('/cellphone', function(req, res, next) {
  var cellphone = req.query.data;
  var service = new commonService.commonInvoke('checkCellphone');
  service.get(cellphone, function (result) {
    if(result.err){
      res.json({
        err: true,
        code: result.code,
        msg: result.msg
      });
    }else{
      res.json({
        err: !result.content.result,
        msg: result.content.responseMessage,
        exist: result.content.totalCount > 0
      });
    }
  });
});

router.get('/email', function(req, res, next) {
  var email = req.query.data;
  var service = new commonService.commonInvoke('checkEmail');
  service.get(email, function (result) {
    if(result.err){
      res.json({
        err: true,
        code: result.code,
        msg: result.msg
      });
    }else{
      res.json({
        err: !result.content.result,
        msg: result.content.responseMessage,
        exist: result.content.totalCount > 0
      });
    }
  });
});

router.get('/validCode', function(req, res, next) {
  var cellphone = req.query.cellphone;
  var validCode = req.query.validCode;
  var parameter = '/' + cellphone + '/' + validCode;
  var service = new commonService.commonInvoke('verificationCode');
  service.get(parameter, function (result) {
    if(result.err){
      res.json({
        err: true,
        code: result.code,
        msg: result.msg
      });
    }else{
      if(result.content.totalCount === 0){
        res.json({
          err: !result.content.result,
          msg: result.content.responseMessage,
          exist: false
        });
        return false;
      }

      res.json({
        err: !result.content.result,
        msg: result.content.responseMessage,
        exist: result.content.totalCount > 0,
        expired: result.content.responseData.expired
      });
    }
  });
});

router.post('/', function(req, res, next) {
  var service = new commonService.commonInvoke('customer');
  var data = {
    account: req.body.account,
    password: req.body.password,
    customerType: req.body.customerType,
    cellphone:  req.body.cellphone,
    loginUser: req.body.loginUser
  };

  service.add(data, function (result) {
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

router.post('/sendValidCode', function(req, res, next) {
  var cellphone = req.body.cellphone;
  var email = req.body.email;
  var randomNum = '';
  var service = new commonService.commonInvoke('verificationCode');

  //随机验证码
  for(var i=0;i<6;i++) {
    randomNum += Math.floor(Math.random()*10);
  }

  //发送验证码
  if(cellphone !== undefined){
    commonUtils.sendVerificationCodeToCellphone(cellphone, randomNum);
  }
  if(email !== undefined){
    commonUtils.sendVerificationCodeToEmail(email, randomNum);
  }

  //保存验证码
  var data = {
    cellphone: cellphone === undefined ? '' : cellphone,
    email: email === undefined ? '' : email,
    verificationCode: randomNum
  };

  service.add(data, function (result) {
    if(result.err){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: !result.content.result,
        msg: result.content.responseMessage,
        data: result.content
      });
    }
  });
});

module.exports = router;
