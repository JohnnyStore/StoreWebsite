$(document).ready(function () {
  function initPageDate() {
    loadHotBrands();
    loadHotItem();
    loadDogPromotionItem();
    loadCatPromotionItem();
  }

  function loadHotBrands() {
    $.ajax({
      url: '/index/hotBrands',
      type: 'GET',
      success: function(res){
        if(res.err){
          layer.msg(res.msg);
        }else{
          if(res.brandList !== null){
            $('.petmore').append('<img src="images/brands/brandTitle.jpg"/>');
          }
          $.each(res.brandList, function(index, brand){
            if(brand.brandID === 1){
              $('.petlogo').append('<a href="/itemList?brandID=' + brand.brandID + '"><img src="' + brand.imageSrc + '"/> </a>');
            }
          });
          $.each(res.brandList, function(index, brand){
            if(brand.brandID === 3){
              $('.petlogo').append('<a href="/itemList?brandID=' + brand.brandID + '"><img src="' + brand.imageSrc + '"/> </a>');
            }
          });
          $.each(res.brandList, function(index, brand){
            if(brand.brandID === 2){
              $('.petlogo').append('<a href="/itemList?brandID=' + brand.brandID + '"><img src="' + brand.imageSrc + '"/> </a>');
            }
          });

        }
      },
      error: function(XMLHttpRequest, textStatus){
        location.href = '/error?errorCode=' + XMLHttpRequest.status + '&msg=' + XMLHttpRequest.statusText;
      }
    });
  }

  function loadHotItem() {
    $.ajax({
      url: '/index/hotItem',
      type: 'GET',
      success: function(res){
        if(res.err){
          layer.msg(res.msg);
        }else{
          $.each(res.data, function(index, item){
            $('.hot-sales-items ul').append(
                '      <li>\n' +
                '        <div class="hot-sales-item">\n' +
                '          <div class="hot-sales-item-image">\n' +
                '            <a href="/item?itemID=' + item.itemID + '">\n' +
                '              <img src="' + item.itemImageUrl + '" class="img-responsive">\n' +
                '            </a>\n' +
                '          </div>\n' +
                '          <div class="hot-sales-item-info">\n' +
                '            <p class="lan-cn">' + item.brandCN + item.itemShortDescriptionCN + '</p>\n' +
                '            <p class="lan-en hidden">' + item.brandEN + item.itemShortDescriptionEN + '</p>\n' +
                '            <p class="item-amount lan-cn">￥' + item.unitPrice4RMB + '</p>\n' +
                '            <p class="item-amount lan-en hidden">$' + item.unitPrice4USD + '</p>\n' +
                '          </div>\n' +
                '        </div>\n' +
                '      </li>');
          });
        }
      },
      error: function(XMLHttpRequest, textStatus){
        location.href = '/error?errorCode=' + XMLHttpRequest.status + '&msg=' + XMLHttpRequest.statusText;
      }
    });
  }

  function loadDogPromotionItem() {
    $.ajax({
      url: '/index/itemPromotion?category=1',
      type: 'GET',
      success: function(res){
        if(res.err){
          // alert("itemPromotion?category=1")
          location.href = '/error?errorCode=' + res.code + '&msg=' + res.msg;
        }else{
          $.each(res.data, function(index, item){
            if(index === 0){
              $('.floor-1 .floor-items ul').append(
                  '      <li>\n' +
                  '        <div class="floor-items-feature">\n' +
                  '          <div class="floor-item-image">\n' +
                  '            <a href="/item?itemID=' + item.itemID + '">\n' +
                  '              <img src="' + item.itemImageUrl + '" class="img-responsive">\n' +
                  '            </a>\n' +
                  '          </div>\n' +
                  '          <div class="floor-item-info text-right">\n' +
                  '            <p class="lan-cn title">' + item.brandCN + item.itemShortDescriptionCN + '</p>\n' +
                  '            <p class="lan-en title hidden">' + item.brandEN + item.itemShortDescriptionEN + '</p>\n' +
                  '            <p>\n' +
                  '              <span class="lan-cn normal-price">￥' + item.unitPrice4RMB + '</span>\n' +
                  '              <span class="lan-cn promotion-price">￥' + item.promotionPrice4RMB + '</span>\n' +
                  '              <span class="lan-en normal-price hidden">$' + item.unitPrice4USD + '</span>\n' +
                  '              <span class="lan-en promotion-price hidden">$' + item.promotionPrice4USD + '</span>\n' +
                  '            </p>\n' +
                  '          </div>\n' +
                  '        </div>\n' +
                  '      </li>');
            }else{
              $('.floor-1 .floor-items ul').append(
                  '      <li>\n' +
                  '        <div class="floor-item-normal">\n' +
                  '          <div class="floor-item-image">\n' +
                  '            <a href="/item?itemID=' + item.itemID + '">\n' +
                  '              <img src="' + item.itemImageUrl + '" class="img-responsive">\n' +
                  '            </a>\n' +
                  '          </div>\n' +
                  '          <div class="floor-item-info text-center">\n' +
                  '            <p class="lan-cn title">' + item.brandCN + item.itemShortDescriptionCN + '</p>\n' +
                  '            <p class="lan-en title hidden">' + item.brandEN + item.itemShortDescriptionEN + '</p>\n' +
                  '            <p class="price">\n' +
                  '              <span class="lan-cn normal-price">￥' + item.unitPrice4RMB + '</span>\n' +
                  '              <span class="lan-cn promotion-price">￥' + item.promotionPrice4RMB + '</span>\n' +
                  '              <span class="lan-en normal-price hidden">$' + item.unitPrice4USD + '</span>\n' +
                  '              <span class="lan-en promotion-price hidden">$' + item.promotionPrice4USD + '</span>\n' +
                  '            </p>\n' +
                  '          </div>\n' +
                  '        </div>\n' +
                  '      </li>');
            }
          });
        }
      },
      error: function(XMLHttpRequest, textStatus){
        location.href = '/error?errorCode=' + XMLHttpRequest.status + '&msg=' + '远程服务无响应';
      }
    });
  }

  function loadCatPromotionItem() {
    $.ajax({
      url: '/index/itemPromotion?category=2',
      type: 'GET',
      success: function(res){
        if(res.err){
          location.href = '/error?errorCode=' + res.code + '&msg=' + res.msg;
          // alert("itemPromotion?category=2")
        }else{
          $.each(res.data, function(index, item){
            if(index === 0){
              $('.floor-2 .floor-items ul').append(
                  '      <li>\n' +
                  '        <div class="floor-items-feature">\n' +
                  '          <div class="floor-item-image">\n' +
                  '            <a href="/item?itemID=' + item.itemID + '">\n' +
                  '              <img src="' + item.itemImageUrl + '" class="img-responsive">\n' +
                  '            </a>\n' +
                  '          </div>\n' +
                  '          <div class="floor-item-info text-right">\n' +
                  '            <p class="lan-cn title">' + item.brandCN + item.itemShortDescriptionCN + '</p>\n' +
                  '            <p class="lan-en title hidden">' + item.brandEN + item.itemShortDescriptionEN + '</p>\n' +
                  '            <p>\n' +
                  '              <span class="lan-cn normal-price">￥' + item.unitPrice4RMB + '</span>\n' +
                  '              <span class="lan-cn promotion-price">￥' + item.promotionPrice4RMB + '</span>\n' +
                  '              <span class="lan-en normal-price hidden">$' + item.unitPrice4USD + '</span>\n' +
                  '              <span class="lan-en promotion-price hidden">$' + item.promotionPrice4USD + '</span>\n' +
                  '            </p>\n' +
                  '          </div>\n' +
                  '        </div>\n' +
                  '      </li>');
            }else{
              $('.floor-2 .floor-items ul').append(
                  '      <li>\n' +
                  '        <div class="floor-item-normal">\n' +
                  '          <div class="floor-item-image">\n' +
                  '            <a href="/item?itemID=' + item.itemID + '">\n' +
                  '              <img src="' + item.itemImageUrl + '" class="img-responsive">\n' +
                  '            </a>\n' +
                  '          </div>\n' +
                  '          <div class="floor-item-info text-center">\n' +
                  '            <p class="lan-cn title">' + item.brandCN + item.itemShortDescriptionCN + '</p>\n' +
                  '            <p class="lan-en title hidden">' + item.brandEN + item.itemShortDescriptionEN + '</p>\n' +
                  '            <p class="price">\n' +
                  '              <span class="lan-cn normal-price">￥' + item.unitPrice4RMB + '</span>\n' +
                  '              <span class="lan-cn promotion-price">￥' + item.promotionPrice4RMB + '</span>\n' +
                  '              <span class="lan-en normal-price hidden">$' + item.unitPrice4USD + '</span>\n' +
                  '              <span class="lan-en promotion-price hidden">$' + item.promotionPrice4USD + '</span>\n' +
                  '            </p>\n' +
                  '          </div>\n' +
                  '        </div>\n' +
                  '      </li>');
            }
          });
        }
      },
      error: function(XMLHttpRequest, textStatus){
        location.href = '/error?errorCode=' + XMLHttpRequest.status + '&msg=' + '远程服务无响应';

      }
    });
  }

  initPageDate();
});