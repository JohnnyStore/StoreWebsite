var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('apply/apply', { title: '订单支付' });
});

module.exports = router;