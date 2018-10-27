var app = new Vue({
  el: '#app',
  data: {
    newsTitle: '',
    newsDate: '',
    bankName: '',
    branchName: '',
    newsContentList: []
  },
  methods: {
    loadNewsContent: function () {
      $.ajax({
        url: '/newsDetail/detail?newsID=' + $('#hidden-newsID').val(),
        type: 'get',
        success: function(res){
          if(res.err){
            alertResponseError(res.code, res.msg);
            return false;
          }
          app.$data.newsTitle = res.data.newsTitle;
          app.$data.newsDate = res.data.newsDate;
          app.$data.newsContentList = res.data.newsContentList;
        },
        error: function(XMLHttpRequest){
          layer.msg('远程服务无响应，状态码：' + XMLHttpRequest.status);
        }
      });
    }
  },
  mounted: function () {
    this.loadNewsContent();
  }
});