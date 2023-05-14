const {
  default: http
} = require("../../util/http")

// pages/shopcar/shopcar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollDistance: 0, //商品卡片向左移动距离
    clientX: 0, //触摸开始位置
    cart: [], //购物车商品
    totalPrice: 0, //总金额
    selectAll: 0, //是否全选
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
    // 获取购物商品
    this.getCart()
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
    this.getCart()
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

  // 获取购物车列表
  getCart() {
    http({
      url: `/cart`
    }).then(res => {
      // console.log(res)
      if (res.status === 0) {
        const cart = res.messages
        cart.map(item => {
          item.scrollDistance = 0
        })
        this.setData({
          cart: cart
        })
        this.isSelectAll()
        this.totalPrice()
      }
    })
  },

  //手指开始触摸屏幕事件
  handleTouchStart(e) {
    // console.log(e.touches[0].clientX)
    this.data.cart.map(item => {
      item.scrollDistance = 0
    })
    this.setData({
      clientX: e.touches[0].clientX,
      cart: this.data.cart
    })
  },

  // 手指触摸移动事件
  handleTouchMove(e) {
    let index = e.currentTarget.dataset.index
    let distance = e.touches[0].clientX - this.data.clientX
    // 卡片跟随手指移动
    this.data.cart[index].scrollDistance = distance
    this.setData({
      cart: this.data.cart
    })
  },

  // 手指触摸结束事件
  handleTouchEnd(e) {
    const index = e.currentTarget.dataset.index
    const query = wx.createSelectorQuery()
    query.select(`.item-${index}`).boundingClientRect((rect) => {
      // 给滑动距离设置临界值
      if (rect.left < -50) {
        this.data.cart[index].scrollDistance = -50
        this.setData({
          cart: this.data.cart
        })
      } else if (rect.left > 0) {
        this.data.cart[index].scrollDistance = 0
        this.setData({
          cart: this.data.cart
        })
      }
    }).exec()
  },

  // 点击跳转菜品详情
  toChef(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/chef/chef?id=${id}`,
    })
  },

  // 点击删除
  delete(e) {
    const cartId = e.currentTarget.dataset.id
    // console.log(cartId)
    http({
      url:`/cart?cartId=${cartId}`,
      method:'DELETE'
    }).then(res => {
      console.log(res)
      if(res.status === 0) {
        this.getCart()
      }else if(res.status === -1) {
        wx.showToast({
          title: '删除失败',
          icon:'error'
        })
      }
    }).catch(err => {
      wx.showToast({
        title: '删除失败',
        icon:'error'
      })
    })
  },

  //点击跳转支付页面
  onSubmit() {
    const cart = this.data.cart
    if (cart.length) {
      let select = 0
      cart.forEach(item => {
        if(item.isSelect) {
          select+=1
        }
      })
      if(!select) {
        wx.showToast({
          title: '还没选择商品',
          icon: 'error'
        })
      }else if(select) {
        wx.navigateTo({
          url: '/pages/pay/pay',
        })
      }
    } else {
      wx.showToast({
        title: '还没选择商品',
        icon: 'error'
      })
    }
  },

  // 选择商品
  isSelect(e) {
    const cartId = e.currentTarget.dataset.id
    const index = e.currentTarget.dataset.index

    this.data.cart[index].isSelect = !this.data.cart[index].isSelect
    const isSelect = this.data.cart[index].isSelect
    this.setData({
      cart: this.data.cart
    })

    http({
      url: `/isSelectCart`,
      method: 'POST',
      data: {
        isSelect: isSelect,
        cartId: cartId
      }
    }).then(res => {
      console.log(res)
      if (res.status === 0) {
        this.isSelectAll()
        this.totalPrice()
      }
      if (res.status === -1) {
        wx.showToast({
          title: '服务器错误',
          icon: 'error'
        })
      }
    }).catch(err => {
      wx.showToast({
        title: '网络错误',
        icon: 'error'
      })
    })
  },

  // 计算总金额
  totalPrice() {
    if (this.data.cart.length) {
      const cart = this.data.cart
      let totalPrice = 0
      cart.forEach(item => {
        if (item.isSelect) {
          totalPrice += item.price * item.quantity
        }
      })

      this.setData({
        totalPrice: Number(totalPrice.toFixed(2).replace(".", ""))
      })
    }
  },

  // 是否全选
  isSelectAll() {
    const cart = this.data.cart
    let number = 0
    if (cart.length) {
      cart.forEach(item => {
        if (item.isSelect) {
          number += 1
        }
        if (number === cart.length) {
          this.setData({
            selectAll: true
          })
        } else {
          this.setData({
            selectAll: false
          })
        }
      })
    }
  },

  // 全选/全不选
  selectAll() {
    const selectAll = !this.data.selectAll

    console.log(selectAll)

    http({
      url: `/cartSelectAll?selectAll=${selectAll}`,
    }).then(res => {
      console.log(res)
      if(res.status === 0) {
        this.getCart()
      }
    }).catch(err => {
      console.error(err)
    })

    this.setData({
      selectAll
    })
  },

  // 阻止冒泡
  stopEvent() {},

  // 更改商品数量
  onBlur(e) {
    const value = e.detail.value
    const cartId = e.currentTarget.dataset.id
    http({
      url:'/cartQuantity',
      method:'POST',
      data:{
        cartId:cartId,
        quantity:value
      }
    }).then(res => {
      if(res.status === 0) {
        this.getCart()
      }
      if(res.status === -1) {
        wx.showToast({
          title: '更新失败',
          icon:'error'
        })
        this.getCart()
      }
    }).catch(err => {
      wx.showToast({
        title: '更新失败',
        icon:'error'
      })
      this.getCart()
    })
  },
  onPlus(e) {
    const cartId = e.currentTarget.dataset.id
    http({
      url:`/cartPlus?cartId=${cartId}`
    }).then(res => {
      if(res.status === 0) {
        this.getCart()
      }
      if(res.status === -1) {
        wx.showToast({
          title: '更新失败',
          icon:'error'
        })
        this.getCart()
      }
    }).catch(err => {
      wx.showToast({
        title: '更新失败',
        icon:'error'
      })
      this.getCart()
    })
  },
  onMinus(e) {
    const cartId = e.currentTarget.dataset.id
    http({
      url:`/cartMinus?cartId=${cartId}`
    }).then(res => {
      if(res.status === 0) {
        this.getCart()
      }
      if(res.status === -1) {
        wx.showToast({
          title: '更新失败',
          icon:'error'
        })
        this.getCart()
      }
    }).catch(err => {
      wx.showToast({
        title: '更新失败',
        icon:'error'
      })
      this.getCart()
    })
  }
})