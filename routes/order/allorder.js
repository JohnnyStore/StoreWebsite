var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('order/allorder', { title: '所有订单' });
});

module.exports = router;