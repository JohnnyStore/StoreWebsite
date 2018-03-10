$(document).ready(function () {
  // $('.submenu li').click(function () {
  //   var pet = $(this).attr('data-pet');
  //   var itemTypeId = $(this).attr('data-itemTypeId');
  //   $.ajax({
  //     url: "/itemList/petItemList?pet=" + pet + '&itemType=' + itemTypeId,
  //     cache:false,
  //     success: function (res) {
  //       setItemsWithBrandGroup(res.itemList);
  //     },
  //     error: function (err) {
  //     }
  //   });
  // });

  function initPage() {
    var dogItemCount = $('.dog-item-list ul>li').length;
    var catItemCount = $('.cat-item-list ul>li').length;
    var pet = $('#hid-pet').val();
    var itemTypeId = $('#hid-itemTypeId').val();
    if(dogItemCount === 0){
      $('.dog-item-list').addClass('hidden');
      $('.cat-item-list').addClass('no-margin-top');
    }
    if(catItemCount === 0){
      $('.cat-item-list').addClass('hidden');
    }

    if(pet === 'dog'){
      $('ul.accordion>li:nth-child(1)').addClass('open');
      $('ul.accordion>li:nth-child(1)>ul.submenu').css('display', 'block');
      $('ul.accordion>li:nth-child(1)>ul.submenu>li').each(function (index, element) {
        if($(element).attr('data-itemTypeId') === itemTypeId){
          $(element).addClass('current');
        }
      })
    }

    if(pet === 'cat'){
      $('ul.accordion>li:nth-child(2)').addClass('open');
      $('ul.accordion>li:nth-child(2)>ul.submenu').css('display', 'block');
      $('ul.accordion>li:nth-child(2)>ul.submenu>li').each(function (index, element) {
        if($(element).attr('data-itemTypeId') === itemTypeId){
          $(element).addClass('current');
        }
      })
    }
  }

  // function setItemsWithBrandGroup(itemList) {
  //   var kumamonItemList = itemList.kumamon;
  //   var luvpetList = itemList.luvpet;
  //   var christmas = itemList.christmas;
  //   //熊本熊
  //   $('.kumamon-group ul').empty();
  //   if(kumamonItemList.length > 0){
  //     $.each(kumamonItemList, function(index, item){
  //        $('.kumamon-group ul').append(
  //            '<li>\n' +
  //            '\t<div>\n' +
  //            '\t  <div class="pet-mod-item-img">\n' +
  //            '\t\t<a href="' + item.linkUrl + '">' +
  //            '\t\t\t<img src="' + item.imageUrl + '" class="img-responsive item-image">\n' +
  //            '\t\t</a>' +
  //            '\t  </div>\n' +
  //            '\t  <div class="pet-mod-item-info">\n' +
  //            '\t\t<p class="lan-cn des">' + item.nameCN +'</p>\n' +
  //            '\t\t<p class="lan-en des hidden">' + item.nameEN + '</p>\n' +
  //            '\t\t<p class="price"></p>\n' +
  //            '\t  </div>\n' +
  //            '\t</div>\n' +
  //            '</li>');
  //     });
  //     $('.kumamon-group').removeClass('hidden');
  //   }else{
  //     $('.kumamon-group').addClass('hidden');
  //   }
  //
  //   //爱宠族
  //   $('.luvpet-group ul').empty();
  //   if(luvpetList.length > 0){
  //     $.each(luvpetList, function(index, item){
  //       $('.luvpet-group ul').append(
  //           '<li>\n' +
  //           '\t<div>\n' +
  //           '\t  <div class="pet-mod-item-img">\n' +
  //           '\t\t<a href="' + item.linkUrl + '">' +
  //           '\t\t\t<img src="' + item.imageUrl + '" class="img-responsive item-image">\n' +
  //           '\t\t</a>' +
  //           '\t  </div>\n' +
  //           '\t  <div class="pet-mod-item-info">\n' +
  //           '\t\t<p class="lan-cn des">' + item.nameCN +'</p>\n' +
  //           '\t\t<p class="lan-en des hidden">' + item.nameEN + '</p>\n' +
  //           '\t\t<p class="price"></p>\n' +
  //           '\t  </div>\n' +
  //           '\t</div>\n' +
  //           '</li>');
  //     });
  //     $('.luvpet-group').removeClass('hidden');
  //   }else{
  //     $('.luvpet-group').addClass('hidden');
  //   }
  //
  //   //疯狂设计师
  //   $('.crazy-group ul').empty();
  //   if(christmas.length > 0){
  //     $.each(christmas, function(index, item){
  //       $('.crazy-group ul').append(
  //           '<li>\n' +
  //           '\t<div>\n' +
  //           '\t  <div class="pet-mod-item-img">\n' +
  //           '\t\t<a href="' + item.linkUrl + '">' +
  //           '\t\t\t<img src="' + item.imageUrl + '" class="img-responsive item-image">\n' +
  //           '\t\t</a>' +
  //           '\t  </div>\n' +
  //           '\t  <div class="pet-mod-item-info">\n' +
  //           '\t\t<p class="lan-cn des">' + item.nameCN +'</p>\n' +
  //           '\t\t<p class="lan-en des hidden">' + item.nameEN + '</p>\n' +
  //           '\t\t<p class="price"></p>\n' +
  //           '\t  </div>\n' +
  //           '\t</div>\n' +
  //           '</li>');
  //     });
  //     $('.crazy-group').removeClass('hidden');
  //   }else{
  //     $('.crazy-group').addClass('hidden');
  //   }
  //
  //   $('.pet-group').addClass('hidden');
  //   $('.brand-group').removeClass('hidden');
  // }

  initPage();
});