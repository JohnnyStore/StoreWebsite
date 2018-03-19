var express = require('express');
var commonService = require('../../service/commonService');
var router = express.Router();

router.get('/', function(req, res, next) {
  var itemId = req.query.itemID;
  var service = new commonService.commonInvoke('item');
  service.get(itemId, function (result) {
    if(result.err){
      res.render('error', {
        title: '网站出错啦',
        errorCode: result.code,
        message: result.msg
      });
    }else{
      res.render('item/item', {
        title: '产品详细信息',
        itemDetail: result.content.responseData
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

module.exports = router;