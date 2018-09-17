//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    UserData:{grade:null, phone:null},
    current: 1,
  },
  onLoad: function (options) {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
    this.data.UserData = JSON.parse(options.UserData)
    console.log(this.data.UserData)
    this.setData({
      grade: this.data.UserData.grade
    })
    this.setData({
      phonenumber: this.data.UserData.phone
    })
  },
  onClick() {
      const current = this.data.current + 1 > 2 ? 0 : this.data.current + 1
      this.setData({
        current,
      })
  }
})
