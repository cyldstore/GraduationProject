const {
  default: http
} = require("../../util/http")

// pages/usercoupon/usercoupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponData: [],
    source: '',
    price: 0,
    dishId: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      source: options.source,
      price: options.price,
    })
    http({
      url: '/customerscoupons'
    }).then(res => {
      if (res.status === 0) {
        this.setData({
          couponData: res.messages
        })
        console.log(this.data.couponData)
      }
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

  // 返回上一页
  goBack() {
    wx.navigateBack()
  },

  // 跳转菜品页面
  toCook() {
    wx.navigateTo({
      url: '/pages/cook/cook',
    })
  },

  // 跳转支付页面
  toPay(e) {
    let pages = getCurrentPages()
    let prevPage = pages[pages.length - 2]
    const index = e.currentTarget.dataset.index
    const customerCouponId = e.currentTarget.dataset.id
    const condition = this.data.couponData[`${index}`].couponCondition
    const couponPrice = this.data.couponData[`${index}`].value
    const price = this.data.price

    if (price < condition) {
      wx.showModal({
        title: '优惠券',
        content: `付款金额需满${condition}元，才可以使用此优惠券`,
      })
    } else {
      prevPage.setData({
        customerCouponId: customerCouponId,
        couponPrice:couponPrice
      })
      wx.navigateBack({
        delta: 1
      })
    }
  }
})