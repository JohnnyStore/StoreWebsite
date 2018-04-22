$(document).ready(function () {
  var orderStatus = $('#order-status').val();
  if(orderStatus === 'O'){
    $('.order_succes_warn i').addClass('fa fa-check-circle');
    $('.order_succes_warn span.success-text').text('恭喜你！支付成功!');
  }else{
    $('.order_succes_warn i').addClass('fa fa-info-circle');
    $('.order_succes_warn span.success-text').text('订单尚未支付，请尽快支付！');
  }
});