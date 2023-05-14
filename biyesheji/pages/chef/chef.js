const {
  default: formattedDate
} = require("../../util/formattedDate")
const {
  default: http
} = require("../../util/http")
const { default: isTokenExpired } = require("../../util/tokenExpired")

// pages/chef/chef.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dishData: [], //菜品数据
    isSticky: false, //是否固定在顶部
    isShouCang: false, //是否收藏
    showId: 0, //页面展示索引
    shopNumber: 0, //购物车商品数量
    dishId: '',
    rate: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.id)
    this.setData({
      dishId: options.id
    })
    // 获取菜品详情
    http({
      url: `/dishDetail?dishId=${options.id}`
    }).then(res => {
      // console.log(res)
      this.setData({
        dishData: res.messages[0]
      })
      console.log(this.data.dishData)
    }).catch(err => {
      console.log(err)
    })

    if (!isTokenExpired()) {
      // 获取收藏信息
      http({
        url: `/favoritesDetail?dishId=${options.id}`
      }).then(res => {
        if (res.status == 0) {
          this.setData({
            isShouCang: true
          })
        }
      })

      // 获取购物车数量
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

  // 点击返回上一页面
  goBack() {
    wx.navigateBack()
  },

  // 标签栏滑动到页面顶部时，将标签栏固定在页面顶部
  onPageScroll(e) {
    // console.log(e.scrollTop)
    const query = wx.createSelectorQuery()
    query.select('.label').boundingClientRect((rect) => {
      // 标签栏到达头部导航栏下方后切换为粘性定位
      if (rect.top < 75) {
        this.setData({
          isSticky: true
        })
      } else if (rect.top > 75) {
        this.setData({
          isSticky: false
        })
      }
      // console.log(rect.top)
    }).exec()
  },

  // 根据标签栏索引动态显示组件
  onClick(e) {
    // console.log(e.detail.index)
    const dishId = this.data.dishId
    this.setData({
      showId: e.detail.index
    })
    if (e.detail.index == 1) {
      http({
        url: `/shopRate?dishId=${dishId}`
      }).then(res => {
        console.log(res)
        const rate = res.messages
        rate.map(item => {
          item.time = formattedDate(item.time)
        })
        if (res.status == 0) {
          this.setData({
            rate: rate
          })
        }
        console.log(this.data.rate)
      })
    }
  },

  // 点击加入购物车
  addCart() {
    if (!wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      console.log(this.data.dishId)
      http({
        url: `/addCart`,
        method: 'POST',
        data: {
          dishId: this.data.dishId
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

  // 点击跳转支付页面
  toPay(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/pay/pay?id=${id}`,
    })
  },

  // 收藏
  shouCang() {
    if (!wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      this.setData({
        isShouCang: !this.data.isShouCang
      })
      console.log(this.data.isShouCang)
      if (this.data.isShouCang) {
        http({
          url: `/favorites`,
          method: "POST",
          data: {
            dishId: this.data.dishId
          }
        }).then(res => {
          if (res.status == -1) {
            wx.showToast({
              title: '收藏失败',
              icon: "error"
            })
            console.log(res)
          }
        })
      } else if (!this.data.isShouCang) {
        http({
          url: `/favorites?dishId=${this.data.dishId}`,
          method: "DELETE",
        }).then(res => {
          if (res.status === -1) {
            wx.showToast({
              title: '取消失败',
              icon: 'error'
            })
            console.log(res)
          }
        })
      }
    }
  },

  // 跳转购物车
  toShopCart() {
    if (!wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      wx.showModal({
        title: '跳转购物车',
        content: '是否跳转到购物车页面',
        complete: (res) => {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/shopcar/shopcar',
            })
          }
        }
      })
    }
  },
})