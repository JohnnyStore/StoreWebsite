var express = require('express');
var router = express.Router();
var checkUtility = require("../../utility/checkUtility");
var itemBiz = require('../../business/itemsBiz');

// localhost:3000/items?brand=BHB10000&a=2&b=3
router.get('/', function(req, res, next) {
  res.render('item/items', {
    title: '产品列表',
    parameter: req.originalUrl.substring(req.originalUrl.indexOf('?'))
  });
});

// localhost:3000/items/getItems?brand=BHB10000
router.get('/getItems', function(req, res, next) {
  var brandId = req.query.brand;
  var animal = req.query.animal;
  var itemTypeId = req.query.itemType;
  var itemName = req.query.itemName;

  var items = {};

  if(!checkUtility.isEmpty(brandId) && !checkUtility.isEmpty(animal) && !checkUtility.isEmpty(itemName)){
    items = itemBiz.getItemsByItemName(brandId, animal, itemName);
  }else if(!checkUtility.isEmpty(animal) && !checkUtility.isEmpty(itemTypeId)){
    items = itemBiz.getItemsByAnimalAndItemType(animal, itemTypeId);
  }else if(!checkUtility.isEmpty(brandId)){
    if(brandId === 'all'){
      items= itemBiz.getAllItems();
    }else{
      items = itemBiz.getItemsByBrand(brandId);
    }
  }else if(!checkUtility.isEmpty(animal)){
    if(animal === 'all'){
      items= itemBiz.getAllItems();
    }else{
      items= itemBiz.getItemsByAnimal(animal);
    }
    // if(animal === 'dog' || animal === 'cat'){
    //   items= itemBiz.getItemsByAnimal(animal);
    // }else{
    //   items= itemBiz.getAllItems();
    // }
  }else{
    items = itemBiz.getAllItems();
  }

  res.json({"items": items});
});

module.exports = router;