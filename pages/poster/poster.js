// pages/face/face.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
      msg: null,
      winWidth: 0,
      winHeight:0,
      poster:{},
      posterctx:{},
      inipage:1
  },

  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res){
        console.log(res);
        that.data.winWidth = res.windowWidth;
        that.data.winHeight = res.windowHeight;
      }
    });
    var poster = wx.createSelectorQuery();
    poster.select('#poster').boundingClientRect();
    poster.exec(function (res) {
      that.setData({
        poster:res[0]
      });
      console.log('打印高度',res[0].height);
    });
    console.log(that.data.poster);
    },

  onReady: function(){
    console.log(this.data.poster);
    const ctx = wx.createCanvasContext('canvas_BG');
    this.createImgResource('https://images-na.ssl-images-amazon.com/images/I/81oqeRLZN4L.jpg').then(imgUrl => {
      ctx.save();
      this.roundRect(ctx, 0, 0, this.data.poster.width, this.data.poster.height, 20);
      ctx.drawImage(imgUrl, 0, 0, this.data.poster.width, this.data.poster.height);
      ctx.restore();
      ctx.draw();
      });
  },

  formSubmit: function(e){
      this.data.msg = e.detail.value.userPhone;
      console.log(this.data.msg);
      const that = this;
    // wx.request({
    //   url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential',
    //   data: {
    //     appid: 'wx336f042533bff9f1',
    //     secret: '03eac629952d72aac4e6d4a9b0537140'
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //     var Image64 = null;
    //     var src = null;
      const ctx = wx.createCanvasContext('canvas_BG');
      that.createImgResource('http://www.617news.com/uploads/allimg/161123/1413352a1-0.jpg').then(imgUrl => {
        ctx.save();
        that.roundRect(ctx, 0, 0, that.data.poster.width, that.data.poster.height, 20);
        ctx.drawImage(imgUrl, 0, 0, that.data.poster.width, that.data.poster.height);
        ctx.restore();
        ctx.setTextAlign('center');    // 文字居中
        ctx.setFillStyle('#000000');  // 文字颜色：黑色
        // ctx.fillText("作者：付伟",100, 100);
        // ctx.draw();
        });
      wx.request({
        url: 'https://api.weixin.qq.com/wxa/14_RZXKD9HaQ1tUu9LkYOBtDuK50ovU8eISOWc7YZzaSxAkhdJp7EIPOpXhilcDO9sG2razb1iQaZ5i3bFlqxphxeytw4C2VXNtUgA-V3asrsBUgZpSuQEDA2yXApoZ_htDaXvUJt2ldH__4fIVRAChAGADMO',
        method: 'POST',
        data: {
          scene: e.detail.value.Page1Text,
          page:'pages/register/register',
        },
        //responseType:'arraybuffer',
        success: function(res){
          //Image64 = wx.arrayBufferToBase64(res.data);
          //src = "data:image/png;base64," + Image64;
          //console.log(src);
          console.log(res.data);
          // const cav = wx.createCanvasContext("canvas_BG");
          //cav.drawImage(src, 0, 0, 200, 200);
          wx.downloadFile({
            url: 'http://106.75.97.12/temp/qrcode.jpg',
            success: function(res){
              console.log(res);
              ctx.drawImage(res.tempFilePath, that.data.poster.width - 125, that.data.poster.height - 125, 100, 100);
              ctx.draw();
              that.setData({
                inipage:0
              });
            },
            fail: function(res){
              console.log(res);
            }
          });
        }
      });
  },
  saveImageToPhotosAlbum: function() {
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: this.data.poster.width,
      height: this.data.poster.height,
      canvasId: 'canvas_BG',
      success: res => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          complete(res) {
            if (res.errMsg.indexOf('ok') > -1) {
              // console.log('成功保存')
            } else if (res.errMsg.indexOf('fail')) {
              wx.openSetting();
            }
          }
        });
        wx.showToast({
          title: '图片保存成功',
          icon: 'none'
        }); 
      },
      fail: err => {
        console.log(err);
      }
    });
  },

  createImgResource: function(url) {
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url,
        complete: res => {
          if (res.errMsg.indexOf('ok') > -1) {
            resolve(res.tempFilePath);
          } else {
            reject('下载图片失败，请稍后重试');
          }
        }
      })
    })
  },
  //画圆角矩形
  roundRect: function(ctx, x, y, w, h, r) {
    // 开始绘制
    ctx.beginPath();
    // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
    ctx.setFillStyle('transparent');
    // ctx.setStrokeStyle('transparent')
    // 绘制左上角圆弧
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);

    // 绘制border-top
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.lineTo(x + w, y + r);
    // 绘制右上角圆弧
    ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2);

    // 绘制border-right
    ctx.lineTo(x + w, y + h - r);
    ctx.lineTo(x + w - r, y + h);
    // 绘制右下角圆弧
    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5);

    // 绘制border-bottom
    ctx.lineTo(x + r, y + h);
    ctx.lineTo(x, y + h - r);
    // 绘制左下角圆弧
    ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI);

    // 绘制border-left
    ctx.lineTo(x, y + r);
    ctx.lineTo(x + r, y);
    
    ctx.fill();
    // ctx.stroke()
    ctx.closePath();
    // 剪切
    ctx.clip();
  },
  con:function(){
    console.log(this.data.poster);
  }

});