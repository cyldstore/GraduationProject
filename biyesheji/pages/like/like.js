const { default: http } = require("../../util/http")

// pages/like/like.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    favorites:[]  //收藏列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    http({
      url:'/favorites'
    }).then(res => {
      if(res.status == 0) {
        this.setData({
          favorites:res.messages
        })
        // console.log(this.data.favorites)
      }
      if(res.status == -1) {
        console.log(res.messages)
        // wx.showToast({
        //   title: '获取失败',
        //   icon:"error"
        // })
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

  // 跳转菜品详情页面
  toChef(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/chef/chef?id=${id}`,
    })
  }
})