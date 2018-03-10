var express = require('express');
var commonService = require('../service/commonService');
var router = express.Router();

router.get('/brand', function(req, res, next) {
  var service = new commonService.commonInvoke('brand');
  service.getAll(function (result) {
    if(result.err || !result.content.result){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: false,
        msg: result.content.responseMessage,
        brandList: result.content.responseData
      });
    }
  });
});

router.get('/category', function(req, res, next) {
  var service = new commonService.commonInvoke('category');
  service.getAll(function (result) {
    if(result.err || !result.content.result){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: false,
        msg: result.content.responseMessage,
        categoryList: result.content.responseData
      });
    }
  });
});

router.get('/subCategory', function(req, res, next) {
  var categoryID = req.query.categoryID;
  var service = new commonService.commonInvoke('subCategoryDistinct');
  service.get(categoryID, function (result) {
    if(result.err || !result.content.result){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: false,
        msg: result.content.responseMessage,
        subCategoryList: result.content.responseData
      });
    }
  });
});

module.exports = router;