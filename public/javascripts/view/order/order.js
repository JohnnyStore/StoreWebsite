$(function() {
  $("#add_order").click(function () {
      layer.open({
          type: 1,
          title:["添加收货地址"],//弹出层标题
          btn: [],//按钮
          btnAlign: 'c',//按钮居中对齐
          skin: 'layui-layer-rim', //加上边框
          area: ['646px', '410px'], //宽高
          content: $('.add_adress')

      })
    })
 })
