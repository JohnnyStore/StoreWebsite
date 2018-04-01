$(document).ready(function () {
  function alertMessage(msg) {
    $('div.login form').find('div.alert').remove();
    $('div.login form').prepend('<div class="alert alert-danger" role="alert">' + msg + '</div>');
  }

  function loginProcess() {
    if(!checkData()){
      return false;
    }
    login();
  }

  function checkData() {
    var userName = $.trim($('#user-name').val());
    var password = $.trim($('#password').val());
    if(userName.length === 0){
      alertMessage('请输入登陆账号。');
      $('#user-name').focus();
      return false;
    }
    if(password.length === 0){
      alertMessage('请输入密码。');
      $('#password').focus();
      return false;
    }
    return true;
  }

  function login() {
    var userName = $.trim($('#user-name').val());
    var password = $.trim($('#password').val());
    var remember = $('.login-remember input').is(":checked");
    var target = $('#hidden-target').val();
    $.ajax({
      url: '/login/userInfo?userName=' + userName + '&password=' + password,
      type: 'get',
      success: function (res) {
        if(res.error){
          location.href = '/error?errorCode=' + res.code + '&msg=' + res.msg;
          return false;
        }
        if(res.data === null || res.data.length === 0){
          alertMessage('用户名或者密码不存在。');
          $('#user-name').focus();
          return false;
        }
        if(res.data.frozen){
          alertMessage('您的账户已冻结，请联系客服。');
          return false;
        }
        var loginCustomer = JSON.stringify(res.data);
        setCookie('loginCustomer', loginCustomer, remember);
        setCookie('loginCustomerID', res.data.customerID, remember);
        location.href = target;
      },
      error: function(XMLHttpRequest, textStatus){
        location.href = '/error?errorCode=' + XMLHttpRequest.status + '&msg=' + XMLHttpRequest.statusText;
      }
    });
  }

  $(document).keydown(function (e) {
    if(e.keyCode === 13){
      loginProcess()
    }
  });

  $('.btn-login').click(function () {
    loginProcess();
  });
});