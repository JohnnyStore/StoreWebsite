$(document).ready(function () {
  $('li.switch-language').prev().remove();
  $('li.switch-language').remove();
  var orderStatus = $('#order-status').val();
  switch (orderStatus){
    case 'O':
      $('.order_succes_warn i').addClass('fa fa-info-circle');
      $('.order_succes_warn span.success-text').text('订单尚未支付，请尽快支付！');
      break;
    case 'P':
      $('.order_succes_warn i').addClass('fa fa-check-circle');
      $('.order_succes_warn span.success-text').text('恭喜你！支付成功!');
      break;
    case 'E':
      $('.order_succes_warn i').addClass('fa fa-check-circle');
      $('.order_succes_warn span.success-text').text('订单已过期!');
      break;
    case 'C':
      $('.order_succes_warn i').addClass('fa fa-check-circle');
      $('.order_succes_warn span.success-text').text('订单已取消!');
      break;
    case 'D':
      $('.order_succes_warn i').addClass('fa fa-check-circle');
      $('.order_succes_warn span.success-text').text('订单已删除!');
      break;
    case 'S':
      $('.order_succes_warn i').addClass('fa fa-check-circle');
      $('.order_succes_warn span.success-text').text('订单正在配送!');
      break;
    case 'R':
      $('.order_succes_warn i').addClass('fa fa-check-circle');
      $('.order_succes_warn span.success-text').text('订单已退款!');
      break;
    case 'F':
      $('.order_succes_warn i').addClass('fa fa-check-circle');
      $('.order_succes_warn span.success-text').text('订单已完成!');
      break;
  }
});