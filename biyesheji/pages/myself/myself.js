const {
  default: http
} = require("../../util/http")
const {
  default: isTokenExpired
} = require("../../util/tokenExpired")

// pages/myself/myself.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '', //用户头像
    nickname: '', //用户昵称
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
    console.log(111)
    this.getUserInfo()
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
    this.getUserInfo()
    wx.stopPullDownRefresh()
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

  // 获取用户信息
  getUserInfo() {
    http({
      url: '/myself'
    }).then(res => {
      console.log(res)
      if (res.status === 0) {
        console.log(res)
        const {
          userAvatar,
          userName
        } = res.messages[0]
        this.setData({
          avatar: userAvatar,
          nickname: userName
        })
        console.log(this.data.avatar)
        console.log(this.data.nickname)
      }
      if (res.status === -1) {
        wx.showToast({
          title: '获取信息失败',
          icon: 'error'
        })
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },

  // 页面跳转
  handleClick(e) {
    console.log(e.currentTarget.dataset.name)
    const path = e.currentTarget.dataset.name
    wx.navigateTo({
      url: `/pages/${path}/${path}`,
    })
  },

  // 微信授权登陆
  login() {
    wx.login({
      success: (res) => {
        console.log(res)
      },
    })
  },

  // 退出登陆
  exit() {
    wx.showModal({
      title: '退出登陆',
      content: '是否确定退出登陆!',
      complete: (res) => {
        if (res.confirm) {
          wx.removeStorage({
            key: "token",
            success: () => {
              wx.switchTab({
                url: '/pages/index/index',
              })
            }
          })
        }
      }
    })
  },

  // 注销
  logout() {
    wx.showModal({
      title: '注销账号',
      content: '是否确定注销账号',
      complete: (res) => {
        if (res.confirm) {
          http({
            url: '/logout'
          }).then(res => {
            console.log(res)
            if (res.status === 0) {
              wx.switchTab({
                url: '/pages/index/index',
              })
              wx.removeStorageSync('token')
            } else {
              console.log(res)
              wx.showToast({
                title: '操作失败',
                icon: 'error'
              })
            }
          })
        }
      }
    })
  }
})