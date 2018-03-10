var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('order/waitgoods', { title: '待收货' });
});

module.exports = router;