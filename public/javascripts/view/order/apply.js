$(document).ready(function () {
  $('.btn-pay').click(function () {
    //todo 支付功能待实现
    location.href = '/success?orderNumber=' + $('#hidden-order-id').val();
  });
});