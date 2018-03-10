var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('order/waitpay', { title: '待付款' });
});

module.exports = router;