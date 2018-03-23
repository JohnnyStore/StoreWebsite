var express = require('express');
var commonService = require('../../service/commonService');
var commonData = require('../../service/commonData');
var sysConfig = require('../../config/sysConfig');
var router = express.Router();

router.get('/', function(req, res, next) {
  var itemId = req.query.itemID;
  var brandId = req.query.brandID;
  var categoryId = req.query.categoryID;
  var subCategoryId = req.query.subCategoryID;
  var itemGroupId = req.query.itemGroupID;
  var seriesID = req.query.seriesID;
  var colorID = req.query.colorID;
  var sizeID = req.query.sizeID;
  var parameter = '';

  if(itemId !== undefined){
    parameter = itemId;
  }else{
    parameter = '/' + brandId + '/' + categoryId + '/' + subCategoryId + '/' + itemGroupId + '/' + seriesID + '/' + colorID + '/' + sizeID;
  }
  var service = new commonService.commonInvoke('item');

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
          res.render('item/item', {
            title: '产品详细信息',
            navigate: commonResult.navigate,
            itemDetail: result.content.responseData
          });
        }
      });
    }
  });
});

router.get('/seriseList', function(req, res, next) {
  var itemId = req.query.itemID;
  var service = new commonService.commonInvoke('seriesList4Item');
  service.get(itemId, function (result) {
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

router.get('/colorList', function(req, res, next) {
  var itemId = req.query.itemID;
  var service = new commonService.commonInvoke('colorList4Item');
  service.get(itemId, function (result) {
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

router.get('/sizeList', function(req, res, next) {
  var itemId = req.query.itemID;
  var service = new commonService.commonInvoke('sizeList4Item');
  service.get(itemId, function (result) {
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

router.get('/imageList', function(req, res, next) {
  var parameter = req.query.itemID + '/' + 'I';
  var service = new commonService.commonInvoke('imageList4Item');
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

router.get('/reviewList', function(req, res, next) {
  var itemID = req.query.itemID;
  var reviewLevel = req.query.reviewLevel;
  var pageNumber = req.query.page;
  var pageSize = sysConfig.pageSize;
  if(pageNumber === undefined){
    pageNumber = 1;
  }
  var parameter = pageNumber + '/' + pageSize + '/' + itemID + '/' + reviewLevel;
  var service = new commonService.commonInvoke('itemReview');
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