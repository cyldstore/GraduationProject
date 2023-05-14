const { default: formattedDate } = require("../../util/formattedDate")
const { default: http } = require("../../util/http")

// pages/ratedetail/ratedetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ratedetail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.orderId)
    http({
      url:`/getRate?orderId=${options.orderId}`
    }).then(res => {
      if(res.status === 0) {
        const ratedetail = res.messages[0]
        ratedetail.time = formattedDate(ratedetail.time)
        this.setData({
          ratedetail:ratedetail
        })
        console.log(this.data.ratedetail)
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
})