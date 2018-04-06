$(document).ready(function () {
  var userNameIsValid = false;
  var cellphoneIsValid = false;
  var passwordIsValid = false;
  var smsCodeIsValid = false;
  var lan = localStorage.getItem('siteLanguage');
  var countdown=60;
  var errMsg = '';

  /**
   * 校验待注册数据的正确性
   * @returns {boolean}
   */
  function checkDate(){
    var userName = $.trim($('#user-name').val());
    var password = $.trim($('#password').val());
    var confirmPassword = $.trim($('#confirm-password').val());
    var cellphone = $.trim($('#cellphone').val());
    var validCode = $.trim($('#valid-code').val());

    if(!checkNotEmpty(userName)){
      lan === 'cn' ? errMsg = '请输入注册账号。' : errMsg = 'Please enter account.';
      showErrorMsg($('#user-name'), errMsg);
      return false;
    }

    if(!userNameIsValid){
      return false;
    }

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
      showErrorMsg($('#valid-code'), errMsg);
      return false;
    }

    if(!smsCodeIsValid){
      return false;
    }

    return true;
  }

  /**
   * 校验数据是否不为空
   * @param v 待校验数据
   * @returns {boolean}
   */
  function checkNotEmpty(v) {
    return $.trim(v).length !== 0;
  }

  /**
   * 校验两个数据是否相等
   * @param data1 第一个数据
   * @param data2 第二个数据
   * @returns {boolean}
   */
  function checkEqual(data1, data2) {
    return data1 === data2;
  }

  /**
   * 校验数据是否是一个正确的手机号码
   * @param data 待校验数据
   * @returns {boolean}
   */
  function checkIsCellphone(data) {
    var myReg=/^[1][3,4,5,7,8][0-9]{9}$/;
    return myReg.test(data);
  }

  /**
   * 显示错误提示信息
   * @param errorObj 校验有误的页面元素
   * @param errorMsg 错误信息
   */
  function showErrorMsg(errorObj, errorMsg) {
    $(errorObj).parent().parent().next().find('i').removeClass('hidden');
    $(errorObj).parent().parent().next().find('span').text(errorMsg);
  }

  /**
   * 清空错误提示信息
   * @param errorObj 待清空的页面元素
   */
  function clearErrorMsg(errorObj) {
    if(!$(errorObj).parent().parent().next().find('i').hasClass('hidden')){
      $(errorObj).parent().parent().next().find('i').addClass('hidden');
    }
    $(errorObj).parent().parent().next().find('span').text('');
  }

  /**
   * 用户注册
   */
  function register(){
    $.ajax({
      url: '/register',
      type: 'post',
      dataType: 'json',
      data:{
        account: $.trim($('#user-name').val()),
        password: $.trim($('#password').val()),
        customerType: $.trim($('#customer-role').val()),
        cellphone: $.trim($('#cellphone').val()),
        loginUser: $.trim($('#user-name').val())
      },
      success: function (res) {
        if(res.err){
          layer.msg('账户注册失败，' + res.msg);
          return false;
        }
        layer.alert('注册成功，去登陆。', {
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

  /**
   * 发送手机验证码
   */
  function sendValidCode(){
    var cellphone = $.trim($('#cellphone').val());
    if(!checkNotEmpty(cellphone)){
      lan === 'cn' ? errMsg = '您输入手机号码。' : errMsg = 'Please enter cellphone number.';
      showErrorMsg($('#cellphone'), errMsg);
      return false;
    }
    if(!cellphoneIsValid){
      return false;
    }
    $.ajax({
      url: '/register/sendValidCode',
      type: 'post',
      dataType: 'json',
      data:{
        cellphone: $.trim($('#cellphone').val())
      },
      success: function (res) {
        if(res.err){
          layer.msg(res.msg);
          return false;
        }
        setTime();
      },
      error: function (XMLHttpRequest, textStatus) {
        layer.msg(XMLHttpRequest.status + ':' + XMLHttpRequest.statusText);
      }
    });
  }

  /**
   * 倒计时
   */
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

  /**
   * 账号元素焦点离开事件
   */
  $('#user-name').blur(function () {
    var account = $.trim($('#user-name').val());
    if(!checkNotEmpty(account)){
      return false;
    }
    $.ajax({
      url: '/register/account?data=' + account,
      type: 'get',
      success: function (res) {
        if(res.err){
          layer.msg(res.msg);
          userNameIsValid = false;
          return false;
        }
        if(res.exist){
          lan === 'cn' ? errMsg = '您输入的账号已存在。' : errMsg = 'The account has existed.';
          showErrorMsg($('#user-name'), errMsg);
          userNameIsValid = false;
          return false;
        }
        clearErrorMsg($('#user-name'));
        userNameIsValid = true;

      },
      error: function (XMLHttpRequest, textStatus) {
        userNameIsValid = false;
        layer.msg(XMLHttpRequest.status + ':' + XMLHttpRequest.statusText);
      }
    });
  });

  /**
   * 确认密码焦点离开事件
   */
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

  /**
   * 手机号码元素焦点离开事件
   */
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
        if(res.exist){
          lan === 'cn' ? errMsg = '该手机号码已存在。' : errMsg = 'The cellphone number has existed.';
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

  /**
   * 手机验证码元素焦点离开事件
   */
  $('#valid-code').blur(function () {
    var cellphone = $.trim($('#cellphone').val());
    var validCode = $.trim($(this).val());

    if(!checkNotEmpty(cellphone) || !checkNotEmpty(validCode)){
      return false;
    }

    $.ajax({
      url: '/register/validCode?cellphone=' + cellphone + '&validCode=' + validCode,
      type: 'get',
      success: function (res) {
        if(res.err){
          layer.msg(res.msg);
          smsCodeIsValid = false;
          return false;
        }
        if(!res.exist){
          lan === 'cn' ? errMsg = '短信验证码不正确。' : errMsg = 'The SMS valid code is invalid.';
          showErrorMsg($('#valid-code'), errMsg);
          smsCodeIsValid = false;
          return false;
        }
        if(res.expired){
          lan === 'cn' ? errMsg = '验证码已过期。' : errMsg = 'The SMS valid code has expired.';
          showErrorMsg($('#valid-code'), errMsg);
          smsCodeIsValid = false;
          return false;
        }

        clearErrorMsg($('#valid-code'));
        smsCodeIsValid = true;
      },
      error: function (XMLHttpRequest, textStatus) {
        smsCodeIsValid = false;
        layer.msg(XMLHttpRequest.status + ':' + XMLHttpRequest.statusText);
      }
    });
  });

  /**
   * 注册按钮事件
   */
  $('.btn-register').click(function () {
    if(!checkDate()){
      return false;
    }
    register();
  });

  /**
   * 发送验证码按钮事件
   */
  $('.btn-validCode').click(function () {
    sendValidCode();
  });
});