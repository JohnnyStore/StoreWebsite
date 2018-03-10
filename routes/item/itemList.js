var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var contentKey = req.query.key;
  var contentValue = req.query.value;
  var itemTypeId = req.query.itemTypeId;
  var itemTypeNameCN = req.query.itemTypeNameCN;
  var itemTypeNameEN = req.query.itemTypeNameEN;
  var itemList = {};
  var itemListFilter = {
    "dogItems": [],
    "catItems": []
  };

  var kumamonItemList = [];
  var luvpetItemList = [];
  var christmasItemList = [];

  // kumamonItemList: petItemList.kumamon,
  // luvpetItemList: petItemList.luvpet,
  // christmasItemList: petItemList.christmas

  var breadcrumb = getBreadcrumb(contentKey, contentValue, itemTypeNameCN, itemTypeNameEN);

  switch (contentKey){
    case "brand":
      if(contentValue === 'all'){
        itemList = itemBiz.getAllItems();
      }else{
        itemList = itemBiz.getItemsByBrand(contentValue);
      }
      break;
    case "pet":
      if(contentValue === 'all'){
        itemList = itemBiz.getAllItems();
      }else{
        itemList = itemBiz.getItemsByAnimal(contentValue);
      }
      break;
    case "item":
      itemList = itemBiz.getItemsByItemName(contentValue);
      break;
    default:
      itemList = {
        "dogItems": [],
        "catItems": [],
        "otherItems": []
      };
      break;
  }

  // if(contentKey === 'pet' && itemTypeId !== undefined){
  //   itemList.dogItems.forEach(function (dogItem) {
  //     if(itemTypeId === 'BHT10004'){
  //       if(dogItem.itemTypeId === 'BHT10010'){
  //         itemListFilter.dogItems.push(dogItem);
  //       }
  //       if(dogItem.itemTypeId === 'BHT10011'){
  //         itemListFilter.dogItems.push(dogItem);
  //       }
  //       if(dogItem.itemTypeId === 'BHT10012'){
  //         itemListFilter.dogItems.push(dogItem);
  //       }
  //       if(dogItem.itemTypeId === 'BHT10013'){
  //         itemListFilter.dogItems.push(dogItem);
  //       }
  //     }
  //     if(itemTypeId === 'BHT10003'){
  //       if(dogItem.itemTypeId === 'BHT10020'){
  //         itemListFilter.dogItems.push(dogItem);
  //       }
  //     }
  //     if(dogItem.itemTypeId === itemTypeId){
  //       itemListFilter.dogItems.push(dogItem);
  //     }
  //   });
  //
  //   itemList.catItems.forEach(function (catItem) {
  //
  //     if(itemTypeId === 'BHT10006'){
  //       if(catItem.itemTypeId === 'BHT10014'){
  //         itemListFilter.catItems.push(catItem);
  //       }
  //       if(catItem.itemTypeId === 'BHT10015'){
  //         itemListFilter.catItems.push(catItem);
  //       }
  //       if(catItem.itemTypeId === 'BHT10016'){
  //         itemListFilter.catItems.push(catItem);
  //       }
  //       if(catItem.itemTypeId === 'BHT10017'){
  //         itemListFilter.catItems.push(catItem);
  //       }
  //     }
  //
  //     if(catItem.itemTypeId === itemTypeId){
  //       itemListFilter.catItems.push(catItem);
  //     }
  //   });
  //   itemList = itemListFilter;
  // }

  res.render('item/itemList', {
    title: '产品列表',
    pet: '',
    itemTypeId: '',
    contentKey: contentKey,
    contentValue: contentValue,
    breadcrumb: breadcrumb,
    itemList: itemList
  });
});

router.get('/petItemList', function(req, res, next) {
  var pet = req.query.pet;
  var itemTypeId = req.query.itemType;
  var contentKey = req.query.key;
  var contentValue = req.query.value;
  var petItemList = itemBiz.getItemsByAnimalAndItemType(pet, itemTypeId);
  var breadcrumb = getBreadcrumb(contentKey, contentValue);

  res.render('item/itemList', {
    title: '产品列表',
    pet: pet,
    itemTypeId: itemTypeId,
    contentKey: contentKey,
    contentValue: contentValue,
    breadcrumb: breadcrumb,
    kumamonItemList: petItemList.kumamon,
    luvpetItemList: petItemList.luvpet,
    christmasItemList: petItemList.christmas
  });
});

function getBreadcrumb(contentKey, contentValue, itemTypeNameCN, itemTypeNameEN) {
  var breadcrumb = {
    level2:{
      lanCN: '',
      lanEN: ''
    },
    level3:{
      lanCN: '',
      lanEN: ''
    }
  };

  switch (contentKey){
    case "brand":
      switch (contentValue){
        case "BHB10000":
          breadcrumb.level2.lanCN = '疯狂设计师';
          breadcrumb.level2.lanEN = 'Crazy Designer';
          break;
        case "BHB10001":
          breadcrumb.level2.lanCN = '熊本熊';
          breadcrumb.level2.lanEN = 'Kumamon';
          break;
        case "BHB10002":
          breadcrumb.level2.lanCN = '爱宠族';
          breadcrumb.level2.lanEN = 'Luvpet';
          break;
        default:
          breadcrumb.level2.lanCN = '所有品牌';
          breadcrumb.level2.lanEN = 'All Brands';
          break;
      }
      break;
    case "pet":
      switch (contentValue){
        case "dog":
          breadcrumb.level2.lanCN = '狗类商品';
          breadcrumb.level2.lanEN = 'Dog Goods';
          break;
        case "cat":
          breadcrumb.level2.lanCN = '猫类商品';
          breadcrumb.level2.lanEN = 'Cat Goods';
          break;
        default:
          breadcrumb.level2.lanCN = '所有宠物';
          breadcrumb.level2.lanEN = 'All Pets';
          break;
      }
      break;
    case "item":
      breadcrumb.level2.lanCN = contentValue;
      breadcrumb.level2.lanEN = contentValue;
      // itemList = itemBiz.getItemsByItemName(contentValue);
      break;
    default:
      breadcrumb.level2.lanCN = '';
      breadcrumb.level2.lanEN = '';
      // itemList = {
      //   "dogItems": [],
      //   "catItems": [],
      //   "otherItems": []
      // };
      break;
  }

  if(itemTypeNameCN !== undefined && itemTypeNameEN !== undefined){
    breadcrumb.level3.lanCN = itemTypeNameCN;
    breadcrumb.level3.lanEN = itemTypeNameEN;
  }
  return breadcrumb;
}

module.exports = router;