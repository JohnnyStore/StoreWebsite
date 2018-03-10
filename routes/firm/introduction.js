var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('firm/introduction', {
    title: '企业介绍',
    company: data.introduce,
    contact: data.contact
  });
});

module.exports = router;