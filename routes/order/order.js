var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('order/order', { title: '订单结算' });
});

module.exports = router;