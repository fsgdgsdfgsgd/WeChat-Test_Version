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
    console.log("form发生了Submit事件，携带数据位：", e.detail.value)
    this.data.UserData.phone = e.detail.value.phonenumber
    var phonenum = e.detail.value.phonenumber;
    console.log(typeof(phonenum));
    if (e.detail.value.Name == "")
    {
        wx.showToast({
          title: '姓名不能为空',
          icon:'none',
        })
        return;
    }
    else if (this.data.UserData.grade == null)
    {
      wx.showToast({
        title: '未选择您孩子的年级',
        icon:'none',
      })
      return;
    }
    else if (phonenum.length== 0)
    {
        wx.showToast({
          title: '手机号不能为空',
          icon: 'none',
        })
        return;
    }
    else if (phonenum.length != 11)
    {
      wx.showToast({
        title: '手机号长度不正确',
        icon: 'none',
      })
      return;
    }
    else if (!this.isPoneAvailable(phonenum))
    {
      wx.showToast({
        title: '手机号格式不正确',
        icon:'none',
      })
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
    })
    // wx.navigateTo({
    //   url: '../logs/logs?UserData=' + JSON.stringify(this.data.UserData)
    // })
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
    wx.request({
      url: 'http://1v1-activity.xueba100.com/auth/resetValidateCode',
      data:{
        phone_no:'15801423152',
        random:"1.08934854353",
      },
      //dataType:"arraybuffer",
      success: function(res){
        console.log(res)

      }
    })
      
    
  },
  
  // alert() {
  //   $wuxDialog().alert({
  //     resetOnClose: true,
  //     title:"手机号格式不正确",
  //     content: "请输入正确的手机号!",
  //   })
  // }
})
