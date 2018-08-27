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

router.get('/hotBrands', function(req, res, next) {
  var service = new commonService.commonInvoke('brand');

  service.getPageData('1', function (result) {
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
        brandList: result.content.responseData
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

  service.get('', function (result) {
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
  var categoryID = req.query.category;
  service.get(categoryID, function (result) {
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
