$(document).ready(function () {
  function setNav() {
    setIndexNav();
    setBrandNav();
    setCategory();
  }

  function setIndexNav(){
    var lan = localStorage.getItem("siteLanguage");
    var title = lan === 'cn' ? '首页' : 'Home';
    $('.index-list').append(
        '<a href="/">\n' +
        ' <span class="shopping-cart-text">' + title + '</span>\n' +
        '</a>');
  }

  function setBrandNav() {
    $.ajax({
      url: '/common/brand',
      type: 'GET',
      success: function(res){
        if(res.err){
          location.href = '/error';
        }else{
          var lan = localStorage.getItem("siteLanguage");
          var title = lan === 'cn' ? '品牌商品' : 'Brands';
          $('.brand-list').append(
              '<a href="#" class="dropdown-toggle" data-toggle="dropdown">\n' +
              ' <span class="shopping-cart-text">' + title + '</span>\n' +
              '</a>' +
              '<ul class="dropdown-menu"></ul>');

          $.each(res.brandList, function(index, obj){
            var brandName = lan === 'cn' ? obj.brandCN : obj.brandEN;
            $('.brand-list ul').prepend(
                '<li>\n' +
                '\t<a href="/itemList?key=brand&value=' + obj.brandID + '">\n' +
                '\t  <span class="shopping-cart-text">' + brandName + '</span>\n' +
                '\t</a>\n' +
                '</li>');
          });
          var brandName = lan === 'cn' ? '全部品牌' : 'All Brand';
          $('.brand-list ul').append(
              '<li>\n' +
              '\t<a href="/itemList?key=brand&value=all">\n' +
              '\t  <span class="shopping-cart-text">' + brandName + '</span>\n' +
              '\t</a>\n' +
              '</li>');
        }
      },
      error: function(XMLHttpRequest, textStatus){
        location.href = '/error?errorCode=' + XMLHttpRequest.status;
      }
    });
  }
  
  function setCategory() {
    $.ajax({
      url: '/common/category',
      type: 'GET',
      success: function(res){
        if(res.err){
          location.href = '/error';
        }else{
          //二级菜单标题
          var lan = localStorage.getItem("siteLanguage");
          var title = lan === 'cn' ? '宠物商品' : 'Pets';
          $('.category-list').append(
              '<a href="#" class="dropdown-toggle" data-toggle="dropdown">\n' +
              ' <span class="shopping-cart-text">' + title + '</span>\n' +
              '</a>' +
              '<ul class="dropdown-menu"></ul>');

          //二级菜单内容
          $.each(res.categoryList, function(index, obj){
            var categoryName = lan === 'cn' ? obj.categoryCN : obj.categoryEN;
            $('.category-list>ul').prepend(
                '<li class="dropdown" data-category-id="' + obj.categoryID + '">\n' +
                '\t<a href="/itemList?category=' + obj.categoryID + '" class="dropdown-toggle" data-toggle="dropdown">\n' +
                '\t  <span class="shopping-cart-text">' + categoryName + '</span>\n' +
                '\t</a>\n' +
                '\t<ul class="dropdown-menu sub-dropdown-menu"></ul>\n' +
                '</li>');
          });

          //二级菜单所有
          var categoryName = lan === 'cn' ? '全部商品' : 'All Goods';
          $('.category-list>ul').append(
              '<li>\n' +
              '\t<a href="/itemList?category=all">\n' +
              '\t  <span class="shopping-cart-text">' + categoryName + '</span>\n' +
              '\t</a>\n' +
              '</li>');

          //subCategory
          $('.category-list>ul>li').each(function (index, obj) {
            var categoryID = $(obj).attr('data-category-id');
            if(categoryID !== undefined){
                $.ajax({
                  url: '/common/subCategory?categoryID=' + categoryID,
                  type: 'GET',
                  async: false,
                  success: function (res) {
                    if(res.subCategoryList !== null){
                      $.each(res.subCategoryList, function(j, sub){
                        var subCategoryName = lan === 'cn' ? sub.subCategoryCN : sub.subCategoryEN;
                        $(obj).children('ul.sub-dropdown-menu').append(
                            '<li>\n' +
                            '\t<a href="/itemList?category=' + categoryID + '&subCategory=' + sub.subCategoryID + '">\n' +
                            '\t  <span class="shopping-cart-text">' + subCategoryName + '</span>\n' +
                            '\t</a>\n' +
                            '</li>');
                      });
                    }
                  },
                  error: function (XMLHttpRequest, textStatus) {

                  }
                });
            }
          });
        }
      },
      error: function(XMLHttpRequest, textStatus){
        location.href = '/error?errorCode=' + XMLHttpRequest.status;
      }
    });
  }

  function setDefaultLanguage(){

  }

  function initPageLanguage() {
    var lan = localStorage.getItem("siteLanguage");
    if(lan === null){
      localStorage.setItem("siteLanguage",'cn');
    }
  }

  function setPageLanguage() {
    var lan = localStorage.getItem("siteLanguage");
    if(lan === 'cn'){
      $('.header .switch-language span.language').text('中文');
      $('.lan-en').addClass('hidden');
      $('.lan-cn').removeClass('hidden');
    }else{
      $('.header .switch-language span.language').text('English');
      $('.lan-cn').addClass('hidden');
      $('.lan-en').removeClass('hidden');
    }
  }

  $('.header .switch-language ul li').click(function () {
    var value = $(this).attr('value');
    var text = $(this).text();
    $('.header .switch-language span.language').text(text);
    if(value === 'cn'){
      localStorage.setItem("siteLanguage",'cn');
      $('.lan-en').addClass('hidden');
      $('.lan-cn').removeClass('hidden');
    }else{
      localStorage.setItem("siteLanguage",'en');
      $('.lan-cn').addClass('hidden');
      $('.lan-en').removeClass('hidden');
    }
  });

  initPageLanguage();
  setPageLanguage();
  //setNav();
});