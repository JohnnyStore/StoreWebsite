$(document).ready(function () {
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
});

function getLoginCustomer() {
  var cookie = getCookie('customerInfo');
  if(cookie !== null){
    var loginUser = JSON.parse(cookie);
    return loginUser;
  }

  return 'unknown';
}

function setCookie(name,value) {
  var days = 30;
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