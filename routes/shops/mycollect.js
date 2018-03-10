var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('shops/mycollect', { title: '我的收藏' });
});

module.exports = router;