var express = require('express');
var router = express.Router();
var commonService = require('../../service/commonService');

/* GET home page. */
router.get('/', function(req, res, next) {
  var targetInfo = req.query.targetInfo;
  res.render('firm/introduction', {title: '企业介绍', targetInfo: targetInfo});
});

router.get('/detail', function(req, res, next) {
  var service = new commonService.commonInvoke('companyInfo');

  service.get('1', function (result) {
    if (result.err || !result.content.result) {
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