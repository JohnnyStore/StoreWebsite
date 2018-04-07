$(function () {
  //全局的checkbox选中和未选中的样式
  var $allCheckbox = $('input[type="checkbox"]'),     //全局的全部checkbox
      $wholeChexbox = $('.whole_check'),
      $cartBox = $('.cartBox'),                       //每个商铺盒子
      $shopCheckbox = $('.shopChoice'),               //每个商铺的checkbox
      $sonCheckBox = $('.son_check');                 //每个商铺下的商品的checkbox
  $customerID = getLoginCustomer().customerID;

  $allCheckbox.click(function () {
    if ($(this).is(':checked')) {
      $(this).next('label').addClass('mark');
    } else {
      $(this).next('label').removeClass('mark')
    }
  });

  //===============================================全局全选与单个商品的关系================================
  $wholeChexbox.click(function () {
    var $checkboxs = $cartBox.find('input[type="checkbox"]');
    if ($(this).is(':checked')) {
      $checkboxs.prop("checked", true);
    } else {
      $checkboxs.prop("checked", false);
    }
    totalMoney();
  });


  $sonCheckBox.each(function () {
    $(this).click(function () {
      if ($(this).is(':checked')) {
        //判断：所有单个商品是否勾选
        var len = $sonCheckBox.length;
        var num = 0;
        $sonCheckBox.each(function () {
          if ($(this).is(':checked')) {
            num++;
          }
        });
        if (num == len) {
          $wholeChexbox.prop("checked", true);
          $wholeChexbox.next('label').addClass('mark');
        }
      } else {
        //单个商品取消勾选，全局全选取消勾选
        $wholeChexbox.prop("checked", false);
        $wholeChexbox.next('label').removeClass('mark');
      }
    })
  })

  //=======================================每个店铺checkbox与全选checkbox的关系/每个店铺与其下商品样式的变化===================================================
  //店铺有一个未选中，全局全选按钮取消对勾，若店铺全选中，则全局全选按钮打对勾。
  $shopCheckbox.each(function () {
    $(this).click(function () {
      if ($(this).is(':checked')) {
        //判断：店铺全选中，则全局全选按钮打对勾。
        var len = $shopCheckbox.length;
        var num = 0;
        $shopCheckbox.each(function () {
          if ($(this).is(':checked')) {
            num++;
          }
        });
        if (num == len) {
          $wholeChexbox.prop("checked", true);
          $wholeChexbox.next('label').addClass('mark');
        }

        //店铺下的checkbox选中状态
        $(this).parents('.cartBox').find('.son_check').prop("checked", true);
        $(this).parents('.cartBox').find('.son_check').next('label').addClass('mark');
      } else {
        //否则，全局全选按钮取消对勾
        $wholeChexbox.prop("checked", false);
        $wholeChexbox.next('label').removeClass('mark');

        //店铺下的checkbox选中状态
        $(this).parents('.cartBox').find('.son_check').prop("checked", false);
        $(this).parents('.cartBox').find('.son_check').next('label').removeClass('mark');
      }
      totalMoney();
    });
  });


  //========================================每个店铺checkbox与其下商品的checkbox的关系======================================================
  //店铺$sonChecks有一个未选中，店铺全选按钮取消选中，若全都选中，则全选打对勾
  $cartBox.each(function () {
    var $this = $(this);
    var $sonChecks = $this.find('.son_check');
    $sonChecks.each(function () {
      $(this).click(function () {
        if ($(this).is(':checked')) {
          //判断：如果所有的$sonChecks都选中则店铺全选打对勾！
          var len = $sonChecks.length;
          var num = 0;
          $sonChecks.each(function () {
            if ($(this).is(':checked')) {
              num++;
            }
          });
          if (num == len) {
            $(this).parents('.cartBox').find('.shopChoice').prop("checked", true);
            $(this).parents('.cartBox').find('.shopChoice').next('label').addClass('mark');
          }

        } else {
          //否则，店铺全选取消
          $(this).parents('.cartBox').find('.shopChoice').prop("checked", false);
          $(this).parents('.cartBox').find('.shopChoice').next('label').removeClass('mark');
        }
        totalMoney();
      });
    });
  });


  //=================================================商品数量==============================================
  var $plus = $('.plus'),
      $reduce = $('.reduce'),
      $all_sum = $('.sum');

  $plus.click(function () {
    if($(this).hasClass('reSty')){
      return false;
    }
    var $inputVal = $(this).prev('input'),
        $count = parseInt($inputVal.val())+1;

    var $obj = $(this).parents('.item-amount').find('.reduce'),

        $priceTotal4RMBObj = $(this).parents('.shop_item').find('.sum_price').find('span.lan-cn'),
        $priceTotal4USDObj = $(this).parents('.shop_item').find('.sum_price').find('span.lan-en'),

        $price4RMB = $(this).parents('.shop_item').find('.price.lan-cn').html(),  //人民币单价
        $price4USD = $(this).parents('.shop_item').find('.price.lan-en').html(),  //美金单价

    $priceTotal4RMB = $count.mul($price4RMB.substring(1)), //人民币总价
    $priceTotal4USD = $count.mul($price4USD.substring(1)); //美金总价

    $inputVal.val($count);
    $priceTotal4RMBObj.text('￥' + $priceTotal4RMB.toFixed(2));
    $priceTotal4USDObj.text('$' + $priceTotal4USD.toFixed(2));

    if($inputVal.val()>1 && $obj.hasClass('reSty')){
      $obj.removeClass('reSty');
    }
    totalMoney();
    if($count >= 99){
      $(this).addClass('reSty');
      return false;
    }
  });

  $reduce.click(function () {
    var $inputVal = $(this).next('input'),
        $count = parseInt($inputVal.val())-1,

        $priceTotal4RMBObj = $(this).parents('.shop_item').find('.sum_price').find('span.lan-cn'),
        $priceTotal4USDObj = $(this).parents('.shop_item').find('.sum_price').find('span.lan-en'),

        $price4RMB = $(this).parents('.shop_item').find('.price.lan-cn').html(),  //人民币单价
        $price4USD = $(this).parents('.shop_item').find('.price.lan-en').html(),  //美金单价

        $priceTotal4RMB = $count.mul($price4RMB.substring(1)), //人民币总价
        $priceTotal4USD = $count.mul($price4USD.substring(1)); //美金总价

    if($inputVal.val() > 1){
      $inputVal.val($count);
      $priceTotal4RMBObj.text('￥' + $priceTotal4RMB.toFixed(2));
      $priceTotal4USDObj.text('$' + $priceTotal4USD.toFixed(2));
      // $priceTotalObj.html('￥'+$priceTotal);
    }
    if($inputVal.val() == 1 && !$(this).hasClass('reSty')){
      $(this).addClass('reSty');
    }
    totalMoney();
  });

  $all_sum.keyup(function () {
    var $count = 0,
        $priceTotalObj = $(this).parents('.shop_item').find('.sum_price'),
        $price = $(this).parents('.shop_item').find('.price').html(),  //单价
        $priceTotal = 0;
    if($(this).val()==''){
      $(this).val('1');
    }
    $(this).val($(this).val().replace(/\D|^0/g,''));
    $count = $(this).val();
    if($count >= 99){
      $count = 99;
    }
    $priceTotal = $count*parseInt($price.substring(1));
    // $(this).attr('value',$count);
    $(this).val($count);
    $priceTotalObj.html('￥'+$priceTotal);
    totalMoney();
  });

  //======================================移除商品========================================
  var $shop_item = null;
  var $order_content = '';

  $('.delBtn').click(function () {
    var obj = $(this);
    var delShoppingCarID = $(this).attr('data-shoppingCarId');
    layer.confirm('您确定要删除该宝贝吗？', {
      btn: ['确定','取消'],
      title:['删除宝贝'],
    }, function(){
      var result = deleteShoppingCarItem(delShoppingCarID);
      if(!result){
        layer.closeAll();
        var lan = localStorage.getItem('siteLanguage');
        var alterMsg = lan === 'cn' ? '网络异常，请稍后再试。' : 'Network exception，please try again later.';
        layer.msg(alterMsg);
        return false;
      }
      $order_content = obj.parents().parents('.shop_item').parents('.order_lists');
      obj.parents('.shop_item').remove();
      if($order_content.html().trim() == null || $order_content.html().trim().length == 0){
        $order_content.parents('.cartBox').remove();
      }
      totalMoney();
      setShoppingCartTotalCount();
      layer.closeAll();
    });

  });

  //======================================删除全部商品==========================================
  $(".delAllBtn").click(function () {
    var delarr = [];
    var delShoppingCarID = [];
    $sonCheckBox.each(function () {
      if ($(this).is(":checked")) {
        var patarr = $(this).parent().parent('.shop_item');
        delShoppingCarID.push($(this).attr('data-shoppingCarId'));
        delarr.push(patarr);
      }
    });
    if(delarr.length === 0){
      return false
    }
    layer.confirm('您确定要删除选中的宝贝吗？', {
      btn: ['确定','取消'],
      title:['删除宝贝'],
    }, function(){
      for(var i=0; i<delarr.length; i++){
        var delShoppingCarID = $(delarr[i]).find('.delBtn').attr('data-shoppingCarId');
        var result = deleteShoppingCarItem(delShoppingCarID);
        if(!result){
          layer.closeAll();
          var lan = localStorage.getItem('siteLanguage');
          var alterMsg = lan === 'cn' ? '网络异常，请稍后再试。' : 'Network exception，please try again later.';
          layer.msg(alterMsg);
          return false;
        }
        delarr[i].remove();
      }
      $('.cartBox').each(function () {
        var cartBox = $(this);
        $(this).children(".order_lists").each(function () {
          if($(this).children('.shop_item').length == 0){
            cartBox.remove();
          }
        });
      });

      totalMoney();
      setShoppingCartTotalCount();
      layer.closeAll();
    });
  });


  $('.calBtn').click(function () {
    alert(1);
  });

  /**
   * 页面初始化
   */
  function initProcess() {
    setShoppingCartTotalCount();
    setCollectionTotalCount();
    // setPurchasedTotalCount();
  }

  /**
   * 设置当前用户购物车中的商品数量
   */
  function setShoppingCartTotalCount() {
    var shoppingCarCount = $('div.shop_item').length;
    $('#shoppingCart-count').text(shoppingCarCount);
  }

  /**
   * 设置当前用户收藏中的商品数量
   */
  function setCollectionTotalCount() {
    $.ajax({
      url: '/shops/collect/count?customerID=' + $customerID,
      type: 'get',
      success: function (res) {
        if(res.error){
          location.href = '/error?errorCode=' + res.code + '&msg=' + res.msg;
          return false;
        }
        $('#myCollection-count').text(res.collectionCount);
      },
      error: function(XMLHttpRequest, textStatus){
        location.href = '/error?errorCode=' + XMLHttpRequest.status + '&msg=' + XMLHttpRequest.statusText;
      }
    });
  }

  /**
   * 设置当前用户购买过的商品数量
   */
  function setPurchasedTotalCount() {
    $.ajax({
      url: '/shops/purchased/count?customerID=' + $customerID,
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

  //===========================调用API Service将数据中的数据删除（此处为逻辑删除）=========================
  function deleteShoppingCarItem(shoppingCarId) {
    var result = false;
    $.ajax({
      url: '/shops?shoppingCarID=' + shoppingCarId,
      type: 'delete',
      async:false,
      dataType: 'json',
      success: function(res){
        result = !res.err;
      },
      error: function(XMLHttpRequest){
        result = false;
      }
    });

    return result;
  }
  //======================================总计==========================================

  function totalMoney() {
    var total_money4RMB = 0;
    var total_money4USD = 0;
    var total_count = 0;
    var calBtn = $('.calBtn');
    $('.son_check').each(function () {
      if ($(this).is(':checked')) {
        var sum_price4RMB = parseFloat($(this).parents('.shop_item').find('.sum_price').find('span.lan-cn').text().substring(1));
        var sum_price4USD = parseFloat($(this).parents('.shop_item').find('.sum_price').find('span.lan-en').text().substring(1));
        // var num =  parseInt($(this).parents('.shop_item').find('.sum').val());
        total_money4RMB = total_money4RMB.add(sum_price4RMB);
        total_money4USD = total_money4USD.add(sum_price4USD);
        total_count++;
      }
    });
    $('.total_text span.lan-cn').text('￥' + total_money4RMB.toFixed(2));
    $('.total_text span.lan-en').text('$' + total_money4USD.toFixed(2));

    $('.piece_num').html(total_count);

    if((total_money4RMB !== 0 && total_count !== 0) || (total_money4USD !== 0 && total_count !== 0)){
      if(!calBtn.hasClass('btn_sty')){
        calBtn.addClass('btn_sty');
        calBtn.removeAttr('disabled');
      }
    }else{
      if(calBtn.hasClass('btn_sty')){
        calBtn.removeClass('btn_sty');
        calBtn.attr('disabled', 'disabled');
      }
    }
  }

  initProcess();
});