var express = require('express');
var commonService = require('../../service/commonService');
var commonData = require('../../service/commonData');
var router = express.Router();

router.get('/', function(req, res, next) {
  var customerID = 1; //todo 需要从cookie中取得当前登陆的客户信息
  var service = new commonService.commonInvoke('shoppingCart4Customer');
  commonData.getCommonData(req, res, function(commonResult){
    if(commonResult.err){
      res.render('error', {
        title: '网站出错啦',
        errorCode: commonResult.code,
        message: commonResult.msg,
        navigate: commonResult.navigate
      });
    }else{
      service.get(customerID, function (result) {
        if(result.err){
          res.render('error', {
            title: '网站出错啦',
            errorCode: result.code,
            message: result.msg,
            navigate: commonResult.navigate
          });
        }else{
          res.render('shops/shops', {
            title: '购物车',
            navigate: commonResult.navigate,
            shoppingCartList: result.content.responseData
          });
        }
      });
    }
  });
});

router.get('/shoppingCart/count', function (req, res, next) {
  var service = new commonService.commonInvoke('shoppingCart4Customer');
  var customerId = req.query.customerID;
  service.get(customerId, function (result) {
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
        shoppingCartCount: result.content.responseData.length
      })
    }
  });
});

router.get('/collect/count', function (req, res, next) {
  var service = new commonService.commonInvoke('collection');
  var customerId = req.query.customerID;
  var parameter = '1/9999/' + customerId + '/I';
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
        collectionCount: result.content.responseData.length
      })
    }
  });
});

router.get('/purchased/count', function (req, res, next) {
  var service = new commonService.commonInvoke('order');
  var customerId = req.query.customerID;
  var parameter = '1/9999/' + customerId + '/F';
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
        purchasedCount: result.content.responseData.length
    })
    }
  });
});

router.delete('/', function (req, res, next) {
  var service = new commonService.commonInvoke('shoppingCart');
  var shoppingCarID = req.query.shoppingCarID;

  service.delete(shoppingCarID, function (result) {
    if(result.err){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: false,
        data: result.content
      });
    }
  });
});

module.exports = router;