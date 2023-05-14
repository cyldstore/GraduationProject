const {
  default: http
} = require("../../util/http")
const {
  default: upload
} = require("../../util/upload")

// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statu: "login", //页面状态
    avatarUrl: '', //用户头像
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  // 微信授权
  onlogin() {
    wx.login({
      success: (res) => {
        // console.log(res.code)
        if (res.code) {
          
          this.verify(res.code)
        } else if (!res.code) {
          wx.showToast({
            title: '授权失败',
            icon: 'error'
          })
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '授权失败',
          icon: 'error'
        })
      }
    })
  },

  // 验证
  verify(code) {
    http({
      url: '/verify',
      method: 'POST',
      data: {
        code: code
      }
    }).then(res => {
      if (res.messages === '未注册') {
        this.setData({
          statu: 'setNickName'
        })
      } else if (res.messages === '已注册') {
        wx.showToast({
          title: '登陆成功',
        })
        wx.navigateBack()
      } else {
        wx.showToast({
          title: '授权失败',
          icon: 'error'
        })
      }
    }).catch(err => {
      wx.showToast({
        title: '授权失败',
        icon: 'error'
      })
    })
  },

  // 暂不登陆
  noLogin() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  // 获取用户头像
  chooseavatar(e) {
    console.log(e.detail.avatarUrl)
    this.setData({
      avatarUrl: e.detail.avatarUrl
    })
  },

  // 注册
  register(e) {
    let nickname = e.detail.value.nickname
    // 上传头像
    upload({
      filePath: this.data.avatarUrl,
      name: 'avatarImg',
      url: '/avatarupload'
    }).then(res => {
      const avatar = JSON.parse(res)[0]
      // console.log(this.data.uploadImag)
      // 提交用户信息
      console.log(nickname)
      console.log(avatar)
      this.uploadAvatarAndNickname(nickname,avatar)
    }).catch(err => {
      console.log(err)
      wx.showToast({
        title: '上传失败',
        icon: 'error'
      })
    })
  },

  // 提交用户信息
  uploadAvatarAndNickname(nickname,avatar) {
    http({
      url: '/register',
      method: 'POST',
      data: {
        nickname: nickname,
        avatar: avatar
      }
    }).then(res => {
      if(res.status === 0) {
        wx.showToast({
          title: res.messages,
        })
        wx.navigateBack()
      }
      if(res.status === -1) {
        wx.showToast({
          title: '信息提交失败',
          icon: 'error'
        })
      }
    }).catch(err => {
      wx.showToast({
        title: '信息提交失败',
        icon: 'error'
      })
    })
  }

})