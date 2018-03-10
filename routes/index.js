var express = require('express');
var commonService = require('../service/commonService');
var commonData = require('../service/commonData');
var router = express.Router();

router.get('/', function(req, res, next) {
  commonData.getCommonData(req, res, function(result){
    if(result.err){
      res.render('error', {
        title: '网站出错啦',
        errorCode: result.code,
        message: result.msg
      });
    }else{
      res.render('index', {
        title: '主页',
        navigate: result.navigate
      });
    }
  });
});

router.get('/hotItem', function(req, res, next) {
  var service = new commonService.commonInvoke('itemHot');
  var currentMonth = new Date().getMonth() + 1;
  var currentYear = new Date().getFullYear();
  var startDate = '';
  var endDate = '';
  switch (currentMonth){
    case 1:
    case 2:
    case 3:
      startDate = currentYear + '-01-01 00:00:00';
      endDate = currentYear + '-03-31 59:59:59';
      break;
    case 4:
    case 5:
    case 6:
      startDate = currentYear + '-04-01 00:00:00';
      endDate = currentYear + '-06-30 59:59:59';
      break;
    case 7:
    case 8:
    case 9:
      startDate = currentYear + '-07-01 00:00:00';
      endDate = currentYear + '-09-30 59:59:59';
      break;
    case 10:
    case 11:
    case 12:
      startDate = currentYear + '-07-01 00:00:00';
      endDate = currentYear + '-12-31 59:59:59';
      break;
  }
  var parameter = '/1/999/0/' + startDate + '/' + endDate + '/A';

  service.get(parameter, function (result) {
    if(result.err){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: !result.content.result,
        msg: result.content.responseMessage,
        data: result.content.responseData
      });
    }
  });
});

router.get('/itemPromotion', function(req, res, next) {
  var service = new commonService.commonInvoke('itemPromotion');
  var currentMonth = new Date().getMonth() + 1;
  var currentYear = new Date().getFullYear();
  var startDate = '';
  var endDate = '';
  switch (currentMonth){
    case 1:
    case 2:
    case 3:
      startDate = currentYear + '-01-01 00:00:00';
      endDate = currentYear + '-03-31 59:59:59';
      break;
    case 4:
    case 5:
    case 6:
      startDate = currentYear + '-04-01 00:00:00';
      endDate = currentYear + '-06-30 59:59:59';
      break;
    case 7:
    case 8:
    case 9:
      startDate = currentYear + '-07-01 00:00:00';
      endDate = currentYear + '-09-30 59:59:59';
      break;
    case 10:
    case 11:
    case 12:
      startDate = currentYear + '-07-01 00:00:00';
      endDate = currentYear + '-12-31 59:59:59';
      break;
  }
  var categoryID = req.query.category;
  var parameter = '/' + categoryID + '/' + startDate + '/' + endDate;

  service.get(parameter, function (result) {
    if(result.err){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: !result.content.result,
        msg: result.content.responseMessage,
        data: result.content.responseData
      });
    }
  });
});

module.exports = router;
