const {
  default: http
} = require("../../util/http")

// pages/userinfo/userinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '', //头像
    nickname: '', //昵称
    gender: '', //性别
    phone: '', //联系号码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getInfo()
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

  // 获取用户信息
  getInfo() {
    http({
      url: '/myself'
    }).then(res => {
      if (res.status === 0) {
        console.log(res)
        const {
          userAvatar,
          userName,
          phone,
          gender
        } = res.messages[0]
        this.setData({
          avatar: userAvatar,
          nickname: userName,
          gender: gender,
          phone: phone
        })
      }
      if (res.status === 1) {
        wx.showToast({
          title: '获取信息失败',
          icon: 'error'
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },

  // 返回上一页
  goBack() {
    wx.navigateBack()
  },

  // 提交保存
  onSubmit(e) {
    const {
      userName,
      gender,
      phone
    } = e.detail.value
    const genderReg = /[男女]/g
    const phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
    if(!genderReg.test(gender)) {
      wx.showToast({
        title: '性别格式错误',
        icon:'error'
      })
      return
    }else if(!phoneReg.test(phone)) {
      wx.showToast({
        title: '号码格式错误',
        icon:'error'
      })
      return
    }
    http({
      url: '/myselfEdit',
      method: 'POST',
      data: {
        userName,
        gender,
        phone
      }
    }).then(res => {
      if (res.status === 0) {
        wx.showToast({
          title: '修改成功',
        })
        this.getInfo()
      }
      if (res.status === -1) {
        wx.showToast({
          title: '修改失败',
          icon: 'error'
        })
        console.log(res.messages)
      }
    }).catch(err => {
      wx.showToast({
        title: '修改失败',
        icon: 'error'
      })
    })
  }
})