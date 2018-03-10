var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('firm/other', { title: '其他' });
});

module.exports = router;