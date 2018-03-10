$(document).ready(function () {
  function initPage() {
    //默认系列选择
    setCurrentSeries();

    //默认颜色选择
    setCurrentColor();

    //默认尺寸选择
    setCurrentSize();
  }

  function setCurrentSeries() {
    var series_index = 0;
    var seriesLength = $('.item-info-series-list div.item-info-size').length;
    var series_cn = $('#hid-seriesCN').val();
    var series_en = $('#hid-seriesEN').val();

    if(seriesLength === 0){
      $('.item-info-series-list').hide();
    }else{
      for(var i = 0; i <= seriesLength - 1; i++){
        var series_text_cn = $.trim($('.item-info-series-list div.item-info-size span.lan-cn').eq(i).text());
        var series_text_en = $.trim($('.item-info-series-list div.item-info-size span.lan-en').eq(i).text());
        if(series_text_cn === series_cn && series_text_en === series_en){
          series_index = i;
          break;
        }
      }
      $('.item-info-series-list div.item-info-size').eq(series_index).addClass('border-choose');
      //根据商品的系列，选择该系列对应的颜色
      setItemInfo4Series();
    }
  }

  function setCurrentColor() {
    var color_index = 0;
    var color_cn = $('#hid-colorCN').val();
    var color_en = $('#hid-colorEN').val();
    var colorLength = $('.item-info-color-list div.item-info-size').length;

    for(var i = 0; i <= colorLength - 1; i++){
      var color_text_cn = $.trim($('.item-info-color-list div.item-info-size span.lan-cn').eq(i).text());
      var color_text_en = $.trim($('.item-info-color-list div.item-info-size span.lan-en').eq(i).text());
      if(color_text_cn === color_cn && color_text_en === color_en){
        color_index = i;
        break;
      }
    }
    $('.item-info-color-list div.item-info-size').eq(color_index).addClass('border-choose');
    removeThumbnailList();
  }

  function removeThumbnailList() {
    var color_en = $('#hid-colorEN').val();
    $('.item-image-thumbnail').each(function (index, element) {
      if($(element).find('img').attr('data-color') !== color_en){
        $(element).remove();
      }
    })
  }

  function setCurrentSize() {
    var size_index = 0;
    var size_cn = $('#hid-sizeCN').val();
    var size_en = $('#hid-sizeEN').val();
    var sizeLength = $('.item-info-size-list div.item-info-size').length;

    for(var i = 0; i <= sizeLength - 1; i++){
      var size_text_cn = $.trim($('.item-info-size-list div.item-info-size span.lan-cn').eq(i).text());
      var size_text_en = $.trim($('.item-info-size-list div.item-info-size span.lan-en').eq(i).text());
      if(size_text_cn === size_cn || size_text_en === size_en){
        size_index = i;
        break;
      }
    }
    $('.item-info-size-list div.item-info-size').eq(size_index).addClass('border-choose');
  }

  function setItemInfo4Series() {
    var brand = $('#hid-brandId').val();
    var pet = $('#hid-pet').val();
    var itemType = $('#hid-itemTypeId').val();
    var series = $.trim($('.item-info-series-list .border-choose span.lan-en').text());

    $.ajax({
      type: "GET",
      url: "/item/colors?brand=" + brand + "&pet=" + pet + "&itemType=" + itemType + "&series=" + series,
      success: function(res){
        $('.item-info-color-list .item-info-other-right').empty();
        res.colorList.forEach(function (colorObj) {
          $('.item-info-color-list .item-info-other-right').append('<div class="item-info-size" style="width: 130px">\n' +
              '            <span class="lan-cn">' + colorObj.colorCH + '</span>\n' +
              '            <span class="lan-en hidden">' + colorObj.colorEN + '</span>\n' +
              '          </div>');
        });

        //$('.item-info-color-list div.item-info-size').eq(0).addClass('border-choose');
        setCurrentColor();

        $('.item-info-color-list .item-info-size').click(function () {
          $('.item-info-color-list .item-info-size').removeClass('border-choose');
          $(this).addClass('border-choose');
          setItemInfo();
        });

        setItemInfo();
      },
      error: function (err) {

      }
    });
  }

  function setItemInfo() {
    var brand = $('#hid-brandId').val();
    var pet = $('#hid-pet').val();
    var itemType = $('#hid-itemTypeId').val();
    var series = $.trim($('.item-info-series-list .border-choose span.lan-en').text());
    var color = $.trim($('.item-info-color-list .border-choose span.lan-en').text());
    var size = $.trim($('.item-info-size-list .border-choose span.lan-en').text());

    $.ajax({
      type: "GET",
      url: "/item/itemInfo?brand=" + brand + "&pet=" + pet + "&itemType=" + itemType + "&series=" + series + "&color=" + color + "&size=" + size,
      success: function(item){
        $('.item-image-big img').attr('src', item.itemInfo.itemInfo.imageUrl);

        $('.item-image-thumbnail-list').empty();
        item.itemInfo.thumbnailList.forEach(function (obj) {
          $('.item-image-thumbnail-list').append('<div class="item-image-thumbnail">\n' +
              '          <img src="' + obj.imageUrl + '" data-color="' + obj.color + '" class="img-responsive">\n' +
              '        </div>');
        });
        $('.item-image-thumbnail-list .item-image-thumbnail').click(function () {
          $('.item-image-big img').attr('src', $(this).find('img').attr('src'));
        });

        $('#title-cn').text(item.itemInfo.itemInfo.titleCN);
        $('#title-en').text(item.itemInfo.itemInfo.titleEN);
        $('#material-cn').text(item.itemInfo.itemInfo.materialCN);
        $('#material-en').text(item.itemInfo.itemInfo.materialEN);
        $('#measures').text(item.itemInfo.itemInfo.measures);
        ///item-id
        $('#item-id').text(item.itemInfo.itemInfo.id);
        $('#item-brand-cn').text(item.itemInfo.itemInfo.brandNameCN);
        $('#item-brand-en').text(item.itemInfo.itemInfo.brandNameEN);
        $('#item-name-cn').text(item.itemInfo.itemInfo.nameCN);
        $('#item-name-en').text(item.itemInfo.itemInfo.nameEN);
        $('#item-type-cn').text(item.itemInfo.itemInfo.itemTypeCH);
        $('#item-type-en').text(item.itemInfo.itemInfo.itemTypeEN);
        $('#item-size-cn').text(item.itemInfo.itemInfo.sizeCN);
        $('#item-size-en').text(item.itemInfo.itemInfo.sizeEN);
        $('#item-color-cn').text(item.itemInfo.itemInfo.colorCN);
        $('#item-color-en').text(item.itemInfo.itemInfo.colorEN);
        $('#item-specification-cn').text(item.itemInfo.itemInfo.measures);
        $('#item-specification-en').text(item.itemInfo.itemInfo.measures);
        $('#item-madeIn-cn').text(item.itemInfo.itemInfo.madeInCN);
        $('#item-madeIn-en').text(item.itemInfo.itemInfo.madeInEN);
        $('#item-material-cn').text(item.itemInfo.itemInfo.materialCN);
        $('#item-material-en').text(item.itemInfo.itemInfo.materialEN);
        $('#item-suitable-object-cn').text(item.itemInfo.itemInfo.usedAnimalCN);
        $('#item-suitable-object-en').text(item.itemInfo.itemInfo.usedAnimalEN);
        $('#item-suitable-scope-cn').text(item.itemInfo.itemInfo.usedAnimalTypeCN);
        $('#item-suitable-scope-en').text(item.itemInfo.itemInfo.usedAnimalTypeEN);
        $('#item-description-cn').text(item.itemInfo.itemInfo.descriptionCN);
        $('#item-description-en').text(item.itemInfo.itemInfo.descriptionEN);

      },
      error: function (err) {

      }
    });
  }

  function onGetItemInfoByColor(self) {
    $('.item-info-color-list .item-info-size').removeClass('border-choose');
    $(self).addClass('border-choose');
    setItemInfo();
  }

  $('.item-image-thumbnail-list .item-image-thumbnail').click(function () {
    $('.item-image-big img').attr('src', $(this).find('img').attr('src'));
  });

  $('.item-info-series-list .item-info-size').click(function () {
    $('.item-info-series-list .item-info-size').removeClass('border-choose');
    $(this).addClass('border-choose');
    setItemInfo4Series();
  });

  $('.item-info-color-list .item-info-size').click(function () {
    $('.item-info-color-list .item-info-size').removeClass('border-choose');
    $(this).addClass('border-choose');
    setItemInfo();
  });

  $('.item-info-size-list .item-info-size').click(function () {
    $('.item-info-size-list .item-info-size').removeClass('border-choose');
    $(this).addClass('border-choose');
    setItemInfo();
  });

  initPage();
});