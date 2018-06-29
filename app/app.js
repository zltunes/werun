//app.js
App({

  onLaunch: function () {
    var that = this;
    const util = require('utils/util.js')
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var session_key

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var appid = "wx8e16ce9067925ad7";
        var secret = "4dbba79d45dc02202ad944e3036420e3";
        if(res.code){
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + res.code + '&grant_type=authorization_code',
            header: {
              'content-type': 'json'
            },
            success: function(res){
              session_key = res.data.session_key;

            }
          })
          
          wx.getWeRunData({
            success(res) {

              wx.request({
                url: 'http://127.0.0.1:8081/decrypt',
                data: {
                  encryptedData: res.encryptedData,
                  iv: res.iv,
                  session_key: session_key
                },
                method: 'GET',
                success: function (resDecrypt) {
                  var runData = resDecrypt.data
                  console.info(runData);
                  if (runData.stepInfoList) {
                    runData.stepInfoList = runData.stepInfoList.reverse()
                    for (var i in runData.stepInfoList) {
                      runData.stepInfoList[i].date = util.formatTime(new Date(runData.stepInfoList[i].timestamp * 1000))
                    }
                    that.globalData.runData = runData.stepInfoList
                  }  
                }
              })

            }
          })
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    runData: []
  }
})