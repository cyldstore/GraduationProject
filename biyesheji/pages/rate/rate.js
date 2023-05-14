const { default: formattedDate } = require("../../util/formattedDate")
const {
  default: http
} = require("../../util/http")
const {
  default: uploadFiles
} = require("../../util/uploadFiles")

// pages/rate/rate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderdetail: {},
    Index: 0, //删除图片的index
    isDelete: false, //是否删除图片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.orderId)
    http({
      url: `/orderRate?orderId=${options.orderId}`
    }).then(res => {
      if (res.status === 0) {
        const orderdetail = res.messages[0]
        orderdetail.dishes.map(item => {
          item.rate = 0
          item.comment = ''
          item.rateImg = []
        })
        this.setData({
          orderdetail: orderdetail
        })
      }
      console.log(this.data.orderdetail)
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

  // 添加图片
  uploader(e) {
    const index = e.currentTarget.dataset.index
    let orderdetail = this.data.orderdetail
    let phontoArray = orderdetail.dishes[index].rateImg
    wx.chooseMedia({
      count: 9,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success: (res) => {
        res.tempFiles.forEach(item => {
          phontoArray.push(item.tempFilePath)
        })
        orderdetail.dishes[index].rateImg = phontoArray
        this.setData({
          orderdetail: orderdetail
        })
      },
      fail: (err) => {
        if (err.errMsg === "chooseMedia:fail f.lookup(...).indexOf is not a function") {
          wx.showToast({
            title: '文件格式错误',
            icon: "error"
          })
        }
      }
    })
  },

  // 获取外部index
  onDelete(e) {
    const isDelete = this.data.isDelete
    if (isDelete) {
      const dishIndex = e.currentTarget.dataset.dishindex
      const index = this.data.index
      let orderdetail = this.data.orderdetail
      orderdetail.dishes[dishIndex].rateImg.splice(index, 1)
      this.setData({
        orderdetail: orderdetail,
        isDelete: false
      })
    }
  },

  // 删除图片
  delete(e) {
    this.setData({
      index: e.currentTarget.dataset.index,
      isDelete: true
    })
  },

  // 评分
  onChange(e) {
    const index = e.currentTarget.dataset.index
    const rate = e.detail
    let orderdetail = this.data.orderdetail
    orderdetail.dishes[index].rate = rate
    this.setData({
      orderdetail: orderdetail
    })
  },

  // 评论
  onBlur(e) {
    const index = e.currentTarget.dataset.index
    const comment = e.detail.value
    let orderdetail = this.data.orderdetail
    orderdetail.dishes[index].comment = comment
    this.setData({
      orderdetail: orderdetail
    })
    console.log(this.data.orderdetail)
  },

  // 提交评论
  onSubmit() {
    // 提交图片
    const now = new Date()
    const time = formattedDate(now)
    let orderdetail = this.data.orderdetail
    orderdetail.time = time
    const uploadPromises = []
    orderdetail.dishes.forEach(item => {
      const promise = uploadFiles({
        url: '/uploadRateImg',
        filePath: item.rateImg,
        name: "rateImg"
      }).then(res => {
        item.rateImg = res
        this.setData({
          orderdetail: orderdetail
        })
      })
      uploadPromises.push(promise)
    })

    Promise.all(uploadPromises).then(() => {
      console.log(orderdetail)
      http({
        url: `/uploadRate`,
        method: "Post",
        data: {
          orderRate: orderdetail
        },
      }).then(res => {
        console.log(res)
        if (res.status === 0) {
          wx.switchTab({
            url: '/pages/index/index',
          })
        } else {
          console.log(res)
          wx.showToast({
            title: '提交失败',
            icon: "error"
          })
        }
      }).catch(err => {
        wx.showToast({
          title: '提交失败',
          icon: "error"
        })
      })
    }).catch(err => {
      wx.showToast({
        title: '图片提交失败',
        icon: "error"
      })
    })
  }
})