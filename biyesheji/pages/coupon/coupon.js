const { default: http } = require("../../util/http")

// pages/coupon/coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponData:[], //优惠券数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取优惠券数据
    http({
      url:'/coupon'
    }).then(res => {
      if(res.status === 0) {
        this.setData({
          couponData:res.messages
        })
      }
      console.log(this.data.couponData)
    }).catch(err => {
      console.log(err)
    })
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

  // 领取优惠券
  onCoupons(e) {
    console.log(e.currentTarget.dataset.id)
    http({
      url:`/receiveCoupons`,
      method:'POST',
      data:{
        couponId:e.currentTarget.dataset.id
      }
    }).then(res => {
      if(res.status === 0) {
        wx.showToast({
          title: res.messages,
        })
      }
      if(res.status === 1) {
        wx.showModal({
          title: '领取优惠券',
          content: res.messages,
          showCancel:false
        })
      }
      if(res.status === -1) {
        wx.showToast({
          title: res.messages,
          icon:'error'
        })
      }
    })
  }
})