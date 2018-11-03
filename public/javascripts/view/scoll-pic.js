//商品滚动
$(function(){

  function nextscroll(){
    var activeTab = $('li.selectActive').attr('rel');
    var vcon = $('div.tabcontent[rel="' + activeTab + '"]').find('div.picbox');
    var offset = ($('div.tabcontent[rel="' + activeTab + '"]').find('div.picbox').find('li').width())*-1;
    vcon.stop().animate({left:offset},"slow",function(){
      //var firstItem = $(".picbox ul li").first();
      var firstItem = $('div.tabcontent[rel="' + activeTab + '"]').find('div.picbox').find('li').first();
      vcon.find("ul").append(firstItem);
      $(this).css("left","0px");
      circle()
    });
  }

  function circle(){
    var currentItem = $(".picbox ul li").first();
    var currentIndex = currentItem.attr("index");
    $(".circle li").removeClass("circle-cur");
    $(".circle li").eq(currentIndex).addClass("circle-cur");
  }

  $(".next a").click(function(){
    nextscroll();
  });

  $(".prev a").click(function(){
    var activeTab = $('li.selectActive').attr('rel');
    var vcon = $('div.tabcontent[rel="' + activeTab + '"]').find('div.picbox');
    var offset = ($('div.tabcontent[rel="' + activeTab + '"]').find('div.picbox').find('li').width()*-1);
    var lastItem = $('div.tabcontent[rel="' + activeTab + '"]').find('div.picbox').find('li').last();
    vcon.find("ul").prepend(lastItem);
    vcon.css("left",offset);
    vcon.animate({left:"0px"},"slow",function(){
			circle();
    })
  });

  setInterval(nextscroll, 3000);
});