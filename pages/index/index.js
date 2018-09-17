//index.js
//获取应用实例
//import { $wuxDialog } from '../../index'
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    array:["初一", "初二", "初三"],
    UserData: {grade:null, phone:null},
    msg: "手机号格式必须为11位数字",
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  formSubmit: function(e) {
    console.log("form发生了Submit事件，携带数据位：", e.detail.value)
    this.data.UserData.phone = e.detail.value.phonenumber
    var phonenum = e.detail.value.phonenumber
    if (phonenum.length!= 11){
        this.setData({msg:"手机号格式不正确"});
        return;
    }
    wx.navigateTo({
      url: '../logs/logs?UserData=' + JSON.stringify(this.data.UserData)
    })
  },
  bindPickerChange: function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    this.data.UserData.grade = this.data.array[e.detail.value]
  },
  onLoad: function (options) {
    
    this.setData(
      {Msg: options.msg}
      );
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    
  },
  // alert() {
  //   $wuxDialog().alert({
  //     resetOnClose: true,
  //     title:"手机号格式不正确",
  //     content: "请输入正确的手机号!",
  //   })
  // }
})
