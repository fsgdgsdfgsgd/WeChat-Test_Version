//index.js
//获取应用实例
//import { $wuxDialog } from '../../index'
const app = getApp();

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    array:["初一", "初二", "初三"],
    UserData: {
      grade:null, 
      phone:null
    }
  },
  //事件处理函数

  onLoad: function (options) {
    
    // this.setData(
    //   {Msg: options.msg}
    //   );
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if (this.data.canIUse){
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

  isPoneAvailable: function (pone) {
    var myreg = /^[1][34578][0-9]{9}$/;
    var ismyreg = myreg.exec(pone);
    if (!ismyreg) {
      return false;
    } else {
      return true;
    }
  },

  formSubmit: function(e) {
    console.log("form发生了Submit事件，携带数据位：", e.detail.value);
    this.data.UserData.phone = e.detail.value.phonenumber;
    var phonenum = e.detail.value.phonenumber;
    console.log(typeof(phonenum));
    if (e.detail.value.Name == "")
    {
      wx.showToast({
        title: '姓名不能为空',
        icon:'none',
      });
      return;
    }
    else if (this.data.UserData.grade == null)
    {
      wx.showToast({
        title: '未选择您孩子的年级',
        icon:'none',
      });
      return;
    }
    else if (phonenum.length== 0)
    {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
      });
      return;
    }
    else if (phonenum.length != 11)
    {
      wx.showToast({
        title: '手机号长度不正确',
        icon: 'none',
      });
      return;
    }
    else if (!this.isPoneAvailable(phonenum))
    {
      wx.showToast({
        title: '手机号格式不正确',
        icon:'none',
      });
      return;
    }
    wx.request({
      url: 'http://106.75.97.12/InsertData.php',
      data:{
         Name: e.detail.value.Name,
         PhoneNumber: e.detail.value.phonenumber,
         Grade: this.data.UserData.grade
      },
      method :"POST",
      header: {"content-type":"application/x-www-form-urlencoded"},
      success: function(res){
        console.log(res);
        console.log("提交数据成功");
      }
    });
  },
  
  bindPickerChange: function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      index: e.detail.value
    });
    this.data.UserData.grade = this.data.array[e.detail.value];
  },

  onLoad: function (options) {
    
    // this.setData(
    //   {Msg: options.msg}
    //   );
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if (this.data.canIUse){
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
  }
});
