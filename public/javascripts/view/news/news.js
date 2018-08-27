var app = new Vue({
  el: '#app',
  data: {
    newsArray: [],
    pageNumber: 1
  },
  methods:{
    loadNews: function () {
      $.ajax({
        url: '/news/list?pageNumber=' + this.pageNumber,
        type: 'GET',
        success: function(res){
          if(res.err){
            layer.msg(res.msg);
          }else{
            if(res.data.length === 0){
              layer.msg("没有更多新闻啦！");
              return false;
            }
            for(var i = 0; i <= res.data.length - 1; i++){
              app.$data.newsArray.push({
                newsUrl: '/newsDetail?newsID=' + res.data[i].newsID,
                thumbnailUrl: res.data[i].thumbnailUrl,
                newsDate: res.data[i].newsDate,
                newsTitle: res.data[i].newsTitle
              });
            }
          }
        },
        error: function(XMLHttpRequest, textStatus){
          layer.msg('远程服务无响应，状态码：' + XMLHttpRequest.status);
        }
      });
    },
    onLoadMore: function () {
      this.pageNumber++;
      this.loadNews();
    }
  },
  mounted: function () {
    this.loadNews();
  }
});