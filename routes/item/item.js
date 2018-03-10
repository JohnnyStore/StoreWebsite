var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  var brandId = req.query.brand;
  var pet = req.query.pet;
  var itemTypeId = req.query.itemType;
  var itemId = req.query.itemId;
  var itemDetail = {};


  res.render('item/item', {
    title: '产品详细信息',
    itemDetail: []
  });
});

router.get('/itemInfo', function(req, res, next) {
  return res.json({"itemInfo": {}});
});

router.get('/colors', function(req, res, next) {
  return res.json({"colorList": {}});
});

module.exports = router;