var express = require('express');
var sysConfig = require('../../config/sysConfig');
var commonService = require('../../service/commonService');
var commonUtils = require('../../common/commonUtils');
var commonData = require('../../service/commonData');
var router = express.Router();

router.get('/', function(req, res, next) {
  var pageNumber = req.query.pageNumber;
  var brandID = req.query.brandID;
  var categoryID = req.query.categoryID;
  var subCategoryID = req.query.subCategoryID;
  var itemDes = req.query.itemDes;
  var breadcrumb = [];
  var service = null;
  var parameter = '';

  if(pageNumber === undefined){
    pageNumber = 1;
  }
  if(brandID === undefined || brandID === 'all'){
    brandID = 0;
  }
  if(categoryID === undefined || categoryID === 'all'){
    categoryID = 0;
  }
  if(subCategoryID === undefined || subCategoryID === 'all'){
    subCategoryID = 0;
  }

  if(itemDes !== undefined){
    service = new commonService.commonInvoke('fuzzySearch');
    parameter = pageNumber + '/' + sysConfig.pageSize + '/' + itemDes;
  }else{
    service = new commonService.commonInvoke('salesItem');
    parameter = pageNumber + '/' + sysConfig.pageSize + '/' + brandID + '/' + categoryID + '/' + subCategoryID;
  }

  commonData.getCommonData(req, res, function(commonResult){
    if(commonResult.err){
      res.render('error', {
        title: '网站出错啦',
        errorCode: commonResult.code,
        errorMsg: commonResult.msg,
        navigate: commonResult.navigate
      });
    }else{
      service.get(parameter, function (result) {
        if(result.err){
          res.render('error', {
            title: '网站出错啦',
            errorCode: result.code,
            errorMsg: result.msg,
            navigate: commonResult.navigate
          });
        }else{
          breadcrumb = commonUtils.buildBreadcrumb(commonResult, brandID, categoryID, subCategoryID);
          var paginationArray = commonUtils.getPaginationArray(pageNumber, result.content.totalCount);
          var prePaginationNum = commonUtils.getPrePaginationNum(pageNumber);
          var nextPaginationNum = commonUtils.getNextPaginationNum(pageNumber, result.content.totalCount);
          var pagination = commonUtils.bulidPagination(pageNumber, paginationArray, prePaginationNum, nextPaginationNum, brandID, categoryID, subCategoryID);

          res.render('item/itemList', {
            title: '产品列表',
            navigate: commonResult.navigate,
            breadcrumb: breadcrumb,
            pagination: pagination,
            pageNumber: pageNumber,
            itemList: result.content.responseData
          });
        }
      });
    }
  });
});

module.exports = router;