var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('order/waiteval', { title: '待评价' });
});

module.exports = router;