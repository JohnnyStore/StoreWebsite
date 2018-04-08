$(document).ready(function () {
  function initPage() {
    initPageLanguage();
  }

  function initPageLanguage() {
    setDefaultLanguage();
    setPageLanguage();
    setHeaderBar();
  }

  function setDefaultLanguage() {
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

  function setHeaderBar() {
    var customer = getLoginCustomer();
    if(customer === null){
      $('.no-login').removeAttr('style');
      $('.has-login').attr('style', 'display: none');
      return false;
    }

    $('.login-account').text(customer.account);
    setCollectionTotalCount(customer.customerID);
    setShoppingCartTotalCount(customer.customerID);
    $('.has-login').removeAttr('style');
    $('.no-login').attr('style', 'display: none');
  }

  function setCollectionTotalCount(customerID) {
    $.ajax({
      url: '/shops/collect/count?customerID=' + customerID,
      type: 'get',
      success: function (res) {
        if(res.error){
          location.href = '/error?errorCode=' + res.code + '&msg=' + res.msg;
          return false;
        }
        $('.shopping-collection-count').text('(' + res.collectionCount + ')');
      },
      error: function(XMLHttpRequest, textStatus){
        location.href = '/error?errorCode=' + XMLHttpRequest.status + '&msg=' + XMLHttpRequest.statusText;
      }
    });
  }

  function setShoppingCartTotalCount(customerID) {
    $.ajax({
      url: '/shops/shoppingCart/count?customerID=' + customerID,
      type: 'get',
      success: function (res) {
        if(res.error){
          location.href = '/error?errorCode=' + res.code + '&msg=' + res.msg;
          return false;
        }
        $('.shopping-cart-count').text('(' + res.shoppingCartCount + ')');
      },
      error: function(XMLHttpRequest, textStatus){
        location.href = '/error?errorCode=' + XMLHttpRequest.status + '&msg=' + XMLHttpRequest.statusText;
      }
    });
  }

  $('.search-control').bind('input propertychange',function(){
    var content = $.trim($(this).val());
    var lan = localStorage.getItem("siteLanguage");
    if(content.length === 0){
      $('.search-list').removeAttr('style');
      return false;
    }

    $('.search-list li').remove();

    $.ajax({
      url: '/fuzzySearch?itemDes=' + content,
      type: 'get',
      success: function (res) {
        if(res.err){
          layer.msg(res.msg);
          return false;
        }

        $('.search-list li').remove();
        if(res.data === null || res.data.length === 0){
          return false;
        }
        $.each(res.data, function(index, v){
          if(lan === 'cn'){
            $('.search-list').append('<li class="search-item" data-content="' + v.itemShortDescriptionCN + '" onclick="location.href = \'/itemList?itemDes=' + v.itemShortDescriptionCN + '\'">' + v.brandCN + ' ' + v.itemShortDescriptionCN + '</li>');
          }else{
            $('.search-list').append('<li class="search-item" data-content="' + v.itemShortDescriptionEN + '" onclick="location.href = \'/itemList?itemDes=' + v.itemShortDescriptionEN + '\'">' + v.brandEN + ' ' + v.itemShortDescriptionCN + '</li>');
          }
        });

        $('.search-list').append('<li role="separator" class="divider"></li>');
        $('.search-list').append('<li class="search-item text-right"><a href="#" onclick="$(\'.search-list\').removeAttr(\'style\')">Close</a></li>');
        $('.search-list').attr('style', 'visibility: visible');
      },
      error: function(XMLHttpRequest, textStatus){
        layer.msg(XMLHttpRequest.status + ':' + XMLHttpRequest.statusText);
      }
    });
  });


  $('.search-control').keydown(function (e) {
    var maxIndex = $(".search-list li").length - 3;
    var currentSelected = -1;
    var content = '';
    if(e.keyCode === 13) {
      content = $.trim($('.search-control').val());
      currentSelected = $(".search-list li.search-item-selected").index();
      if(currentSelected >= 0){
        content = $(".search-list li").eq(currentSelected).attr('data-content');
      }

      if (content.length === 0) {
        return false;
      }
      location.href = '/itemList?itemDes=' + content;
    }else if(e.keyCode === 40){ //下键
      currentSelected = $(".search-list li.search-item-selected").index();
      currentSelected++;
      if(currentSelected > maxIndex){
        currentSelected = 0;
      }
      $(".search-list").children("li").removeClass('search-item-selected');
      $(".search-list").children("li").eq(currentSelected).addClass('search-item-selected');
    }else if(e.keyCode === 38){ //上键
      var currentSelected = $(".search-list li.search-item-selected").index();
      currentSelected--;
      if(currentSelected < 0){
        currentSelected = maxIndex;
      }
      $(".search-list").children("li").removeClass('search-item-selected');
      $(".search-list").children("li").eq(currentSelected).addClass('search-item-selected');
    }
  });

  $('#btn-common-search').click(function () {
    var content = $.trim($('.search-control').val());
    var currentSelected = $(".search-list li.search-item-selected").index();
    if(currentSelected >= 0){
      content = $(".search-list li").eq(currentSelected).attr('data-content');
    }

    if (content.length === 0) {
      return false;
    }
    location.href = '/itemList?itemDes=' + content;
  });

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

  $('.exit-account').click(function () {
    delCookie('loginCustomer');
    delCookie('loginCustomerID');
    location.href = '/';
  });

  $('#btn-login').click(function () {
    var target = location.pathname + location.search;
    location.href = '/login?targetUrl=' + target;
  });

  initPage();
});

function getLoginCustomer() {
  var loginCookie = getCookie('loginCustomer');
  if(loginCookie === null){
    return null;
  }
  return JSON.parse(loginCookie);
}
function setCookie(name,value, save) {
  var days = 30;
  if(save !== undefined && save === false){
    days = 0.5;
  }

  var exp = new Date();
  exp.setTime(exp.getTime() + days*24*60*60*1000);
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(name) {
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}

function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval=getCookie(name);
  if(cval!=null)
    document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}