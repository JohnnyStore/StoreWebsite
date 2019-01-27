$(function(){
  var customer = getLoginCustomer();
  var lan = localStorage.getItem('siteLanguage');

  function initPage(){
    setDefaultRecentMonth();
    setDefaultPageNumber();
    $('li.switch-language').prev().remove();
    $('li.switch-language').remove();
  }

  function setDefaultRecentMonth() {
    var recentMonth = $('#hidden-recentMonth').val();
    switch (recentMonth){
      case '3':
        $('.order_meau>ul>li:first-child>span.lan-cn').text($('#recently-months').children('a').eq(0).find('span.lan-cn').text());
        $('.order_meau>ul>li:first-child>span.lan-en').text($('#recently-months').children('a').eq(0).find('span.lan-en').text());
        break;
      case '6':
        $('.order_meau>ul>li:first-child>span.lan-cn').text($('#recently-months').children('a').eq(1).find('span.lan-cn').text());
        $('.order_meau>ul>li:first-child>span.lan-en').text($('#recently-months').children('a').eq(1).find('span.lan-en').text());
        break;
      case '12':
        $('.order_meau>ul>li:first-child>span.lan-cn').text($('#recently-months').children('a').eq(2).find('span.lan-cn').text());
        $('.order_meau>ul>li:first-child>span.lan-en').text($('#recently-months').children('a').eq(2).find('span.lan-en').text());
        break;
    }
  }

  function setDefaultPageNumber() {
    var currentPageNumber = $('#current-pageNumber').val();
    $('div.pagination ul li.page-num').each(function (index, obj) {
      if($(obj).text() === currentPageNumber){
        $(obj).addClass('current-page-number');
        $(obj).find('a').addClass('current-page-number-content');
        $(obj).find('span').addClass('current-page-number-content');
      }
    });
  }

  function changeOrderStatus(orderID, orderStatus){
    $.ajax({
      url: '/myOrder/changeOrderStatus',
      type: 'put',
      dataType: 'json',
      data:{
        orderID: orderID,
        orderStatus: orderStatus,
        loginUser: customer.account
      },
      success: function(res){
        if(res.err){
          alertResponseError(res.code, res.msg);
          return false;
        }
        location.reload();
      },
      error: function(XMLHttpRequest, textStatus){
        layer.msg('无法连接网络，请检查网络设置。');
      }
    });
  }

  $("#recently_order").mouseover(function(){
    $('.order_meau>ul>li:first-child').find('i').removeClass('fa-angle-down');
    $('.order_meau>ul>li:first-child').find('i').addClass('fa-angle-up');
    $(".order_month").show();
  });

  $("#recently_order").mouseout(function(){
    $('.order_meau>ul>li:first-child').find('i').removeClass('fa-angle-up');
    $('.order_meau>ul>li:first-child').find('i').addClass('fa-angle-down');
    $(".order_month").hide();
  });

  $('.btn-receive').click(function () {
    var orderID = $(this).attr('data-order-id');
    changeOrderStatus(orderID, 'F');
  });

  $('.btn-cancel').click(function () {
    var orderID = $(this).attr('data-order-id');
    changeOrderStatus(orderID, 'C');
  });

  $('.btn-review').click(function () {
    var itemID = $(this).attr('data-item-id');
    var htmlContent =
        '<div class="review">\n' +
        '  <form>\n' +
        '    <div class="form-group">\n' +
        '      <i class="fa fa-star review-star star-red" data-score="1"></i>\n' +
        '      <i class="fa fa-star review-star star-red" data-score="2"></i>\n' +
        '      <i class="fa fa-star review-star star-red" data-score="3"></i>\n' +
        '      <i class="fa fa-star review-star star-red" data-score="4"></i>\n' +
        '      <i class="fa fa-star review-star star-red" data-score="5"></i>\n' +
        '      <span class="star-num">5</span>\n' +
        '      <span class="lan-cn star-num-unit">分</span>\n' +
        '      <span class="lan-en star-num-unit hidden">Score</span>\n' +
        '    </div>\n' +
        '    <div class="form-group">\n' +
        '      <label class="radio-inline">\n' +
        '        <input type="radio" name="reviewLevel" value="G" checked>\n' +
        '        <span class="lan-cn">好评</span>\n' +
        '        <span class="lan-en hidden">Good</span>\n' +
        '      </label>\n' +
        '      <label class="radio-inline">\n' +
        '        <input type="radio" name="reviewLevel" value="N">\n' +
        '        <span class="lan-cn">中评</span>\n' +
        '        <span class="lan-en hidden">Middle</span>\n' +
        '      </label>\n' +
        '      <label class="radio-inline">\n' +
        '        <input type="radio" name="reviewLevel" value="B">\n' +
        '        <span class="lan-cn">差评</span>\n' +
        '        <span class="lan-en hidden">Bad</span>\n' +
        '      </label>\n' +
        '    </div>\n' +
        '    <div class="form-group">\n' +
        '      <textarea class="review-text" rows="3" maxlength="100" placeholder="请填写您对商品的评价"></textarea>\n' +
        '    </div>\n' +
        '    <div class="form-group tip hidden">\n' +
        '      <span>\n' +
        '        <i class="fa fa-info-circle icon-tip"></i>\n' +
        '        <em class="lan-cn tip-text">请填写商品的评论信息。</em>\n' +
        '        <em class="lan-en hidden tip-text">Please write item review information.</em>\n' +
        '      </span>\n' +
        '    </div>\n' +
        '    <button type="button" class="btn btn-review-submit">\n' +
        '      <span class="lan-cn">提交评论</span>\n' +
        '      <span class="lan-en hidden">Submit</span>\n' +
        '    </button>\n' +
        '  </form>\n' +
        '</div>';

    var index = layer.open({
      type: 1,
      skin: 'layui-layer-rim', //加上边框
      area: ['460px', '330px'], //宽高
      content: htmlContent
    });

    $(".review").on("click", ".review-star", function() {
      var score = $(this).attr('data-score');
      $('.review i').removeClass('star-red');
      $.each($('.review i'), function (index, icon) {
        if(index <= score - 1){
          $(icon).addClass('star-red');
        }
      });
      $('.star-num').text(score);
    });

    $(".review").on("click", ".btn-review-submit", function() {
      var reviewText = $.trim($('.review-text').val());
      var starNum = $('.star-num').text();
      var reviewLevel = $('.review input[type="radio"]:checked').attr('value');

      if(reviewText.length === 0){
        $('.review .tip').removeClass('hidden');
        return false;
      }
      //提交评论
      $.ajax({
        url: '/myOrder/addItemReview',
        type: 'post',
        dataType: 'json',
        data:{
          customerID: customer.customerID,
          itemID: itemID,
          starNum: starNum,
          reviewLevel: reviewLevel,
          reviewText: reviewText,
          reviewStatus: 'P',
          loginUser: customer.account
        },
        success: function(res){
          if(res.err){
            alertResponseError(res.code, res.msg);
            return false;
          }
          $('.review .tip').addClass('hidden');
          layer.close(index);
          layer.msg(lan === 'cn'? '添加评论成功。' : 'Add review success.');
          location.reload();
        },
        error: function(XMLHttpRequest, textStatus){
          layer.msg('无法连接网络，请检查网络设置。');
        }
      });
    });
  });

  initPage();
});