var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('apply/succes', { title: '订单支付完成' });
});

module.exports = router;