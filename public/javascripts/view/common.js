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