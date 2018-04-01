$(document).ready(function () {
  var currentBrandId = '';
  var currentCategoryId = '';
  var currentSubCategoryId = '';
  var currentItemGroupId = '';
  var selectedSeriesId = '';
  var selectedColorId = '';
  var selectedSizeId = '';

  function initPage() {
    setCurrentItemParameter();
    setPriceStyle();
    loadItemImages();
    loadItemSeriseList();
    loadItemColorList();
    loadItemSizeList();
    loadItemReviewList();
    $(".jqzoom").imagezoom();
  }

  function setCurrentItemParameter() {
    currentBrandId = $('#hidden-brandID').val();
    currentCategoryId = $('#hidden-categoryID').val();
    currentSubCategoryId = $('#hidden-subCategoryID').val();
    currentItemGroupId = $('#hidden-itemGroupID').val();
    selectedSeriesId = $('#hidden-seriesID').val();
    selectedColorId = $('#hidden-colorID').val();
    selectedSizeId = $('#hidden-sizeID').val();
  }
  
  function setPriceStyle() {
   if($('.item-info-price span.price-promotion').text().length === 0){
     $('.item-info-price span.price').addClass('current-price');
   }else{
     $('.item-info-price span.price-promotion').addClass('current-price');
     $('.item-info-price span.price').addClass('expired-price');
   }
  }
  
  function loadItemImages() {
    $.ajax({
      url: '/item/imageList?itemID='+ $('#hidden-itemID').val(),
      type: 'GET',
      success: function(res){
        if(res.err){
          location.href = '/error?errorCode=' + res.code + '&msg=' + res.msg;
        }else{
          var imageGourpArray = [];
          var imageDetailArray = [];
          //过滤该商品图片的图片组
          var currentGourpId = -1;
          $.each(res.data, function(index, image){
            if(image.groupID > 0){
              if(imageGourpArray.length === 0){
                imageGourpArray.push(image.groupID);
              }else{
                if(imageGourpArray.indexOf(image.groupID) === -1){
                  imageGourpArray.push(image.groupID);
                }
              }
            }else{
              imageDetailArray.push(image.imageSrc);
            }
          });

          //遍历图片组，取得每组图片缩略图、展示图、放大图的地址
          var thumbnailSrc = '';
          var normalSrc = '';
          var bigSrc = '';
          $.each(imageGourpArray, function (index, groupId) {
            thumbnailSrc = '';
            normalSrc = '';
            bigSrc = '';
            $.each(res.data, function (index, image) {
              if(image.groupID > 0){
                if(groupId === image.groupID){
                  switch (image.imageType){
                    case 'T': //缩略图
                      thumbnailSrc = image.imageSrc;
                      break;
                    case 'N': //展示图
                      normalSrc = image.imageSrc;
                      break;
                    case 'B': //放大图
                      bigSrc = image.imageSrc;
                      break;
                  }
                }else{
                  if(thumbnailSrc.length > 0 && normalSrc.length > 0 && bigSrc.length > 0){
                    $('.item-image-thumbnail-list').append(
                        '<div class="item-image-thumbnail">\n' +
                        ' <img src="' + thumbnailSrc + '" class="img-responsive" data-normal-url="' + normalSrc + '" data-big-url="' + bigSrc + '">\n' +
                        '</div>');
                    return false;
                  }
                }
              }
            });
          });

          //添加最后一组缩略图
          if(thumbnailSrc.length > 0 && normalSrc.length > 0 && bigSrc.length > 0){
            $('.item-image-thumbnail-list').append(
                '<div class="item-image-thumbnail">\n' +
                ' <img src="' + thumbnailSrc + '" class="img-responsive" data-normal-url="' + normalSrc + '" data-big-url="' + bigSrc + '">\n' +
                '</div>');
          }

          //将第一个缩略图对应的展示图显示到商品图片展示区域
          var image_normal_src = $('.item-image-thumbnail-list .item-image-thumbnail:first-child img').attr('data-normal-url');
          var image_big_src = $('.item-image-thumbnail-list .item-image-thumbnail:first-child img').attr('data-big-url');
          $('#item-image-normal').attr('src', image_normal_src);
          $('#item-image-normal').attr('rel', image_big_src);
          $('.item-image-thumbnail-list .item-image-thumbnail:first-child').addClass('selected');

          //给当前商品的缩略图添加鼠标悬停事件，当鼠标悬停时，刷新展示图
          $(".item-image-thumbnail-list").on("mouseover", ".item-image-thumbnail", function() {
            $('.item-image-thumbnail-list .item-image-thumbnail').removeClass('selected');
            $(this).addClass('selected');
            var image_normal_src = $(this).find('img').attr('data-normal-url');
            var image_big_src = $(this).find('img').attr('data-big-url');
            $('#item-image-normal').attr('src', image_normal_src);
            $('#item-image-normal').attr('rel', image_big_src);
          });

          //展示商品详细信息的展示图
          $.each(imageDetailArray, function (index, imageDetail) {
            $('.item-detail-img').append('<img src="' + imageDetail + '" alt="" class="img-responsive">');
          });
        }
      },
      error: function(XMLHttpRequest, textStatus){
        location.href = '/error?errorCode=' + XMLHttpRequest.status + '&msg=' + XMLHttpRequest.statusText;
      }
    });
  }
  
  function loadItemSeriseList() {
    $.ajax({
      url: '/item/seriseList?itemID='+ $('#hidden-itemID').val(),
      type: 'GET',
      success: function(res){
        if(res.err){
          location.href = '/error?errorCode=' + res.code + '&msg=' + res.msg;
        }else{
          //加载当前商品所有的系列
          if(res.data.length === 0){
            $('.item-info-series-list').addClass('hidden');
            return false;
          }
          $.each(res.data, function(index, current){
            $('.item-info-series-list .item-info-other-right').append(
                '<div class="item-info-select" data-id="' + current.seriesID + '">\n' +
                ' <span class="lan-cn">' + current.itemSeriesCN + '</span>\n' +
                ' <span class="lan-en hidden">' + current.itemSeriesEN + '</span>\n' +
                '</div>');
          });
          //给当前商品的系列追加事件，使其具有选中效果
          $(".item-info-series-list .item-info-other-right").on("click", ".item-info-select", function() {
            $('.item-info-series-list .item-info-other-right .item-info-select').removeClass('selected');
            $(this).addClass('selected');
            selectedSeriesId = $(this).attr('data-id');
            reloadItemInfo();
          });
          //在所有的系列中，选中当前商品的系列
          $('.item-info-series-list .item-info-other-right .item-info-select').each(function (index, obj) {
            if($(obj).attr('data-id') === $('#hidden-seriesID').val()){
              $(obj).addClass('selected');
            }
          })
        }
      },
      error: function(XMLHttpRequest, textStatus){
        location.href = '/error?errorCode=' + XMLHttpRequest.status + '&msg=' + XMLHttpRequest.statusText;
      }
    });
  }
  
  function loadItemColorList() {
    $.ajax({
      url: '/item/colorList?itemID='+ $('#hidden-itemID').val(),
      type: 'GET',
      success: function(res){
        if(res.err){
          location.href = '/error?errorCode=' + res.code + '&msg=' + res.msg;
        }else{
          //加载当前商品所有的颜色
          $.each(res.data, function(index, current){
            $('.item-info-color-list .item-info-other-right').append(
                '<div class="item-info-select" data-id="' + current.colorID + '">\n' +
                ' <span class="lan-cn">' + current.colorCN + '</span>\n' +
                ' <span class="lan-en hidden">' + current.colorEN + '</span>\n' +
                '</div>');
          });
          //给当前商品的颜色追加事件，使其具有选中效果
          $(".item-info-color-list .item-info-other-right").on("click", ".item-info-select", function() {
            $('.item-info-color-list .item-info-other-right .item-info-select').removeClass('selected');
            $(this).addClass('selected');
            selectedColorId = $(this).attr('data-id');
            reloadItemInfo();
          });
          //在所有的颜色中，选中当前商品的颜色
          $('.item-info-color-list .item-info-other-right .item-info-select').each(function (index, obj) {
            if($(obj).attr('data-id') === $('#hidden-colorID').val()){
              $(obj).addClass('selected');
            }
          })
        }
      },
      error: function(XMLHttpRequest, textStatus){
        location.href = '/error?errorCode=' + XMLHttpRequest.status + '&msg=' + XMLHttpRequest.statusText;
      }
    });
  }
  
  function loadItemSizeList() {
    $.ajax({
      url: '/item/sizeList?itemID='+ $('#hidden-itemID').val(),
      type: 'GET',
      success: function(res){
        if(res.err){
          location.href = '/error?errorCode=' + res.code + '&msg=' + res.msg;
        }else{
          //加载当前商品所有的尺码
          $.each(res.data, function(index, current){
            $('.item-info-size-list .item-info-other-right').append(
                '<div class="item-info-select" data-id="' + current.sizeID + '">\n' +
                ' <span class="lan-cn">' + current.sizeCN + '</span>\n' +
                ' <span class="lan-en hidden">' + current.sizeEN + '</span>\n' +
                '</div>');
          });
          //给当前商品的尺码追加事件，使其具有选中效果
          $(".item-info-size-list .item-info-other-right").on("click", ".item-info-select", function() {
            $('.item-info-size-list .item-info-other-right .item-info-select').removeClass('selected');
            $(this).addClass('selected');
            selectedSizeId = $(this).attr('data-id');
            reloadItemInfo();
          });
          //在所有的尺码中，选中当前商品的尺码
          $('.item-info-size-list .item-info-other-right .item-info-select').each(function (index, obj) {
            if($(obj).attr('data-id') === $('#hidden-sizeID').val()){
              $(obj).addClass('selected');
            }
          })
        }
      },
      error: function(XMLHttpRequest, textStatus){
        location.href = '/error?errorCode=' + XMLHttpRequest.status + '&msg=' + XMLHttpRequest.statusText;
      }
    });
  }
  
  function loadItemReviewList() {
    $.ajax({
      url: '/item/reviewList?itemID=' + $('#hidden-itemID').val()+'&reviewLevel=A',
      type: 'GET',
      success: function(resAll){
        if(resAll.err){
          location.href = '/error?errorCode=' + resAll.code + '&msg=' + resAll.msg;
        }else{
          var reviewCount = resAll.data.length;
          var goodReviewCount = 0;
          var middleReviewCount = 0;
          var negativeReviewCount = 0;
          var goodPercent = 0;
          var middlePercent = 0;
          var negativePercent = 0;
          var starHtml = '';
          $.each(resAll.data, function (index, review) {
            starHtml = '';
            for(var i = 1; i <= review.starNum; i++){
              starHtml += '<i class="fa fa-star review-star"></i>\n';
            }

            $('#review-all').append(
                '<div class="review-text">\n' +
                '   <div class="row">\n' +
                '     <div class="col-md-2">\n' +
                '      <span>' + review.customerName  + '</span>\n' +
                '      <div>\n' +
                        starHtml +
                '      </div>\n' +
                '     </div>\n' +
                '     <div class="col-md-10">\n' +
                '       <p>' + review.reviewText + '</p>\n' +
                '       <p>' + review.inDate + '</p>\n' +
                '     </div>\n' +
                '   </div>\n' +
                '</div>');

            //好评
            if(review.reviewLevel === 'G'){
              $('#review-good').append(
                  '<div class="review-text">\n' +
                  '   <div class="row">\n' +
                  '     <div class="col-md-2">\n' +
                  '      <span>' + review.customerName  + '</span>\n' +
                  '      <div>\n' +
                  starHtml +
                  '      </div>\n' +
                  '     </div>\n' +
                  '     <div class="col-md-10">\n' +
                  '       <p>' + review.reviewText + '</p>\n' +
                  '       <p>' + review.inDate + '</p>\n' +
                  '     </div>\n' +
                  '   </div>\n' +
                  '</div>');
              goodReviewCount++;
            }
            //中评
            if(review.reviewLevel === 'N'){
              $('#review-middle').append(
                  '<div class="review-text">\n' +
                  '   <div class="row">\n' +
                  '     <div class="col-md-2">\n' +
                  '      <span>' + review.customerName  + '</span>\n' +
                  '      <div>\n' +
                  starHtml +
                  '      </div>\n' +
                  '     </div>\n' +
                  '     <div class="col-md-10">\n' +
                  '       <p>' + review.reviewText + '</p>\n' +
                  '       <p>' + review.inDate + '</p>\n' +
                  '     </div>\n' +
                  '   </div>\n' +
                  '</div>');
              middleReviewCount++;
            }
            //差评
            if(review.reviewLevel === 'B'){
              $('#review-negative').append(
                  '<div class="review-text">\n' +
                  '   <div class="row">\n' +
                  '     <div class="col-md-2">\n' +
                  '      <span>' + review.customerName  + '</span>\n' +
                  '      <div>\n' +
                  starHtml +
                  '      </div>\n' +
                  '     </div>\n' +
                  '     <div class="col-md-10">\n' +
                  '       <p>' + review.reviewText + '</p>\n' +
                  '       <p>' + review.inDate + '</p>\n' +
                  '     </div>\n' +
                  '   </div>\n' +
                  '</div>');
              negativeReviewCount++;
            }
          });

          if(reviewCount > 0){
            goodPercent = Math.ceil((goodReviewCount / reviewCount) * 100);
            middlePercent = Math.ceil((middleReviewCount / reviewCount) * 100);
            negativePercent = Math.ceil((negativeReviewCount / reviewCount) * 100);
          }
          $('.percent-value span:first-child').text(goodPercent);

          $('.progress-bar-danger').attr('style', 'width: ' + goodPercent + '%;');
          $('.progress-bar-danger').text(goodPercent + '%');

          $('.progress-bar-info').attr('style', 'width: ' + middlePercent + '%;');
          $('.progress-bar-info').text(middlePercent + '%');

          $('.progress-bar-warning').attr('style', 'width: ' + negativePercent + '%;');
          $('.progress-bar-warning').text(negativePercent + '%');

          $('.review-count').text('(' + reviewCount + ')');
          $('.good-review-count').text('(' + goodReviewCount + ')');
          $('.middle-review-count').text('(' + middleReviewCount + ')');
          $('.negative-review-count').text('(' + negativeReviewCount + ')');
        }
      },
      error: function(XMLHttpRequest, textStatus){
        location.href = '/error?errorCode=' + XMLHttpRequest.status + '&msg=' + XMLHttpRequest.statusText;
      }
    });
  }
  
  function reloadItemInfo() {
    location.href = '/item?brandID=' + currentBrandId +
        '&categoryID=' + currentCategoryId +
        '&subCategoryID=' + currentSubCategoryId +
        '&itemGroupID=' + currentItemGroupId +
        '&seriesID=' + selectedSeriesId +
        '&colorID=' + selectedColorId +
        '&sizeID=' + selectedSizeId;
  }

  $('.btn-add-shoppingCart').click(function(){
    var lan = localStorage.getItem('siteLanguage');
    var layer_dialog_title = '';
    var customer = getLoginCustomer();
    var itemID = $('#hidden-itemID').val();
    var shoppingCount = $('#buy-count').val();

    if(customer === null){
      layer_dialog_title = lan === 'cn'? '您尚未登陆' : 'Please login first';
      var htmlContent =
          '<div style="padding: 25px; margin-top: 18px">' +
          '<a href="/login?targetUrl=/item?itemID=' + itemID + '" class="btn btn-success btn-block">我有爱宠族账号，去登陆>></a><br>' +
          '<a href="/register" class="btn btn-success btn-block">还没有账号，去注册>></a>' +
          '</div>';
      layer.open({
        type: 1,
        skin: 'layui-layer-rim', //加上边框
        area: ['420px', '240px'], //宽高
        content: htmlContent
      });

      $('.layui-layer-title').html(layer_dialog_title);
      return false;
    }

    $.ajax({
      url: '/item/shoppingCart',
      type: 'post',
      dataType: 'json',
      data:{
        itemID: itemID,
        customerID: customer.customerID,
        shoppingCount: shoppingCount,
        loginUser: customer.account
      },
      success: function(res){
        if(res.err){
          location.href = '/error?errorCode=' + resAll.code + '&msg=' + resAll.msg;
        }else{
          layer_dialog_title = lan === 'cn'? '添加到购物车' : 'Add To Shipping cart';
          var htmlContent =
              '<div class="add-shoppingCart-success">' +
              '  <i class="fa fa-check-circle-o" style="position: absolute; font-size: 35px"></i>' +
              '  <h3 class="lan-cn" style="position: absolute; left: 60px; top: 20px">商品已成功加入购物车！</h3>' +
              '  <div style="position: absolute; top: 80px; left: 50px">' +
              '    <button type="button" class="btn btn-default" style="width: 150px">' +
              '      <span class="lan-cn">继续购物</span>' +
              '      <span class="lan-en hidden">To Shopping</span>' +
              '    </button>' +
              '    <button type="button" class="btn btn-checking" style="width: 150px">' +
              '      <span class="lan-cn">去购物车结算</span>' +
              '      <span class="lan-en hidden">To Checkout</span>' +
              '    </button>' +
              '  </div>' +
              '</div>';
          var index = layer.open({
            type: 1,
            skin: 'layui-layer-rim', //加上边框
            area: ['420px', '220px'], //宽高
            content: htmlContent
          });

          $('.layui-layer-title').html(layer_dialog_title);
          //添加按钮事件
          $(".add-shoppingCart-success").on("click", ".btn-default", function() {
            layer.close(index);
          });
          $(".add-shoppingCart-success").on("click", ".btn-checking", function() {
            location.href = '/shops';
          });
        }
      },
      error: function(XMLHttpRequest, textStatus){
        location.href = '/error?errorCode=' + XMLHttpRequest.status + '&msg=' + XMLHttpRequest.statusText;
      }
    });
  });

  initPage();
});