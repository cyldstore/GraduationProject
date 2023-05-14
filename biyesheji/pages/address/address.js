const {
  default: http
} = require("../../util/http")

// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:[],   //地址信息
    source:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      source:options.source
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
    // 获取地址信息
    this.getAddress()
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
    this.getAddress()
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

  // 返回上一页
  goBack() {
    wx.navigateBack()
  },

  // 跳转地址编辑
  toEdit(e) {
    console.log(e)
    const option = e.currentTarget.dataset.option
    const id = e.currentTarget.dataset.id?e.currentTarget.dataset.id:null
    wx.navigateTo({
      url: `/pages/edit/edit?option=${option}&id=${id}`,
    })
  },

  // 获取地址信息
  getAddress() {
    http({
      url: '/address'
    }).then(res => {
      if (res.status == 0) {
        console.log(res.messages)
        this.setData({
          address:res.messages
        })
      }
      if (res.status == -1) {
        console.log(res.messages)
      }
    }).catch(err => {
      wx.showToast({
        title: '获取失败',
        icon: 'error'
      })
    })
  },

  // 设置默认地址
  isDefault(e) {
    // console.log(e.currentTarget.dataset.id)
    const id = e.currentTarget.dataset.id
    const index = e.currentTarget.dataset.index
    http({
      url:`/adressDefault?id=${id}`
    }).then(res => {
      if (res.status == 0) {
        this.data.address.map(item => {
          item.isDefault = false
        })
        this.data.address[index].isDefault = true
        this.setData({
          address:this.data.address
        })
      }
      if (res.status == -1) {
        console.log(res.messages)
      }
    }).catch(err => {
      wx.showToast({
        title: '设置失败',
        icon: 'error'
      })
    })
  },

  // 删除地址
  delete(e) {
    // console.log(e.currentTarget.dataset.id)
    const id = e.currentTarget.dataset.id
    http({
      url:`/addressDelete?id=${id}`,
      method:'DELETE',
    }).then(res => {
      if(res.status == 0) {
        this.getAddress()
      }
      if(res.status == -1) {
        wx.showToast({
          title: '删除失败',
          icon:'error'
        })
      }
    })
  },

  // 跳转回支付页面
  toPay(e) {
    let pages = getCurrentPages()
    let prevPage = pages[pages.length - 2]
    const index = e.currentTarget.dataset.index
    const address = this.data.address[`${index}`]
    console.log(address)
    prevPage.setData({
      address:address
    })
    wx.navigateBack({
      delta:1
    })
  }
})