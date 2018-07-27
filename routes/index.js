var express = require('express');
var commonService = require('../service/commonService');
var commonData = require('../service/commonData');
var sysConfig = require('../config/sysConfig');
var router = express.Router();

router.get('/', function(req, res, next) {
  var service = new commonService.commonInvoke('dailySnapUp');
  commonData.getCommonData(req, res, function(commonResult){
    if(commonResult.err){
      res.render('error', {
        title: '网站出错啦',
        errorCode: commonResult.code,
        message: commonResult.msg
      });
    }else{
      service.get('', function (result) {
        if(result.err){
          res.render('error', {
            title: '网站出错啦',
            errorCode: result.code,
            message: '加载每日抢购商品出错啦。'
          });
        }else{
          if(result.content.responseData === null){
            res.render('index', {
              title: '主页',
              navigate: commonResult.navigate
            });
          }else{
            res.render('index', {
              title: '主页',
              navigate: commonResult.navigate,
              dailySnapUpOfYesterday: result.content.responseData.dailySnapUpOfYesterday,
              dailySnapUpOfToday: result.content.responseData.dailySnapUpOfToday,
              dailySnapUpOfTomorrow: result.content.responseData.dailySnapUpOfTomorrow,
              dailySnapUpOfAfterTomorrow: result.content.responseData.dailySnapUpOfAfterTomorrow
            });
          }
        }
      });
    }
  });
});

router.get('/fuzzySearch', function(req, res, next) {
  var service = new commonService.commonInvoke('fuzzySearch');
  var itemDes = req.query.itemDes;
  var pageNumber = req.query.pageNumber;
  var pageSize = sysConfig.pageSize;
  if(pageNumber === undefined){
    pageNumber = 1;
  }

  var parameter = pageNumber + '/' + pageSize + '/' + itemDes;

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
        code: result.code,
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
  var parameter = categoryID + '/' + startDate + '/' + endDate;

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
        msg: result.content.responseMessage,
        data: result.content.responseData
      });
    }
  });
});

module.exports = router;
