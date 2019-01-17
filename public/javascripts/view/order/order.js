$(function() {
  var lan = localStorage.getItem('siteLanguage');
  var customer = getLoginCustomer();
  var index4Layer = 0;

  function initPage() {
    calculateTotalAmount();
    getShippingAddress();
    $('li.switch-language').prev().remove();
    $('li.switch-language').remove();
  }

  function calculateTotalAmount() {
    var totalAmount4RMB = 0.00;
    var totalAmount4USD = 0.00;
    $('.shop_item').each(function (index, item) {
      totalAmount4RMB = totalAmount4RMB.add(parseFloat($(item).find('.shop_cz').find('p.sum_price.lan-cn').text().substring(1)));
      totalAmount4USD = totalAmount4USD.add(parseFloat($(item).find('.shop_cz').find('p.sum_price.lan-en').text().substring(1)));
    });
    $('div.sub_order_btn p span.lan-cn.total-amount').text('￥' + totalAmount4RMB.toFixed(2));
    $('div.sub_order_btn p span.lan-en.total-amount').text('$' + totalAmount4USD.toFixed(2));
  }

  function getShippingAddress() {
    $.ajax({
      url: '/common/shippingAddress?customerID=' + customer.customerID,
      type: 'get',
      success: function (res) {
        if(res.err){
          alertResponseError(res.code, res.msg);
          return false;
        }
        if(res.shippingAddressList.length === 0){
          var noAddressMsg = lan === 'cn'? '请添加配送地址' : 'Please add shipping address.';
          $('.consignee').text('');
          $('.default-address').text('');
          $('.shipping-address').text(noAddressMsg);
          return false;
        }
        var countryName = '';
        var provinceName = '';
        var cityName = '';
        var displayAddress = '';
        $.each(res.shippingAddressList, function (index, shippingAddress) {
          if(shippingAddress.defaultAddress){
            countryName = lan === 'cn'? shippingAddress.countryVO.countryNameCN : shippingAddress.countryVO.countryNameEN;
            provinceName = lan === 'cn'? shippingAddress.provinceVO.provinceNameCN : shippingAddress.provinceVO.provinceNameEN;
            cityName = lan === 'cn'? shippingAddress.cityVO.cityNameCN : shippingAddress.cityVO.cityNameEN;
            displayAddress = countryName + provinceName + cityName + shippingAddress.shippingStreet + ' ' + shippingAddress.cellphone;

            $('.consignee').attr('data-shipping-id', shippingAddress.shippingID);
            $('.consignee').text(shippingAddress.consignee);
            $('.shipping-address').text(displayAddress);
            $('.default-address').text(lan === 'cn'? '默认地址' : 'Default address');
            return false;
          }
        });

        var shippingAddress = res.shippingAddressList[0];
        if(displayAddress === ''){
          countryName = lan === 'cn'? shippingAddress.countryVO.countryNameCN : shippingAddress.countryVO.countryNameEN;
          provinceName = lan === 'cn'? shippingAddress.provinceVO.provinceNameCN : shippingAddress.provinceVO.provinceNameEN;
          cityName = lan === 'cn'? shippingAddress.cityVO.cityNameCN : shippingAddress.cityVO.cityNameEN;
          displayAddress = countryName + provinceName + cityName + shippingAddress.shippingStreet + ' ' + shippingAddress.cellphone;
          $('.consignee').attr('data-shipping-id', shippingAddress.shippingID);
          $('.consignee').text(shippingAddress.consignee);
          $('.shipping-address').text(displayAddress);
        }
      },
      error: function(XMLHttpRequest, textStatus){
        layer.msg(lan === 'cn'? '网络连接异常，请检查网络设置。' : 'Network connection exception, please check network settings.');
      }
    });
  }

  function setCountryOptions(){
    $.ajax({
      url: '/common/country',
      type: 'get',
      success: function (res) {
        if(res.err){
          alertResponseError(res.code, res.msg);
          return false;
        }
        $.each(res.countryList, function (index , country) {
          var countryID = country.countryID;
          var countryName = lan === 'cn'? country.countryNameCN : country.countryNameEN;
          $('#shipping-country').append('<option value="' + countryID + '">' + countryName + '</option>');
        });
        var countryID = $('#shipping-country option:selected').attr('value');
        setProvinceOptions(countryID);
      },
      error: function(XMLHttpRequest, textStatus){
        layer.msg(lan === 'cn'? '网络连接异常，请检查网络设置。' : 'Network connection exception, please check network settings.');
      }
    });
  }

  function setProvinceOptions(countryID){
    $('#shipping-province').empty();
    $('#shipping-city').empty();
    $.ajax({
      url: '/common/province?countryID=' + countryID,
      type: 'get',
      success: function (res) {
        if(res.err){
          alertResponseError(res.code, res.msg);
          return false;
        }
        if(res.provinceList === null || res.provinceList.length === 0){
          layer.msg(lan === 'cn'? '该国家下没有省份的信息。' : 'No province in this country.');
          return false;
        }
        $.each(res.provinceList, function (index , province) {
          var provinceID = province.provinceID;
          var provinceName = lan === 'cn'? province.provinceNameCN : province.provinceNameCN;
          $('#shipping-province').append('<option value="' + provinceID + '">' + provinceName + '</option>');
        });
        var provinceID = $('#shipping-province option:selected').attr('value');
        setCityOptions(countryID, provinceID);
      },
      error: function(XMLHttpRequest, textStatus){
        layer.msg(lan === 'cn'? '网络连接异常，请检查网络设置。' : 'Network connection exception, please check network settings.');
      }
    });
  }

  function setCityOptions(countryID, provinceID){
    $('#shipping-city').empty();
    $.ajax({
      url: '/common/city?countryID=' + countryID + '&provinceID=' + provinceID,
      type: 'get',
      success: function (res) {
        if(res.err){
          alertResponseError(res.code, res.msg);
          return false;
        }
        if(res.cityList === null || res.cityList.length === 0){
          layer.msg(lan === 'cn'? '该省份下没有城市的信息。' : 'No city in this province.');
          return false;
        }
        $.each(res.cityList, function (index , city) {
          var cityID = city.cityID;
          var cityName = lan === 'cn'? city.cityNameCN : city.cityNameEN;
          $('#shipping-city').append('<option value="' + cityID + '">' + cityName + '</option>');
        });
      },
      error: function(XMLHttpRequest, textStatus){
        layer.msg(lan === 'cn'? 'Service异常，请稍后再试。' : 'Service error, please try again later.');
      }
    });
  }

  function loadShippingAddress(){
    $.ajax({
      url: '/common/shippingAddress?customerID=' + customer.customerID,
      type: 'get',
      success: function (res) {
        if(res.err){
          alertResponseError(res.code, res.msg);
          return false;
        }
        $('#shipping-address-detail tbody').empty();
        $.each(res.shippingAddressList, function (index , shippingAddress) {
          var countryName = lan === 'cn'? shippingAddress.countryVO.countryNameCN : shippingAddress.countryVO.countryNameEN;
          var provinceName = lan === 'cn'? shippingAddress.provinceVO.provinceNameCN : shippingAddress.provinceVO.provinceNameEN;
          var cityName = lan === 'cn'? shippingAddress.cityVO.cityNameCN : shippingAddress.cityVO.cityNameEN;
          var defaultAdress = shippingAddress.defaultAddress;
          $('#shipping-address-detail tbody').append(
              '      <tr>\n' +
              '        <td data-shipping-id="' + shippingAddress.shippingID + '" data-defalutAddress="' + defaultAdress + '">' + countryName + provinceName + cityName + shippingAddress.shippingStreet + '</td>\n' +
              '        <td>' + shippingAddress.consignee + '</td>\n' +
              '        <td>' + shippingAddress.cellphone + '</td>\n' +
              '        <td>\n' +
              '          <div class="shipping-address-option" style="visibility: hidden">\n' +
              '            <button type="button" class="btn btn-sm btn-success btn-default" data-shipping-id="' + shippingAddress.shippingID + '">\n' +
              '              <span class="lan-cn">设为默认</span>\n' +
              '              <span class="lan-en hidden">Default</span>\n' +
              '            </button>\n' +
              '            <button type="button" class="btn btn-sm btn-danger btn-delete" data-shipping-id="' + shippingAddress.shippingID + '">\n' +
              '              <span class="lan-cn">删除</span>\n' +
              '              <span class="lan-en hidden">Delete</span>\n' +
              '            </button>\n' +
              '          </div>\n' +
              '        </td>\n' +
              '      </tr>');
        });

        $('#shipping-address-detail tbody tr').bind('mouseover',function(){
          $(this).find('.shipping-address-option').css('visibility', 'visible');
        });
        $('#shipping-address-detail tbody tr').bind('mouseleave',function(){
          $(this).find('.shipping-address-option').css('visibility', 'hidden');
        });
        $('#shipping-address-detail tbody tr').bind('click',function(){
          var defaultAddress = $(this).find('td').eq(0).attr('data-defalutAddress') === 'true';
          var shippingID = $(this).find('td').eq(0).attr('data-shipping-id');
          var shippingAddress = $(this).find('td').eq(0).text();
          var consignee = $(this).find('td').eq(1).text();
          var cellphone = $(this).find('td').eq(2).text();
          $('.consignee').attr('data-shipping-id', shippingID);
          $('.consignee').text(consignee);
          $('.shipping-address').text(shippingAddress + ' ' + cellphone);
          if(defaultAddress){
            $('.default-address').text(lan === 'cn'? '默认地址' : 'Default address');
          }else{
            $('.default-address').text('');
          }
          layer.close(index4Layer);
        });

        $('#shipping-address-detail tbody tr .btn-default').bind('click',function(){
          var shippingID = $(this).attr('data-shipping-id');
          var shippingAddress = $(this).parent().parent().parent().find('td').eq(0).text();
          var consignee = $(this).parent().parent().parent().find('td').eq(1).text();
          var cellphone = $(this).parent().parent().parent().find('td').eq(2).text();
          $.ajax({
            url: '/order/shippingAddress',
            type: 'put',
            dataType: 'json',
            data: {
              customerID: customer.customerID,
              shippingID: shippingID,
              loginUser: customer.account
            },
            success: function (res) {
              $('.consignee').attr('data-shipping-id', shippingID);
              $('.consignee').text(consignee);
              $('.shipping-address').text(shippingAddress + ' ' + cellphone);
              $('.default-address').text(lan === 'cn'? '默认地址' : 'Default address');
              layer.close(index4Layer);
            },
            error: function (XMLHttpRequest, textStatus) {
              layer.msg(lan === 'cn'? '网络连接异常，请检查网络设置。' : 'Network connection exception, please check network settings.');
            }
          });
          return false;
        });

        $('#shipping-address-detail tbody tr .btn-delete').bind('click',function(){
          var shippingID = $(this).attr('data-shipping-id');
          var confirmMsg = lan === 'cn'? '确认要删除该收货地址？' : 'Do you want to delete the shipping address?';
          var btnDeleteText = lan === 'cn'? '删除' : 'Delete';
          var btnCancel = lan === 'cn'? '取消' : 'Cancel';
          var resultMsg = '';

          var index = layer.confirm(confirmMsg, {
            btn: [btnDeleteText,btnCancel]
          }, function(){
            $.ajax({
              url: '/order/shippingAddress?shippingID=' + shippingID,
              type: 'delete',
              success: function (res) {
                if(res.err){
                  alertResponseError(res.code, res.msg);
                  return false;
                }
                resultMsg = lan === 'cn'? '已删除' : 'Delete success!';
                layer.msg(resultMsg, {icon: 1});
                layer.close(index);
                loadShippingAddress();
                getShippingAddress();
              },
              error: function (XMLHttpRequest, textStatus) {
                layer.msg(lan === 'cn'? '网络连接异常，请检查网络设置。' : 'Network connection exception, please check network settings.');
              }
            });
          }, function(){
            layer.close(index);
          });
          return false;
        });
      },
      error: function(XMLHttpRequest, textStatus){
        layer.msg(lan === 'cn'? '网络连接异常，请检查网络设置。' : 'Network connection exception, please check network settings.');
      }
    });
  }

  function checkData(){
    var countryID = $('#shipping-country option:selected').attr('value');
    var provinceID = $('#shipping-province option:selected').attr('value');
    var cityID = $('#shipping-city option:selected').attr('value');
    var address = $.trim($('#shipping-address').val());
    var consignee = $.trim($('#shipping-consignee').val());
    var cellphone = $.trim($('#shipping-consignee-cellphone').val());
    var msg = '';
    if(countryID === undefined){
      msg = lan === 'cn'? '请选择配送的国家' : 'Please choose shipping country';
      layer.msg(msg);
      $('#shipping-country').focus();
      return false;
    }
    if(provinceID === undefined){
      msg = lan === 'cn'? '请选择配送的省份' : 'Please choose shipping province';
      layer.msg(msg);
      $('#shipping-province').focus();
      return false;
    }
    if(cityID === undefined){
      msg = lan === 'cn'? '请选择配送的城市' : 'Please choose shipping city';
      layer.msg(msg);
      $('#shipping-city').focus();
      return false;
    }
    if(address.length === 0){
      msg = lan === 'cn'? '请输入具体配送地址' : 'Please enter shipping address';
      layer.msg(msg);
      $('#shipping-address').focus();
      return false;
    }
    if(consignee.length === 0){
      msg = lan === 'cn'? '请输入收件人名称' : 'Please enter consignee';
      layer.msg(msg);
      $('#shipping-consignee').focus();
      return false;
    }
    if(cellphone.length === 0){
      msg = lan === 'cn'? '请输入收件人手机号码' : 'Please enter consignee\'s cellphone';
      layer.msg(msg);
      $('#shipping-consignee-cellphone').focus();
      return false;
    }
    return true;
  }

  function clearForm(){
    $('#shipping-address').val('');
    $('#shipping-consignee').val('');
    $('#shipping-consignee-cellphone').val('');
  }

  $("#add_order").click(function () {
    var contentHtml =
        '<div class="add_address">\n' +
        '  <form>\n' +
        '    <div class="form-group">\n' +
        '      <label for="inputEmail3" class="lan-cn">国家</label>\n' +
        '      <label for="inputEmail3" class="lan-en hidden">Country</label>\n' +
        '      <select class="form-control" id="shipping-country">\n' +
        '      </select>\n' +
        '    </div>\n' +
        '    <div class="form-group">\n' +
        '      <label for="inputEmail3" class="lan-cn">省份</label>\n' +
        '      <label for="inputEmail3" class="lan-en hidden">Province</label>\n' +
        '      <select class="form-control" id="shipping-province"></select>\n' +
        '    </div>\n' +
        '    <div class="form-group">\n' +
        '      <label for="inputEmail3" class="lan-cn">城市</label>\n' +
        '      <label for="inputEmail3" class="lan-en hidden">City</label>\n' +
        '      <select class="form-control" id="shipping-city"></select>\n' +
        '    </div>\n' +
        '    <div class="form-group">\n' +
        '      <label for="inputEmail3" class="lan-cn">详细地址</label>\n' +
        '      <label for="inputEmail3" class="lan-en hidden">Shipping Address</label>\n' +
        '      <input type="text" class="form-control" maxlength="80" id="shipping-address">\n' +
        '    </div>\n' +
        '    <div class="form-group">\n' +
        '      <label for="inputEmail3" class="lan-cn">收件人</label>\n' +
        '      <label for="inputEmail3" class="lan-en hidden">Consignee</label>\n' +
        '      <input type="text" class="form-control" maxlength="15" id="shipping-consignee">\n' +
        '    </div>\n' +
        '    <div class="form-group">\n' +
        '      <label for="inputEmail3" class="lan-cn">收件人电话号码</label>\n' +
        '      <label for="inputEmail3" class="lan-en hidden">Consignee Cellphone</label>\n' +
        '      <input type="text" class="form-control" maxlength="11" id="shipping-consignee-cellphone">\n' +
        '    </div>\n' +
        '    <button type="button" class="btn btn-default btn-add" id="btn-add-shippingAddress">\n' +
        '      <span class="lan-cn">添加</span>\n' +
        '      <span class="lan-en hidden">Add</span>\n' +
        '    </button>\n' +
        '  </form>\n' +
        '  <div class="space-normal"></div>\n' +
        '  <table class="table table-hover" id="shipping-address-detail">\n' +
        '    <thead>\n' +
        '      <th>\n' +
        '        <span class="lan-cn">配送地址</span>\n' +
        '        <span class="lan-en hidden">Shipping Address</span>\n' +
        '      </th>\n' +
        '      <th>\n' +
        '        <span class="lan-cn">收件人</span>\n' +
        '        <span class="lan-en hidden">Consignee</span>\n' +
        '      </th>\n' +
        '      <th>\n' +
        '        <span class="lan-cn">收件人电话</span>\n' +
        '        <span class="lan-en hidden">Consignee Tel</span>\n' +
        '      </th>\n' +
        '      <th></th>\n' +
        '    </thead>\n' +
        '    <tbody>\n' +
        '    </tbody>\n' +
        '  </table>\n' +
        '</div>\n';
    index4Layer = layer.open({
      type: 1,
      title:["添加收货地址"],//弹出层标题
      btn: [],//按钮
      btnAlign: 'c',//按钮居中对齐
      skin: 'layui-layer-rim', //加上边框
      area: ['700px', '680px'], //宽高
      content: contentHtml
    });
    setCountryOptions();
    loadShippingAddress();
    parent.$('#shipping-country').bind('change', function () {
      var countryID = $(this).find('option:selected').attr('value');
      setProvinceOptions(countryID);
    });
    parent.$('#shipping-province').bind('change', function () {
      var countryID = $('#shipping-country option:selected').attr('value');
      var provinceID = $(this).find('option:selected').attr('value');
      setCityOptions(countryID, provinceID);
    });
    parent.$('.btn-add').bind('click',function(){
      var customerID = customer.customerID;
      var countryID = $('#shipping-country option:selected').attr('value');
      var provinceID = $('#shipping-province option:selected').attr('value');
      var cityID = $('#shipping-city option:selected').attr('value');
      var address = $.trim($('#shipping-address').val());
      var consignee = $.trim($('#shipping-consignee').val());
      var cellphone = $.trim($('#shipping-consignee-cellphone').val());
      var msg = '';
      if(!checkData()){
        return false;
      }
      $.ajax({
        url: '/order/shippingAddress',
        type: 'post',
        dataType: 'json',
        data:{
          customerID: customerID,
          shippingCountryID: countryID,
          shippingProvinceID: provinceID,
          shippingCityID: cityID,
          shippingStreet: address,
          consignee: consignee,
          cellphone: cellphone,
          loginUser: customer.account
        },
        success: function (res) {
          if(res.error){
            msg = lan === 'cn'? 'Service处理异常，请稍后再试。' : 'Service exception, please try again.';
            layer.msg(msg);
            return false;
          }
          clearForm();
          loadShippingAddress();
        },
        error: function (XMLHttpRequest, textStatus) {
          msg = lan === 'cn'? '无法连接网络，请检查网络设置' : 'Network connection exception, please check network settings.';
          layer.msg(msg);
        }
      });
    });
  });

  $('#btn-submit').click(function () {
    var shippingID = $('.consignee').attr('data-shipping-id');
    var order = {
      customerID: 0,
      orderAmount: 0,
      shippingAddressID: 0,
      orderItems: '',
      memo: '',
      loginUser: ''
    };
    if(shippingID === ''){
      var msg = lan === 'cn' ? '请选择配送地址。' : 'Please choose shipping address.';
      layer.msg(msg);
      return false;
    }

    order.customerID = customer.customerID;
    order.orderAmount = lan === 'cn' ?
        $('div.sub_order_btn p span.lan-cn.total-amount').text().substr(1) :
        $('div.sub_order_btn p span.lan-en.total-amount').text().substr(1);
    order.currencyType = lan === 'cn'? 'CNY' : 'USD',
    order.shippingAddressID = shippingID;
    order.memo = $('#order-memo').val();
    order.loginUser = customer.account;

    var orderItems = [];
    var shoppingIdArray = [];
    $.each($('.shop_item'), function (index, item) {
      shoppingIdArray.push($(item).attr('data-shopping-id'));
      orderItems.push({
        itemID: $(item).attr('data-item-id'),
        itemCount: $(item).attr('data-item-count'),
        itemAmount : lan === 'cn'? $(item).attr('data-item-amount-rmb'): $(item).attr('data-item-amount-usd'),
        currencyType : lan === 'cn'? 'CNY' : 'USD',
        loginUser: customer.account
      });
    });

    order.shoppingCartIdList = shoppingIdArray.join(',');
    order.orderItems = JSON.stringify(orderItems);

    $.ajax({
      url: '/order',
      type: 'post',
      dataType: 'json',
      data: order,
      success: function (res) {
        if(res.err){
          alertResponseError(res.code, res.msg);
          return false;
        }
        location.href = '/apply?orderNumber=' + res.data;
      },
      error: function (XMLHttpRequest, textStatus) {
        msg = lan === 'cn'? '无法连接网络，请检查网络设置' : 'Network connection exception, please check network settings.';
        layer.msg(msg);
      }
    });
  });

  initPage();
});
