const { default: formattedDate } = require("../../util/formattedDate");
const { default: http } = require("../../util/http");

// pages/orderdetail/orderdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lastClickTime:0, //上一次点击的时间
    orderDetail:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.orderId)
    http({
      url:`/orderDetail?orderId=${options.orderId}`
    }).then(res => {
      // console.log(res)
      if(res.status === 0) {
        let orderDetail = res.messages
        orderDetail.forEach(item => {
          item.createTime = formattedDate(item.createTime)
          item.orderTime = formattedDate(item.orderTime)
          // item.status = Number(item.status)
        })
        this.setData({
          orderDetail:orderDetail[0]
        })
        console.log(orderDetail)
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

  // 催单
  reminder() {
    const currentTime = new Date().getTime();
    if (currentTime - this.data.lastClickTime < 500) {
      // 频繁点击，弹出提示框
      wx.showToast({
        title: '请勿频繁催单',
        icon: 'error'
      });
    } else {
      wx.showToast({
        title: '催单成功',
      })
    }
  
    // 记录当前点击时间戳
    this.setData({
      lastClickTime:currentTime
    })
  },

  // 取消订单
  cancelOrder() {
    wx.showModal({
      title: '取消订单',
      content: '是否确定取消订单',
      complete: (res) => {
        if (res.confirm) {
          const orderId = this.data.orderDetail.orderId
          http({
            url:`/cancelOrder?orderId=${orderId}`
          }).then(res => {
            console.log(res)
            if(res.status === 0) {
              wx.navigateBack()
            }
            if(res.status === -1) {
              wx.showToast({
                title: '取消失败',
                icon:'error'
              })
            }
          })
        }
      }
    })
  },

  // 完成订单
  completeOrder() {
    wx.showModal({
      title: '完成订单',
      content: '是否确定完成订单',
      complete: (res) => {
        if (res.confirm) {
          const orderId = this.data.orderDetail.orderId
          http({
            url:`/completeOrder?orderId=${orderId}`
          }).then(res => {
            console.log(res)
            if(res.status === 0) {
              wx.navigateBack()
            }else if(res.status === -1) {
              wx.showToast({
                title: '操作失败',
              })
            }
          })
        }
      }
    })
  }
})