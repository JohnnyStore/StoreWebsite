var app = new Vue({
  el: '#app',
  data: {
    slideIndicators:[
      {
        'number': 0,
        'isActive': true
      },
      {
        'number': 1,
        'isActive': false
      }
    ],
    slideNewsArray:[
      {
        'imgUrl': '/images/news/slide01.jpg',
        'newsUrl': '#',
        'newsTitle':'',
        'isActive': true
      },
      {
        'imgUrl': '/images/news/slide02.jpg',
        'newsUrl': '#',
        'newsTitle':'',
        'isActive': false
      }
    ],
    newsArray:[
      // {
      //   'imgUrl': 'http://p3.pstatp.com/list/190x124/39b50002935afb756f6b',
      //   'newsUrl': '/newsDetail?newsId=1001',
      //   'newsTitle':'人工智能与物联网装置相配合 方可创造整合服务商机',
      //   'newsAbstract': '微软在22日正式宣布第五代人工智能聊天语音助理小冰上线，并正式跨入物联网(IoT)控制应用领域，与小米物联网平台合作，使用者将可透过与小冰对话方式，控制小米米家平台上的35款智能设备。图取自微软五代小冰网页......',
      //   'newsTime':'10分钟前'
      // },
      // {
      //   'imgUrl': 'http://p1.pstatp.com/list/190x124/39b600014f4f401df17d',
      //   'newsUrl': '/newsDetail?newsId=1002',
      //   'newsTitle':'小米note3周一发布，骁龙660，面部解锁，价格1999',
      //   'newsAbstract': '小米将于下周一发布小米MIX2全面屏手机，同时也将发布小米Note3。说起小米Note系列手机，我们基本可以用“命运多舛、恨不逢时”来形容。从小米Note到小米Note2，这个系列的小米手机特点是大屏、做工精美、颜值较高......',
      //   'newsTime':'15分钟前'
      // },
      // {
      //   'imgUrl': '/images/news/img03.jpg',
      //   'newsUrl': '/newsDetail?newsId=1003',
      //   'newsTitle':'小米6和王者荣耀还能擦除什么样的火花',
      //   'newsAbstract': 'NEST2017高通骁龙大众选拔赛-王者荣耀组的现场，眼尖的玩家们都留意到了比赛区前方设置的骁龙战机展示区。展示区中包含了大量采用高通骁龙835移动平台的手机，而在其中小米6则是被用户们关注最多的手机之一......',
      //   'newsTime':'20分钟前'
      // },
      // {
      //   'imgUrl': 'http:////p3.pstatp.com/list/190x124/39a60003491622bdb994',
      //   'newsUrl': '/newsDetail?newsId=1004',
      //   'newsTitle':'为什么共享单车都没有后座？原来全都是套路！',
      //   'newsAbstract': '现在很多城市的街头角落都摆满了各种各样的共享单车，什么摩拜、ofo等等。但是大家有没有发现，这些共享单车都是没有后座的，这是为什么呢？',
      //   'newsTime':'30分钟前'
      // },
      // {
      //   'imgUrl': 'http://p3.pstatp.com/list/190x124/39b50002935afb756f6b',
      //   'newsUrl': '/newsDetail?newsId=1001',
      //   'newsTitle':'人工智能与物联网装置相配合 方可创造整合服务商机',
      //   'newsAbstract': '微软在22日正式宣布第五代人工智能聊天语音助理小冰上线，并正式跨入物联网(IoT)控制应用领域，与小米物联网平台合作，使用者将可透过与小冰对话方式，控制小米米家平台上的35款智能设备。图取自微软五代小冰网页......',
      //   'newsTime':'10分钟前'
      // },
      // {
      //   'imgUrl': 'http://p1.pstatp.com/list/190x124/39b600014f4f401df17d',
      //   'newsUrl': '/newsDetail?newsId=1002',
      //   'newsTitle':'小米note3周一发布，骁龙660，面部解锁，价格1999',
      //   'newsAbstract': '小米将于下周一发布小米MIX2全面屏手机，同时也将发布小米Note3。说起小米Note系列手机，我们基本可以用“命运多舛、恨不逢时”来形容。从小米Note到小米Note2，这个系列的小米手机特点是大屏、做工精美、颜值较高......',
      //   'newsTime':'15分钟前'
      // },
      // {
      //   'imgUrl': '/images/news/img03.jpg',
      //   'newsUrl': '/newsDetail?newsId=1003',
      //   'newsTitle':'小米6和王者荣耀还能擦除什么样的火花',
      //   'newsAbstract': 'NEST2017高通骁龙大众选拔赛-王者荣耀组的现场，眼尖的玩家们都留意到了比赛区前方设置的骁龙战机展示区。展示区中包含了大量采用高通骁龙835移动平台的手机，而在其中小米6则是被用户们关注最多的手机之一......',
      //   'newsTime':'20分钟前'
      // },
      // {
      //   'imgUrl': 'http:////p3.pstatp.com/list/190x124/39a60003491622bdb994',
      //   'newsUrl': '/newsDetail?newsId=1004',
      //   'newsTitle':'为什么共享单车都没有后座？原来全都是套路！',
      //   'newsAbstract': '现在很多城市的街头角落都摆满了各种各样的共享单车，什么摩拜、ofo等等。但是大家有没有发现，这些共享单车都是没有后座的，这是为什么呢？',
      //   'newsTime':'30分钟前'
      // }
    ],
    pageArray:[
      // {
      //   'className': 'disabled',
      //   'url': '#',
      //   'pageText': '«'
      // },
      // {
      //   'className': 'active',
      //   'url': '#',
      //   'pageText': '1'
      // },
      // {
      //   'className': '',
      //   'url': '#',
      //   'pageText': '2'
      // },
      // {
      //   'className': '',
      //   'url': '#',
      //   'pageText': '3'
      // },
      // {
      //   'className': '',
      //   'url': '#',
      //   'pageText': '4'
      // },
      // {
      //   'className': '',
      //   'url': '#',
      //   'pageText': '5'
      // },
      // {
      //   'className': '',
      //   'url': '#',
      //   'pageText': '»'
      // }
    ]
  },
  mounted: function () {

    $('.carousel').carousel({
      interval: 3000
    });
  }
});