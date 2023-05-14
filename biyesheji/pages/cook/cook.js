const {
  default: http
} = require("../../util/http")
const { default: isTokenExpired } = require("../../util/tokenExpired")

// pages/cook/cook.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 下拉菜单数据
    option1: [{
      text: '全部商品',
      value: 0
    }, ],
    option2: [{
        text: '默认排序',
        value: 'a'
      },
      {
        text: '评分排序',
        value: 'b'
      },
    ],
    value1: 0,
    value2: 'a',

    // 购物车商品数量
    shopNumber: 0,
    dishes: [], //菜品数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    http({
      url: '/dishes'
    }).then(res => {
      console.log(res)
      this.setData({
        dishes: res.messages
      })
      console.log(this.data.dishes)
    }).catch(err => {
      console.log(err)
    })

    // 如果已登录，获取购物车商品数量
    if (!isTokenExpired()) {
      http({
        url: `/cartquantity`
      }).then(res => {
        // console.log(res)
        if (res.status === 0) {
          this.setData({
            shopNumber: Number(res.messages[0].total_quantity)
          })
        }
      })
    }
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

  //点击跳转搜索页面
  onClick() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  // 点击跳转菜品详情
  toChef(e) {
    // console.log(e.currentTarget.dataset.id)
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/chef/chef?id=${id}`,
    })
  },

  // 点击加入购物车
  addCart(e) {
    if (!wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      console.log(e.currentTarget.dataset.id)
      http({
        url: `/addCart`,
        method: 'POST',
        data: {
          dishId: e.currentTarget.dataset.id
        }
      }).then(res => {
        console.log(res)
        if (res.status === 0) {
          wx.showToast({
            title: '加入购物车成功',
          })
          this.data.shopNumber += 1
          this.setData({
            shopNumber: this.data.shopNumber
          })
        } else if (res.status === -1) {
          wx.showToast({
            title: '加入失败',
            icon: 'error'
          })
        }
      }).catch(err => {
        wx.showToast({
          title: '加入失败',
          icon: 'error'
        })
      })
    }
  },

  // 点击跳转购物车
  toShopCart() {
    if (!wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      if (this.data.shopNumber === 0) {
        return wx.showToast({
          title: '购物车没有商品',
          icon: "error"
        })
      }
      wx.switchTab({
        url: '/pages/shopcar/shopcar',
      })
    }
  },

  // 菜品排序
  handleOrder(e) {
    console.log(e.detail)
    if (e.detail == 'a') {
      this.data.dishes.sort((a, b) => a.dishId - b.dishId)
      this.setData({
        dishes: this.data.dishes
      })
    } else if (e.detail == 'b') {
      this.data.dishes.sort((a, b) => b.averageRating - a.averageRating)
      this.setData({
        dishes: this.data.dishes
      })
    }
  }
})