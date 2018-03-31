var express = require('express');
var commonService = require('../../service/commonService');
var commonData = require('../../service/commonData');
var router = express.Router();

router.get('/', function(req, res, next) {
  var customerID = 1; //todo 需要从cookie中取得当前登陆的客户信息
  var service = new commonService.commonInvoke('collection');
  var parameter = '1/9999/' + customerID + '/I';
  commonData.getCommonData(req, res, function(commonResult){
    if(commonResult.err){
      res.render('error', {
        title: '网站出错啦',
        errorCode: commonResult.code,
        message: commonResult.msg,
        navigate: commonResult.navigate
      });
    }else{
      service.get(parameter, function (result) {
        if(result.err){
          res.render('error', {
            title: '网站出错啦',
            errorCode: result.code,
            message: result.msg,
            navigate: commonResult.navigate
          });
        }else{
          res.render('shops/mycollect', {
            title: '我的收藏',
            navigate: commonResult.navigate,
            collectList: result.content.responseData
          });
        }
      });
    }
  });
});

router.put('/', function (req, res, next) {
  var service = new commonService.commonInvoke('collection');
  var data = {
    collectionID: req.body.collectionID,
    status: req.body.status,
    loginUser: req.body.loginUser
  };

  service.change(data, function (result) {
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
        msg: result.content.responseMessage
      });
    }
  });
});

module.exports = router;