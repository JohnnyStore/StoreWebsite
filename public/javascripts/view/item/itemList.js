$(document).ready(function () {
  function initPage() {
    setAlertMessage4NoItems();
    setDefaultPageNumber();
  }

  function setAlertMessage4NoItems() {
    var itemCount = $('.item-list ul li').length;
    if(itemCount === 0){
      $('div.item-list').empty();
      $('div.item-list').addClass('text-center');
      $('div.item-list').append('<div class="lan-cn">没有找到对应的商品</div>');
      $('div.item-list').append('<div class="lan-en hidden">Can not find relation items.</div>');
    }
  }
  function setDefaultPageNumber() {
    var currentPageNumber = $('#current-pageNumber').val();
    $('div.pagination ul li.page-num').each(function (index, obj) {
      if($(obj).text() === currentPageNumber){
        $(obj).addClass('current-page-number');
        $(obj).find('a').addClass('current-page-number-content');
        $(obj).find('span').addClass('current-page-number-content');
      }
    });
  }

  initPage();
});