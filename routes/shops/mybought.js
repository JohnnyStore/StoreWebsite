var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('shops/mybought', { title: '我购买过' });
});

module.exports = router;