var app = new Vue({
  el: "#app",
  data:{
    language: 'en',
    isShowBrandInfo: false,
    dogItemType: '',
    catItemType: '',
    isShowPetItemTypeGroup: false,
    isShowDogItemGroup: true,
    isShowCatItemGroup: true,
    isShowOtherItemGroup: true,
    dogItemTitle:'',
    catItemTitle:'',
    otherItemTitle:'',
    resItems:[],
    resPetItems: [],
    dogItems: [],
    catItems: [],
    otherItems: [],
    christmasItemTitle: '',
    kumamonItemTitle: '',
    luvpetItemTitle: '',
    christmasItems:[],
    kumamonItems:[],
    luvpetItems:[]
  },
  methods:{
    onSearchByItemType: function (animal, itemTypeId, itemType) {
      if(animal === 'dog'){
        this.catItemType = '';
        this.dogItemType = itemType;
      }
      if(animal === 'cat'){
        this.dogItemType = '';
        this.catItemType = itemType;
      }
      this.isShowPetItemTypeGroup = true;
      $.ajax({
        url: "/items/getItems?animal=" + animal + '&itemType=' + itemTypeId,
        cache:false,
        success: function (result) {
          app.$data.resPetItems = result.items;
          app.setPetItems();
        },
        error: function (err) {
        }
      });
    },
    initPage: function () {
      //isShowBrandInfo
      var parameter = $('#hid-parameter').val();
      if(parameter.indexOf('BHB10001') >= 0){
        this.isShowBrandInfo = true;
      }
      $('.carousel').carousel({
        interval: 2000
      });
      var lan = this.getSiteLanguage();
      this.switchNavLanguage(lan);
      if(lan !== undefined){
        this.language = lan;
      }else{
        this.language = 'en';
      }
      this.getItemsByAnimal();
    },
    getItemsByAnimal:function(){
      var parameter = $('#hid-parameter').val();
      // /items/getItems?brand=dfddfdfd
      $.ajax({
        url: "/items/getItems" + parameter,
        cache:false,
        success: function (result) {
          app.$data.resItems = result.items;
          app.setItems();
        },
        error: function (err) {
          
        }
      });
    },
    setItems: function () {
      app.$data.dogItems.splice(0, app.$data.dogItems.length);
      app.$data.catItems.splice(0, app.$data.catItems.length);
      app.$data.otherItems.splice(0, app.$data.otherItems.length);
      app.$data.dogItemTitle = app.$data.language === 'ch' ? '狗类商品' : 'DOG GOODS';
      app.$data.catItemTitle = app.$data.language === 'ch' ? '猫类商品' : 'CAT GOODS';
      app.$data.otherItemTitle = app.$data.language === 'ch' ? '其他商品' : 'OTHER GOODS';
      if(this.resItems.dogItems.length > 0){
        this.resItems.dogItems.forEach(function (item) {
          app.$data.dogItems.push({
            "linkUrl": "/item?brand=" + item.brandId + "&pet=dog&itemType=" + item.itemTypeId,
            "itemTypeId": item.itemTypeId,
            "itemTypeName": app.$data.language === 'ch' ? item.itemTypeCH : item.itemTypeEN,
            "itemTypeImageUrl": item.itemTypeImageUrl,
            "itemTypeDec": app.$data.language === 'ch' ? item.itemTypeDecCH : item.itemTypeDecEN
          });
        });
      }
      if(this.resItems.catItems.length > 0){
        this.resItems.catItems.forEach(function (item) {
          app.$data.catItems.push({
            "linkUrl": "/item?brand=" + item.brandId + "&pet=cat&itemType=" + item.itemTypeId,
            "itemTypeId": item.itemTypeId,
            "itemTypeName": app.$data.language === 'ch' ? item.itemTypeCH : item.itemTypeEN,
            "itemTypeImageUrl": item.itemTypeImageUrl,
            "itemTypeDec": app.$data.language === 'ch' ? item.itemTypeDecCH : item.itemTypeDecEN
          });
        });
      }
      if(this.resItems.otherItems.length > 0){
        this.resItems.otherItems.forEach(function (item) {
          app.$data.otherItems.push({
            "linkUrl": "/item?brand=" + item.brandId + "&pet=other&itemType=" + item.itemTypeId,
            "itemTypeId": item.itemTypeId,
            "itemTypeName": app.$data.language === 'ch' ? item.itemTypeCH : item.itemTypeEN,
            "itemTypeImageUrl": item.itemTypeImageUrl,
            "itemTypeDec": app.$data.language === 'ch' ? item.itemTypeDecCH : item.itemTypeDecEN
          });
        });
      }
    },
    setPetItems: function () {
      app.$data.christmasItems.splice(0, app.$data.christmasItems.length);
      app.$data.kumamonItems.splice(0, app.$data.kumamonItems.length);
      app.$data.luvpetItems.splice(0, app.$data.luvpetItems.length);
      app.$data.resPetItems.christmas.forEach(function (item) {
        app.$data.christmasItems.push({
          linkUrl: item.linkUrl,
          imageUrl: item.imageUrl,
          itemDec: app.$data.language === 'en'? item.nameEN : item.nameCN
        });
      });
      app.$data.resPetItems.kumamon.forEach(function (item) {
        app.$data.kumamonItems.push({
          linkUrl: item.linkUrl,
          imageUrl: item.imageUrl,
          itemDec: app.$data.language === 'en'? item.nameEN : item.nameCN
        });
      });
      app.$data.resPetItems.luvpet.forEach(function (item) {
        app.$data.luvpetItems.push({
          linkUrl: item.linkUrl,
          imageUrl: item.imageUrl,
          itemDec: app.$data.language === 'en'? item.nameEN : item.nameCN
        });
      });

      if(app.$data.christmasItems.length > 0){
        app.$data.christmasItemTitle = app.$data.language === 'en'? 'Wayward Designer' : '疯狂设计师';
      }
      if(app.$data.kumamonItems.length > 0){
        app.$data.kumamonItemTitle = app.$data.language === 'en'? 'Kumamon' : '熊本熊';
      }
      if(app.$data.luvpetItems.length > 0){
        app.$data.luvpetItemTitle = app.$data.language === 'en'? 'Luvpet' : '爱宠族';
      }
    }
  },
  watch:{
    language: function (lan) {
      this.switchNavLanguage(lan);
      this.saveSiteLanguage(lan);
      app.setItems();
      app.setPetItems();
    }
  },
  mounted: function () {
    this.initPage();
  }
});