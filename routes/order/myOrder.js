var express = require('express');
var commonService = require('../../service/commonService');
var commonData = require('../../service/commonData');
var commonUtils = require('../../common/commonUtils');
var sysConfig = require('../../config/sysConfig');
var router = express.Router();

router.get('/', function(req, res, next) {
  var service = new commonService.commonInvoke('orderHistory');
  var customerId = req.cookies['loginCustomerID'];
  var pageNumber = req.query.pageNumber;
  var pageSize = sysConfig.pageSize;
  var recentMonth = req.query.recentMonth;
  var orderStatus = 'N';

  if(pageNumber === undefined) {
    pageNumber = 1;
  }

  if(recentMonth === undefined) {
    recentMonth = 3;
  }

  var parameter = pageNumber + '/' + pageSize + '/' + customerId + '/' + recentMonth + '/' + orderStatus;
  commonData.getCommonData(req, res, function(commonResult){
    if(commonResult.err){
      res.render('error', {
        title: '网站出错啦',
        errorCode: commonResult.code,
        errorMsg: commonResult.msg,
        navigate: commonResult.navigate
      });
    }else{
      if(customerId === undefined){
        res.redirect('/login');
        return false;
      }
      service.get(parameter, function (result) {
        if(result.err){
          res.render('error', {
            title: '网站出错啦',
            errorCode: commonResult.code,
            errorMsg: commonResult.msg,
            navigate: commonResult.navigate
          });
        }else{
          if(!result.content.result){
            res.redirect('/error?errorCode=' + result.content.responseCode + '&message=' + result.content.responseMessage);
            return false;
          }

          var paginationArray = commonUtils.getPaginationArray(pageNumber, result.content.totalCount);
          var prePaginationNum = commonUtils.getPrePaginationNum(pageNumber);
          var nextPaginationNum = commonUtils.getNextPaginationNum(pageNumber, result.content.totalCount);
          var pagination = commonUtils.bulidPagination4OrderHistory(pageNumber, paginationArray, prePaginationNum, nextPaginationNum, recentMonth);

          if(result.content.responseData !== null){
            result.content.responseData.forEach(function (data, index) {
              data.currencySymbol = data.currencyType === 'CNY'? '¥' : '$';
              data.currencySymbol = data.currencyType === 'CNY'? '¥' : '$';
              switch (data.orderStatus){
                case 'O':
                  data.isWaitPay = true;
                  break;
                case 'E':
                  data.isExpired = true;
                  break;
                case 'P':
                  data.isWaitDelivery = true;
                  break;
                case 'C':
                  data.isCanceled = true;
                  break;
                case 'S':
                  data.isShipping = true;
                  break;
                case 'R':
                  data.isRefunded = true;
                  break;
                case 'F':
                  data.isCompleted = true;
                  break;
              }
            });
          }

          res.render('order/myOrder', {
            title: '我的订单',
            errorCode: commonResult.code,
            message: commonResult.msg,
            recentMonth: recentMonth,
            navigate: commonResult.navigate,
            pagination: pagination,
            pageNumber: pageNumber,
            orderStatus: orderStatus,
            totalCount: result.content.totalCount > 99 ? '99+' : result.content.totalCount,
            toPayOrderCount: result.content.toPayOrderCount > 99 ? '99+' : result.content.toPayOrderCount,
            toReceiveOrderCount: result.content.toReceiveOrderCount > 99 ? '99+' : result.content.toReceiveOrderCount,
            toReviewOrderCount: result.content.toReviewOrderCount > 99 ? '99+' : result.content.toReviewOrderCount,
            pageSize: pageSize,
            orderList: result.content.responseData
          });
        }
      });
    }
  });
});

router.post('/addItemReview', function (req, res, next) {
  var service = new commonService.commonInvoke('addItemReview');
  var data = {
    customerID: req.body.customerID,
    itemID: req.body.itemID,
    starNum: req.body.starNum,
    reviewLevel: req.body.reviewLevel,
    reviewText: req.body.reviewText,
    reviewStatus: req.body.reviewStatus,
    loginUser: req.body.loginUser
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
        err: !result.content.result,
        code: result.content.responseCode,
        msg: result.content.responseMessage,
        data: result.content
      });
    }
  });
});

router.put('/changeOrderStatus', function (req, res, next) {
  var service = new commonService.commonInvoke('changeOrderStatus');
  var data = {
    orderID: req.body.orderID,
    orderStatus: req.body.orderStatus,
    loginUser: req.body.loginUser
  };

  service.change(data, function (result) {
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
        data: result.content
      });
    }
  });
});

module.exports = router;