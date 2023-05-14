const { default: http } = require("../../util/http")

// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    searchResult:'',  //搜索结果
    isShow:true
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

  // 搜索事件
  onSearch(e) {
    
  },

  // 点击返回上一页面
  goBack() {
    wx.navigateBack()
  },

  // 搜索
  onSearch(e) {
    console.log(e.detail);
    http({
      url: `/search?searchInfo=${e.detail}`,
    })
      .then((res) => {
        if (res.status === 0) {
          // 获取搜索结果
          const searchResult = res.messages;
          // 高亮显示搜索关键字
          searchResult.forEach(function (item) {
            item.name = this.highlight(item.name, e.detail);
            item.description = this.highlight(item.description, e.detail);
          }, this);
          // 更新页面数据
          this.setData({
            searchResult: searchResult,
            isShow: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // 关键字高亮
  highlight(str, keyword) {
    let reg = new RegExp(keyword, 'gi');
    str = str.replace(reg, `<span class="highlight">${keyword}</span>`);
    return str;
  },

  // 点击跳转菜品详情
  toChef(e) {
    // console.log(e.currentTarget.dataset.id)
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/chef/chef?id=${id}`,
    })
  }
})