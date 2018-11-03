var express = require('express');
var router = express.Router();
var commonService = require('../../service/commonService');
var commonData = require('../../service/commonData');

router.get('/', function(req, res, next) {
  commonData.getCommonData(req, res, function(commonResult){
    if(commonResult.err){
      res.render('error', {
        title: '网站出错啦',
        errorCode: commonResult.code,
        errorMsg: commonResult.msg,
        navigate: commonResult.navigate
      });
    }else{
      res.render('news/newsDetail', {
        title: '最新动态',
        navigate: commonResult.navigate,
        newsId: req.query.newsID
      });
    }
  });
});

router.get('/detail', function(req, res, next) {
  var service = new commonService.commonInvoke('news');
  var newsID = req.query.newsID;

  service.get(newsID, function (result) {
    if (result.err) {
      res.json({
        err: true,
        code: result.code,
        msg: result.msg
      });
    } else {
      res.json({
        err: !result.content.result,
        code: result.content.responseCode,
        msg: result.content.responseMessage,
        data: result.content.responseData
      });
    }
  })
});

module.exports = router;