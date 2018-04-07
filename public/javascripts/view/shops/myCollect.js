$(document).ready(function () {
  var customerID = getLoginCustomer().customerID;
  function initProcess() {
    setShoppingCartTotalCount();
    setCollectionTotalCount();
    setPurchasedTotalCount();
    $('li.switch-language').prev().remove();
    $('li.switch-language').remove();
  }

  function setShoppingCartTotalCount() {
    $.ajax({
      url: '/shops/shoppingCart/count?customerID=' + customerID,
      type: 'get',
      success: function (res) {
        if(res.error){
          location.href = '/error?errorCode=' + res.code + '&msg=' + res.msg;
          return false;
        }
        $('#shoppingCart-count').text(res.shoppingCartCount);
      },
      error: function(XMLHttpRequest, textStatus){
        location.href = '/error?errorCode=' + XMLHttpRequest.status + '&msg=' + XMLHttpRequest.statusText;
      }
    });
  }

  function setCollectionTotalCount() {
    var totalCount = $('div.bd>ul>li').length;
    $('#myCollection-count').text(totalCount);
  }

  function setPurchasedTotalCount() {
    $.ajax({
      url: '/shops/purchased/count?customerID=' + customerID,
      type: 'get',
      success: function (res) {
        if(res.error){
          location.href = '/error?errorCode=' + res.code + '&msg=' + res.msg;
          return false;
        }
        $('#purchased-count').text(res.purchasedCount);
      },
      error: function(XMLHttpRequest, textStatus){
        location.href = '/error?errorCode=' + XMLHttpRequest.status + '&msg=' + XMLHttpRequest.statusText;
      }
    });
  }
  $('.btn-addToCart').click(function () {
    var collectID = $(this).attr('data-collect-id');
    var itemID = $(this).attr('data-item-id');
    var shoppingCount = 1;
    var lan = localStorage.getItem('siteLanguage');
    var layer_dialog_title = '';
    var customer = getLoginCustomer();

    if(customer === undefined){
      layer_dialog_title = lan === 'cn'? '您尚未登陆' : 'Please login first';
      var htmlContent =
          '<div style="padding: 25px; margin-top: 18px">' +
          '<a href="/login?targetUrl=/mycollect" class="btn btn-success btn-block">我有爱宠族账号，去登陆>></a><br>' +
          '<a href="/register" class="btn btn-success btn-block">还没有账号，去注册>></a>' +
          '</div>';
      layer.open({
        type: 1,
        skin: 'layui-layer-rim', //加上边框
        area: ['420px', '240px'], //宽高
        content: htmlContent
      });

      $('.layui-layer-title').html(layer_dialog_title);
      return false;
    }

    //1. 将该商品添加到购物车
    $.ajax({
      url: '/item/shoppingCart',
      type: 'post',
      dataType: 'json',
      data:{
        itemID: itemID,
        customerID: customer.customerID,
        shoppingCount: shoppingCount,
        loginUser: customer.account
      },
      success: function(res){
        if(res.err){
          location.href = '/error?errorCode=' + resAll.code + '&msg=' + resAll.msg;
        }else{
          //2. 更新该数据在收藏表中的状态
          $.ajax({
            url: '/mycollect',
            type: 'put',
            dataType: 'json',
            data:{
              collectionID: collectID,
              status: 'S',
              loginUser: customer.account
            },
            success: function(resChange){
              if(resChange.err){
                location.href = '/error?errorCode=' + resChange.code + '&msg=' + resChange.msg;
              }
              layer_dialog_title = lan === 'cn'? '添加到购物车' : 'Add To Shipping cart';
              var htmlContent =
                  '<div class="add-shoppingCart-success">' +
                  '  <i class="fa fa-check-circle-o" style="position: absolute; font-size: 35px"></i>' +
                  '  <h3 class="lan-cn" style="position: absolute; left: 60px; top: 20px">商品已成功加入购物车！</h3>' +
                  '  <div style="position: absolute; top: 80px; left: 50px">' +
                  '    <button type="button" class="btn btn-default" style="width: 150px">' +
                  '      <span class="lan-cn">继续购物</span>' +
                  '      <span class="lan-en hidden">To Shopping</span>' +
                  '    </button>' +
                  '    <button type="button" class="btn btn-checking" style="width: 150px">' +
                  '      <span class="lan-cn">去购物车结算</span>' +
                  '      <span class="lan-en hidden">To Checkout</span>' +
                  '    </button>' +
                  '  </div>' +
                  '</div>';
              var index = layer.open({
                type: 1,
                skin: 'layui-layer-rim', //加上边框
                area: ['420px', '220px'], //宽高
                content: htmlContent
              });

              $('.layui-layer-title').html(layer_dialog_title);
              //添加按钮事件
              $(".add-shoppingCart-success").on("click", ".btn-default", function() {
                location.reload();
              });
              $(".add-shoppingCart-success").on("click", ".btn-checking", function() {
                location.href = '/shops';
              });
            },
            error: function(XMLHttpRequest, textStatus){
              location.href = '/error?errorCode=' + XMLHttpRequest.status + '&msg=request url:[/collection] error, detail:' + XMLHttpRequest.statusText;
            }
          });
        }
      },
      error: function(XMLHttpRequest, textStatus){
        location.href = '/error?errorCode=' + XMLHttpRequest.status + '&msg=' + XMLHttpRequest.statusText;
      }
    });
  });

  $('.btn-delete').click(function () {
    var collectID = $(this).attr('data-collect-id');
    var itemObj = $(this).parent().parent().parent();
    var lan = localStorage.getItem('siteLanguage');
    var layer_dialog_title = '';
    var customer = getLoginCustomer();

    if(customer === undefined){
      layer_dialog_title = lan === 'cn'? '您尚未登陆' : 'Please login first';
      var htmlContent =
          '<div style="padding: 25px; margin-top: 18px">' +
          '<a href="/login?targetUrl=/mycollect" class="btn btn-success btn-block">我有爱宠族账号，去登陆>></a><br>' +
          '<a href="/register" class="btn btn-success btn-block">还没有账号，去注册>></a>' +
          '</div>';
      layer.open({
        type: 1,
        skin: 'layui-layer-rim', //加上边框
        area: ['420px', '240px'], //宽高
        content: htmlContent
      });

      $('.layui-layer-title').html(layer_dialog_title);
      return false;
    }

    layer.confirm('您确定要从收藏栏中删除该商品吗？', {
      btn: ['删除','取消'],
      title:['删除收藏宝贝']
    }, function(){
      //1. 更新该数据在收藏表中的状态
      $.ajax({
        url: '/mycollect',
        type: 'put',
        dataType: 'json',
        data:{
          collectionID: collectID,
          status: 'D',
          loginUser: customer.account
        },
        success: function(resChange){
          if(resChange.err){
            location.href = '/error?errorCode=' + resChange.code + '&msg=' + resChange.msg;
          }
          //2. 从页面中将该内容删除
          itemObj.remove();
          setCollectionTotalCount();
          layer.closeAll();
        },
        error: function(XMLHttpRequest, textStatus){
          location.href = '/error?errorCode=' + XMLHttpRequest.status + '&msg=request url:[/collection] error, detail:' + XMLHttpRequest.statusText;
        }
      });
    });
  });

  initProcess();
});