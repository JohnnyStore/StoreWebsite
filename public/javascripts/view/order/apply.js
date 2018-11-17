$(document).ready(function () {
  $('li.switch-language').prev().remove();
  $('li.switch-language').remove();
  $('.btn-pay').click(function () {
    var loginCustomer = getLoginCustomer();
    var customerTel = loginCustomer.cellphone;
    var orderAmount = $('#hidden-order-amount').val();
    var paymentId = $('input[type="radio"][name="payment"]:checked').attr("id");
    var paymentMethod = '';
    var paymentQrUrl = '';
    var layerTitle = '';
    if(paymentId === 'ali'){
      paymentMethod = '支付宝';
      paymentQrUrl = '/images/qrCode/aliPayQRCode.png';
      layerTitle = '支付宝支付';
    }else{
      paymentMethod = '微信';
      paymentQrUrl = '/images/qrCode/weixinPayQRCode.jpeg';
      layerTitle = '微信支付';
    }
    layer.open({
      type: 1,
      skin: 'layui-layer-demo', //样式类名
      closeBtn: 0, //不显示关闭按钮
      anim: 2,
      shadeClose: true, //开启遮罩关闭
      area: ['383px', '635px'], //宽高
      content: '<div style="width: 352px; height: 520px; margin: 0 auto; margin-top: 10px">\n' +
      '  <div>\n' +
      '    <img src="' + paymentQrUrl + '" style="width: 352px;" alt="">\n' +
      '  </div>\n' +
      '  <div style="text-align: center; color: #ff7c00; font-size: 14px; margin-top: 10px">支付成功后，请务必<span style="color: red; font-weight: bolder">点击支付完成</span>按钮，以便及时发货。</div>' +
      '  <div style="margin-top: 15px; text-align: center">\n' +
      '    <button type="button" class="btn btn-success btn-block" id="btnPaymentComplete">支付完成</button>\n' +
      '  </div>\n' +
      '</div>'
    });

    $("#btnPaymentComplete").on("click",function(){
      layer.confirm('确认已支付完成？', {
        btn: ['确认','取消'] //按钮
      }, function(){
        //1. 发送通知短信
        $.ajax({
          url: '/apply/sendNoticeSms',
          type: 'post',
          dataType: 'json',
          data:{
            customerTel: customerTel,
            orderAmount: orderAmount
          },
          success: function (res) {
            if(res.err){
              // alertResponseError(res.code, res.msg);
              // return false;
            }
          },
          error: function (XMLHttpRequest, textStatus) {
            //alertReqestError('/register');
          }
        });

        //2. 更新订单状态
        $.ajax({
          url: '/myOrder/changeOrderStatus',
          type: 'put',
          dataType: 'json',
          data:{
            orderID: $('#hidden-order-id').val(),
            orderStatus: 'P',
            loginUser: loginCustomer.account
          },
          success: function (res) {
            if(res.err){
              alertResponseError(res.code, res.msg);
              return false;
            }
            location.href = '/success?orderNumber=' + $('#hidden-order-id').val();
          },
          error: function (XMLHttpRequest, textStatus) {
            alertReqestError('/myOrder/changeOrderStatus');
          }
        });

      }, function(){
        //layer.msg('关闭对话框');
      });
    });

    $('.layui-layer-title').html(layerTitle);
  });
});