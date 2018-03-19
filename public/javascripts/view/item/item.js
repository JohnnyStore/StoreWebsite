$(document).ready(function () {
  function initPage() {
    setPriceStyle();
    loadItemImages();
    loadItemSeriseList();
    loadItemColorList();
    loadItemSizeList();
    loadItemReviewList();
  }
  
  function setPriceStyle() {
    
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
          $('#item-image-normal').attr('data-big-url', image_big_src);
          $('.item-image-thumbnail-list .item-image-thumbnail:first-child').addClass('selected');


          //给当前商品的缩略图添加鼠标悬停事件，当鼠标悬停时，刷新展示图
          $(".item-image-thumbnail-list").on("mouseover", ".item-image-thumbnail", function() {
            $('.item-image-thumbnail-list .item-image-thumbnail').removeClass('selected');
            $(this).addClass('selected');
            var image_normal_src = $(this).find('img').attr('data-normal-url');
            var image_big_src = $(this).find('img').attr('data-big-url');
            $('#item-image-normal').attr('src', image_normal_src);
            $('#item-image-normal').attr('data-big-url', image_big_src);
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
    
  }

  initPage();
});