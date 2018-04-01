$(document).ready(function () {
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
  initPageLanguage();
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