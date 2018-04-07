$(document).ready(function () {
  var cellphoneIsValid = false;
  var emailIsValid = false;
  var passwordIsValid = false;
  var smsCodeIsValid = false;
  var lan = localStorage.getItem('siteLanguage');
  var countdown=60;
  var errMsg = '';
  
  function initPage() {
    setShowForm();
  }
  
  function setShowForm() {
    if(lan === 'cn'){
      $('.form-cellphone').removeClass('hidden');
      $('.form-email').addClass('hidden');
    }else{
      $('.form-cellphone').addClass('hidden');
      $('.form-email').removeClass('hidden');
    }
  }

  function checkData4CellphoneForm(){
    var cellphone = $.trim($('#cellphone').val());
    var validCode = $.trim($('#valid-code-cellphone').val());

    if(!checkNotEmpty(cellphone)){
      lan === 'cn' ? errMsg = '请输入手机号码。' : errMsg = 'Please enter cellphone number.';
      showErrorMsg($('#cellphone'), errMsg);
      return false;
    }

    if(!cellphoneIsValid){
      return false;
    }

    if(!checkNotEmpty(validCode)){
      lan === 'cn' ? errMsg = '请输入短信验证码。' : errMsg = 'Please enter SMS valid code.';
      showErrorMsg($('.validCode'), errMsg);
      return false;
    }

    if(!smsCodeIsValid){
      return false;
    }

    return true;
  }

  function checkData4EmailForm(){
    var email = $.trim($('#email').val());
    var validCode = $.trim($('#valid-code-email').val());

    if(!checkNotEmpty(email)){
      lan === 'cn' ? errMsg = '请输入邮件地址。' : errMsg = 'Please enter email address.';
      showErrorMsg($('#email'), errMsg);
      return false;
    }

    if(!emailIsValid){
      return false;
    }

    if(!checkNotEmpty(validCode)){
      lan === 'cn' ? errMsg = '请输入短信验证码。' : errMsg = 'Please enter SMS valid code.';
      showErrorMsg($('.validCode'), errMsg);
      return false;
    }

    if(!smsCodeIsValid){
      return false;
    }

    return true;
  }

  function checkData4PasswordForm(){
    var password = $.trim($('#password').val());
    var confirmPassword = $.trim($('#confirm-password').val());

    if(!checkNotEmpty(password)){
      lan === 'cn' ? errMsg = '请输入密码。' : errMsg = 'Please enter password.';
      showErrorMsg($('#password'), errMsg);
      return false;
    }

    if(!checkNotEmpty(confirmPassword)){
      lan === 'cn' ? errMsg = '请输入确认密码。' : errMsg = 'Please enter confirm password.';
      showErrorMsg($('#confirm-password'), errMsg);
      return false;
    }

    if(!passwordIsValid){
      return false;
    }

    return true;
  }

  function changePassword(){
    $.ajax({
      url: '/forgetPassword',
      type: 'post',
      dataType: 'json',
      data:{
        cellphone: $.trim($('#cellphone').val()),
        email: $.trim($('#email').val()),
        password: $.trim($('#password').val())
      },
      success: function (res) {
        if(res.err){
          layer.msg('密码修改失败，请稍后再试。');
          return false;
        }
        layer.alert('密码修改成功，去登陆。', {
          skin: 'layui-layer-molv' //样式类名
          ,closeBtn: 0
        }, function(){
          location.href = '/login';
        });
      },
      error: function (XMLHttpRequest, textStatus) {
        layer.msg(XMLHttpRequest.status + ':' + XMLHttpRequest.statusText);
      }
    });
  }

  function showPasswordForm(form){
    if(form === 'c'){
      $('.form-cellphone').addClass('hidden');
      $('.from-password').removeClass('hidden');
    }else{
      $('.form-email').addClass('hidden');
      $('.from-password').removeClass('hidden');
    }
  }

  function checkNotEmpty(v) {
    return $.trim(v).length !== 0;
  }

  function checkEqual(data1, data2) {
    return data1 === data2;
  }

  function sendValidCode(){
    $.ajax({
      url: '/register/sendValidCode',
      type: 'post',
      dataType: 'json',
      data:{
        cellphone: $.trim($('#cellphone').val()),
        email: $.trim($('#email').val())
      },
      success: function (res) {
        if(res.err){
          layer.msg(res.msg);
          return false;
        }
        if(lan === 'cn'){
          layer.msg('验证码已发送到您的手机。');
        }else{
          layer.msg('The verification code send your email address.');
        }

        setTime();
      },
      error: function (XMLHttpRequest, textStatus) {
        layer.msg(XMLHttpRequest.status + ':' + XMLHttpRequest.statusText);
      }
    });
  }

  function setTime(){
    if (countdown == 0) {
      $('.btn-validCode').attr("disabled",false);
      $('.btn-validCode').text("获取验证码");
      countdown = 60;
      return false;
    } else {
      $('.btn-validCode').attr("disabled", true);
      $('.btn-validCode').text("重新发送(" + countdown + ")");
      countdown--;
    }
    setTimeout(function() {
      setTime();
    },1000);
  }

  function showErrorMsg(errorObj, errorMsg) {
    $(errorObj).parent().parent().next().find('i').removeClass('hidden');
    $(errorObj).parent().parent().next().find('span').text(errorMsg);
  }

  function clearErrorMsg(errorObj) {
    if(!$(errorObj).parent().parent().next().find('i').hasClass('hidden')){
      $(errorObj).parent().parent().next().find('i').addClass('hidden');
    }
    $(errorObj).parent().parent().next().find('span').text('');
  }

  function checkIsCellphone(data) {
    var myReg=/^[1][3,4,5,7,8][0-9]{9}$/;
    return myReg.test(data);
  }

  function checkIsEmail(data) {
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");;
    return reg.test(data);
  }

  function checkDateBeforeSendValidCode() {
    var cellphone = $.trim($('#cellphone').val());
    var email = $.trim($('#email').val());
    if(lan === 'cn'){
      if(!checkNotEmpty(cellphone)){
        lan === 'cn' ? errMsg = '您输入手机号码。' : errMsg = 'Please enter cellphone number.';
        showErrorMsg($('#cellphone'), errMsg);
        return false;
      }
      if(!cellphoneIsValid){
        return false;
      }
    }else{
      if(!checkNotEmpty(email)){
        lan === 'cn' ? errMsg = '您输入邮箱地址。' : errMsg = 'Please enter email address.';
        showErrorMsg($('#email'), errMsg);
        return false;
      }
      if(!emailIsValid){
        return false;
      }
    }

    return true;
  }

  $('#cellphone').blur(function () {
    var cellphone = $.trim($(this).val());
    if(!checkNotEmpty(cellphone)){
      return false;
    }

    if(!checkIsCellphone(cellphone)){
      lan === 'cn' ? errMsg = '您输入的不是一个手机号码。' : errMsg = 'Your input is not a cellphone number.';
      cellphoneIsValid = false;
      showErrorMsg($('#cellphone'), errMsg);
      return false;
    }

    $.ajax({
      url: '/register/cellphone?data=' + cellphone,
      type: 'get',
      success: function (res) {
        if(res.err){
          layer.msg(res.msg);
          cellphoneIsValid = false;
          return false;
        }
        if(!res.exist){
          lan === 'cn' ? errMsg = '该手机号码不已存在。' : errMsg = 'The cellphone number dose not existed.';
          showErrorMsg($('#cellphone'), errMsg);
          cellphoneIsValid = false;
          return false;
        }
        clearErrorMsg($('#cellphone'));
        cellphoneIsValid = true;

      },
      error: function (XMLHttpRequest, textStatus) {
        cellphoneIsValid = false;
        layer.msg(XMLHttpRequest.status + ':' + XMLHttpRequest.statusText);
      }
    });
  });

  $('#email').blur(function () {
    var email = $.trim($(this).val());
    if(!checkNotEmpty(email)){
      return false;
    }

    if(!checkIsEmail(email)){
      lan === 'cn' ? errMsg = '您输入的不是一个邮箱地址。' : errMsg = 'Your input is not a email address.';
      emailIsValid = false;
      showErrorMsg($('#email'), errMsg);
      return false;
    }

    $.ajax({
      url: '/register/email?data=' + email,
      type: 'get',
      success: function (res) {
        if(res.err){
          layer.msg(res.msg);
          emailIsValid = false;
          return false;
        }
        if(!res.exist){
          lan === 'cn' ? errMsg = '该邮箱地址不存在。' : errMsg = 'The email address does not existed.';
          showErrorMsg($('#email'), errMsg);
          emailIsValid = false;
          return false;
        }
        clearErrorMsg($('#email'));
        emailIsValid = true;

      },
      error: function (XMLHttpRequest, textStatus) {
        emailIsValid = false;
        layer.msg(XMLHttpRequest.status + ':' + XMLHttpRequest.statusText);
      }
    });
  });

  $('.validCode').blur(function () {
    var cellphone = $.trim($('#cellphone').val());
    var email = $.trim($('#email').val());
    var validCode = $.trim($(this).val());

    if(lan === 'cn' && (!checkNotEmpty(cellphone) || !checkNotEmpty(validCode))){
      return false;
    }

    if(lan === 'en' && (!checkNotEmpty(email) || !checkNotEmpty(validCode))){
      return false;
    }

    $.ajax({
      url: '/register/validCode?cellphone=' + cellphone + '&email=' + email + '&validCode=' + validCode,
      type: 'get',
      success: function (res) {
        if(res.err){
          layer.msg(res.msg);
          smsCodeIsValid = false;
          return false;
        }
        if(!res.exist){
          lan === 'cn' ? errMsg = '验证码不正确。' : errMsg = 'The verification code is invalid.';
          showErrorMsg($('.validCode'), errMsg);
          smsCodeIsValid = false;
          return false;
        }
        if(res.expired){
          lan === 'cn' ? errMsg = '验证码已过期。' : errMsg = 'The verification code has expired.';
          showErrorMsg($('.validCode'), errMsg);
          smsCodeIsValid = false;
          return false;
        }

        clearErrorMsg($('.validCode'));
        smsCodeIsValid = true;
      },
      error: function (XMLHttpRequest, textStatus) {
        smsCodeIsValid = false;
        layer.msg(XMLHttpRequest.status + ':' + XMLHttpRequest.statusText);
      }
    });
  });

  $('#btn-cellphone-next').click(function () {
    if(!checkData4CellphoneForm()){
      return false;
    }
    showPasswordForm('c');

  });

  $('#btn-email-next').click(function () {
    if(!checkData4EmailForm()){
      return false;
    }
    showPasswordForm('e');
  });

  $('#confirm-password').blur(function () {
    var password = $.trim($('#password').val());
    var confirmPassword = $.trim($('#confirm-password').val());

    if(!checkNotEmpty(password) || !checkNotEmpty(confirmPassword)){
      passwordIsValid = false;
      return false;
    }

    if(!checkEqual(password, confirmPassword)){
      passwordIsValid = false;
      lan === 'cn' ? errMsg = '密码与确认密码不一致。' : errMsg = 'The password is not the same as the confirmed password.';
      showErrorMsg($('#confirm-password'), errMsg);
      return false;
    }
    clearErrorMsg($('#confirm-password'));
    passwordIsValid = true;
  });

  $('.btn-validCode').click(function () {
    if(!checkDateBeforeSendValidCode()){
      return false;
    }
    sendValidCode();
  });

  $('#btn-change').click(function () {
    if(!checkData4PasswordForm()){
      return false;
    }
    changePassword();
  });

  initPage();
});