var express = require('express');
var apiConfig = require('../../config/apiConfig');
var commonService = require('../../service/commonService');
var commonUtils = require('../../common/commonUtils');
var commonData = require('../../service/commonData');
var router = express.Router();

router.get('/', function(req, res, next) {
  var orderID = req.query.orderNumber;
  var service = new commonService.commonInvoke('order');
  commonData.getCommonData(req, res, function(commonResult){
    if(commonResult.err){
      res.render('error', {
        title: '网站出错啦',
        errorCode: commonResult.code,
        errorMsg: commonResult.msg,
        navigate: commonResult.navigate
      });
    }else{
      service.get(orderID, function (result) {
        if(result.err){
          res.render('error', {
            title: '网站出错啦',
            errorCode: result.code,
            errorMsg: result.msg,
            navigate: commonResult.navigate
          });
        }else{
          if(result.content.responseData !== null){
            if(result.content.responseData.currencyType === 'CNY'){
              result.content.responseData.orderAmount = '¥' + result.content.responseData.orderAmount;
            }else{
              result.content.responseData.orderAmount = '$' + result.content.responseData.orderAmount;
            }
          }
          res.render('apply/apply', {
            title: '订单支付',
            navigate: commonResult.navigate,
            order: result.content.responseData
          });
        }
      });
    }
  });
});

router.post('/sendNoticeSms', function (req, res, next) {
  var customerTel = req.body.customerTel;
  var orderAmount = req.body.orderAmount.replace('¥', '').replace('$', '');
  var service = new commonService.commonInvoke('thirdPartyAPI');

  commonUtils.sendPaymentResultToAdmin(customerTel, orderAmount, function (isSend, reqContent, resContent, reqText) {
    var data = {
      thirdParty: 'aliSms',
      requestContent: reqContent,
      responseContent: resContent,
      requestResult: isSend ? 'T' : 'F',
      responseText: reqText,
      cellphone: apiConfig.aliSms.payNoticeTel,
      verificationCode: '',
      loginUser: customerTel
    };
    service.add(data, function (result) {
      if(result.err){
        res.json({
          err: true,
          code: result.code,
          msg: result.msg
        });
      }else{
        res.json({
          err: !isSend,
          code: result.content.responseCode,
          msg: result.content.responseMessage,
          data: result.content
        });
      }
    });
  });
});
module.exports = router;