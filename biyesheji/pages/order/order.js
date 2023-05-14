const { default: formattedDate } = require("../../util/formattedDate")
const {
  default: http
} = require("../../util/http")

// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    status: 0
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
    this.getOrder(this.data.status)
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
    this.getOrder(this.data.status)
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

  // 获取订单
  getOrder(status) {
    http({
      url: `/order?status=${status}`
    }).then(res => {
      console.log(res)
      if (res.status === 0) {
        let orders = res.messages
        orders.forEach(item => {
          item.createTime = formattedDate(item.createTime)
          item.orderTime = formattedDate(item.orderTime)
          item.imageUrl = item.dishes[0].imageUrl
          let title = ''
          item.dishes.forEach(item => {
            title = title + item.dishName + '、'
          })
          item.title = title
        })
        this.setData({
          orders: orders
        })
        console.log(this.data.orders)
      }
    })
  },

  onClick(e) {
    const status = e.detail.name
    this.setData({
      orders:[]
    })
    this.getOrder(status)
  },

  // 跳转订单详情页面
  toOrderDetail() {
    wx.navigateTo({
      url: '/pages/orderdetail/orderdetail',
    })
  },
})