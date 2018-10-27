var express = require('express');
var commonService = require('../../service/commonService');
var commonData = require('../../service/commonData');
var router = express.Router();

router.get('/', function(req, res, next) {
  var customerID = req.cookies['loginCustomerID'];
  var service = new commonService.commonInvoke('shoppingCart4Customer');
  commonData.getCommonData(req, res, function(commonResult){
    if(commonResult.err){
      res.render('error', {
        title: '网站出错啦',
        errorCode: commonResult.code,
        errorMsg: commonResult.msg,
        navigate: commonResult.navigate
      });
    }else{
      if(customerID === undefined){
        res.redirect('/login');
        return false;
      }
      service.get(customerID, function (result) {
        if(result.err){
          res.render('error', {
            title: '网站出错啦',
            errorCode: result.code,
            errorMsg: result.msg,
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
        shoppingCartCount: result.content.responseData === null ? 0 : result.content.responseData.length
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
        collectionCount: result.content.responseData === null ? 0 : result.content.responseData.length
      })
    }
  });
});

router.get('/purchased/count', function (req, res, next) {
  var service = new commonService.commonInvoke('order4Customer');
  var customerId = req.query.customerID;
  var parameter = '1/9999/' + customerId + '/0/F';
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
        purchasedCount: result.content.responseData === null? 0 : result.content.responseData.length
    })
    }
  });
});

router.put('/', function (req, res, next) {
  var service = new commonService.commonInvoke('shoppingCart');
  var data = {
    shoppingCartID: req.body.shoppingCartID,
    itemID: req.body.itemID,
    customerID: req.body.customerID,
    shoppingCount: req.body.shoppingCount,
    status: req.body.status,
    loginUser: req.body.loginUser
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
        data: result.content
      });
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
        err: !result.content.result,
        data: result.content
      });
    }
  });
});

module.exports = router;