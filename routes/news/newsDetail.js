var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('news/newsDetail', { title: '最新动态', newsId: req.query.newsId });
});

module.exports = router;