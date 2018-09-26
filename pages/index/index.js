const app = getApp();

Page({
  data: {
    userInfo:{},
    transferInfo:{
      name:'',
      phone:'',
      invitedNum:'',
      recommandlist:[{
        name:'李四',
        userStatus:'Renewal',
        active:0
      },{
        name:'张三',
        userStatus:'registed',
        active:1
      },{
        name:'张三',
        userStatus:'registed',
        active:3
      },{
        name:'张三',
        userStatus:'registed',
        active:2
      },{
        name:'张三',
        userStatus:'registed',
        active:1
      },{
        name:'张三',
        userStatus:'registed',
        active:3
      }]
    },
    bouns:9,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    slider:[1,2],
    swiperCurrent: 0,
    cur:0,
    inv_list:[{
      inv_text:'已注册',
      num:0
    },{
      inv_text:'已试听',
      num:0
    },{
      inv_text:'已报名',
      num:0
    },{
      inv_text:'已续费',
      num:0
    }],
    show_img:[
      {url:'http://wenba-ooo.ufile.ucloud.cn/c55906e21dd12364d39f758dd9cf4b32'},
      {url:'http://wenba-ooo.ufile.ucloud.cn/c55906e21dd12364d39f758dd9cf4b32'},
      {url:'http://wenba-ooo.ufile.ucloud.cn/c55906e21dd12364d39f758dd9cf4b32'}
    ],
    active: 0,
    steps: [
      {
        text: '已注册',
        desc: ''
      },
      {
        text: '已试听',
        desc: ''
      },
      {
        text: '已报名',
        desc: ''
      },
      {
        text: '已续费',
        desc: ''
      }
    ]
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
        }
      });
    }
  },

  getUserInfo: function (e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
    console.log();
  },

  swiperChange: function(e){
    this.setData({
        swiperCurrent: e.detail.current
    });
  },
  currentChange: function(){
    this.setData({
      cur:1
    });
  },
  changetoposter:function(){
    wx.navigateTo({
      url: '../../pages/poster/poster',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    });
  }
});
