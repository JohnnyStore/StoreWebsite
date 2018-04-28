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
  var orderStatus = 'S';

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
        message: commonResult.msg,
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
            message: commonResult.msg,
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

          result.content.responseData.forEach(function (data, index) {
            data.currencySymbol = data.currencyType === 'CNY'? '¥' : '$';
            data.currencySymbol = data.currencyType === 'CNY'? '¥' : '$';
            switch (data.orderStatus){
              case 'O':
                data.orderStatusTextCN = '待支付';
                data.orderStatusTextEN = 'Wait Pay';
                data.isWaitPay = true;
                break;
              case 'E':
                data.orderStatusTextCN = '已过期';
                data.orderStatusTextEN = 'Expired';
                data.isExpired = true;
                break;
              case 'P':
                data.orderStatusTextCN = '待发货';
                data.orderStatusTextEN = 'Wait Delivery';
                data.isWaitDelivery = true;
                break;
              case 'C':
                data.orderStatusTextCN = '已取消';
                data.orderStatusTextEN = 'Canceled';
                data.isCanceled = true;
                break;
              case 'S':
                data.orderStatusTextCN = '配送中';
                data.orderStatusTextEN = 'Shipping';
                data.isShipping = true;
                break;
              case 'R':
                data.orderStatusTextCN = '已退款';
                data.orderStatusTextEN = 'Refunded';
                data.isRefunded = true;
                break;
              case 'F':
                data.orderStatusTextCN = '已完成';
                data.orderStatusTextEN = 'Completed';
                data.isCompleted = true;
                break;
              default:
                data.orderStatusTextCN = '未知状态';
                data.orderStatusTextEN = 'Unknow Status';
                break;
            }

          });
          res.render('order/waitgoods', {
            title: '待收货',
            errorCode: commonResult.code,
            message: commonResult.msg,
            recentMonth: recentMonth,
            orderStatus: orderStatus,
            navigate: commonResult.navigate,
            pagination: pagination,
            pageNumber: pageNumber,
            totalCount: result.content.totalCount,
            toPayOrderCount: result.content.toPayOrderCount,
            toReceiveOrderCount: result.content.toReceiveOrderCount,
            toReviewOrderCount: result.content.toReviewOrderCount,
            orderList: result.content.responseData
          });
        }
      });
    }
  });
});

module.exports = router;