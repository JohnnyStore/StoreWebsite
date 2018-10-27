$(document).ready(function () {
  function laodDefalutInfo(){
    var targetInfo = $('#hidden-targetInfo').val();
    $.ajax({
      url: '/introduction/detail',
      type: 'get',
      success: function(res){
        if(res.err){
          alertResponseError(res.code, res.msg);
        }else{
          if(res.data === null){
            return false;
          }
          $('.company-content').html(res.data.introduction);
          $('.contact-content').html(res.data.contact);
          if(targetInfo !== ''){
            switch (targetInfo) {
              case '1':
                $('div.company').trigger("click");
                break;
              case '2':
                $('div.contact').trigger("click");
                break;
            }
          }
        }
      },
      error: function(XMLHttpRequest, textStatus){
        layer.msg('远程服务无响应，状态码：' + XMLHttpRequest.status);
      }
    });
  }

  $('div.company').click(function () {
    $('div.contact').removeClass('current');
    $('div.company').addClass('current');
    $('div.contact-content').addClass('hidden');
    $('div.company-content').removeClass('hidden');
  });

  $('div.contact').click(function () {
    $('div.company').removeClass('current');
    $('div.contact').addClass('current');
    $('div.company-content').addClass('hidden');
    $('div.contact-content').removeClass('hidden');
  });

  laodDefalutInfo();
});