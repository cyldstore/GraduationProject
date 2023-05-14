// pages/pay/pay.js
const {
  default: http
} = require("../../util/http")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dishes: [], //菜品列表
    address: {}, //地址列表
    totalPrice: 0, //保留两位小数转换为字符串且去掉小数点的总金额
    dishId: 0, //从菜品详情提交订单时的菜品id
    price: 0, //不做转换的总金额
    customerCouponId: 0, //使用的优惠券id
    couponPrice: 0, //使用的优惠券金额
    couponContent: '选择优惠券',
    showPopup: false,

    time: '', //预约的时间
    columns: [],
    pickerValue: [0, 0],
    todayList: [], //今天的时间列表
    normalList: [], //其余时间的时间列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initColumns()
    if (options.id) {
      this.setData({
        dishId: options.id
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.getAddress()
    if (!this.data.dishId) {
      this.getCartDishes()
    } else {
      this.getDishDetail()
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (this.data.customerCouponId) {
      this.setData({
        couponContent: `-￥${this.data.couponPrice}`
      })
      this.totalPrice()
    }
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

  // 点击支付
  onSubmit() {
    if(!this.data.address.userAddressId) {
      wx.showToast({
        title: '请添加地址信息',
        icon:"error"
      })
      return
    }
    // 弹出虚拟支付对话框
    wx.showModal({
      title: '虚拟支付',
      content: `您将进行一次虚拟支付，支付金额为${this.data.price}元，是否确认支付？`,
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          this.postOeder()
        }
      }
    });
  },

  // 提交订单
  postOeder() {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const date = `${year}-${month>9?month:'0'+month}-${day>9?day:'0'+day}` + ' ' + `${hours>9?hours:'0'+hours}:${minutes>9?minutes:'0'+minutes}`

    const time = this.data.time.replace(/[（）]/g, '').replace(/\D/g, '-').split('-')
    const orderMonth = time[0]
    const orderDay = time[1]
    const orderHours = time[4]
    const orderMinutes = time[5]
    const orderTime = `${year}-${orderMonth>9?orderMonth:'0'+orderMonth}-${orderDay>9?orderDay:'0'+orderDay}` + ' ' + `${orderHours}:${orderMinutes}`
    console.log(orderTime)

    http({
      url: '/orderAdd',
      method: 'POST',
      data: {
        orderTime: orderTime,
        totalAmount: this.data.price,
        userAddressId: this.data.address.userAddressId,
        customerscouponId: this.data.customerCouponId,
        createTime: date
      }
    }).then(res => {
      console.log(res)
      if (res.status === 0) {
        console.log(res.messages.insertId)
        // 提交订单详情并进行购物车或优惠券操作
        this.postOederDetail(res.messages.insertId)
      } else if (res.status === -1) {
        wx.showToast({
          title: '提交订单失败',
          icon: "error"
        })
      }
    }).catch(err => {
      wx.showToast({
        title: '提交订单失败',
        icon: "error"
      })
    })
  },

  // 提交订单详情
  postOederDetail(orderId) {
    const dishes = []
    this.data.dishes.forEach(item => {
      dishes.push({
        dishId: item.dishId,
        price: item.price,
        quantity: item.quantity
      })
    })
    http({
      url: '/orderDetailAdd',
      method: 'POST',
      data: {
        orderId: orderId,
        dishes: dishes,
        customerCouponId:this.data.customerCouponId,
        sourceId:this.data.dishId
      }
    }).then(res => {
      console.log(res)
      if(res.status === 0) {
        // 进行虚拟支付操作
        this.virtualPayment(() => {
          wx.switchTab({
            url: '/pages/order/order',
          })
        });
      }else if(res.status === -1) {
        wx.showToast({
          title: '提交订单失败',
          icon:'error'
        })
      }
    }).catch(err => {
      wx.showToast({
        title: '提交订单失败',
        icon:'error'
      })
    })
  },

  // 进行虚拟支付操作
  virtualPayment(callback) {
    wx.showLoading({
      title: '正在支付',
    });
    setTimeout(() => {
      // 虚拟支付成功
      wx.showToast({
        title: '支付成功',
        icon: 'success',
        duration: 1000
      });
      wx.hideLoading();
      setTimeout(() => {
        callback && callback();
      }, 1000)
    }, 1000);
  },

  // 页面跳转
  toSelect(e) {
    console.log(e.currentTarget.dataset.name)
    const path = e.currentTarget.dataset.name
    const price = this.data.price

    wx.navigateTo({
      url: `/pages/${path}/${path}?source=pay&price=${price}`,
    })
  },

  // 获取单件菜品数据
  getDishDetail() {
    http({
      url: `/dishDetail?dishId=${this.data.dishId}`
    }).then(res => {
      res.messages.map(item => {
        item.quantity = 1
      })
      this.setData({
        dishes: res.messages
      })
      this.totalPrice()
      console.log(this.data.dishes)
    }).catch(err => {
      console.log(err)
    })
  },

  // 获取购物车已选择商品数据
  getCartDishes() {
    http({
      url: `/cartSelect`
    }).then(res => {
      // console.log(res)
      if (res.status === 0) {
        const dishes = res.messages
        this.setData({
          dishes: dishes
        })
        this.totalPrice()
        console.log(dishes)
      }
    })
  },

  // 计算总金额
  totalPrice() {
    const dishes = this.data.dishes
    let totalPrice = 0
    dishes.forEach(item => {
      totalPrice += item.price * item.quantity
    })
    totalPrice = totalPrice - this.data.couponPrice

    this.setData({
      totalPrice: Number(totalPrice.toFixed(2).replace(".", "")),
      price: totalPrice
    })
  },

  // 获取默认地址
  getAddress() {
    http({
      url: '/addressPay'
    }).then(res => {
      console.log(res)
      if (res.status === 0) {
        this.setData({
          address: res.messages[0]
        })
      }
    })
  },

  // 显示选择器
  showPopup() {
    this.setData({
      showPopup: true
    })
  },

  // 初始化日期和时间列表
  initColumns() {
    let now = new Date() //Fri Apr 14 2023 17:17:47 GMT+0800 (中国标准时间)
    let today = now.getDate() //今天的日期
    let currentHours = now.getHours() //获取现在的小时
    let currentMinutes = now.getMinutes() //获取现在的分钟
    let days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    let time = '' //页面显示的时间
    let dateList = [] //显示的日期
    let timeList = [] //显示的时间

    if (currentHours >= 0 && currentHours < 18) {
      for (let i = 0; i < 7; i++) {
        let date = new Date(now.getTime() + 24 * 60 * 60 * 1000 * i) //i天后的时间
        let day = date.getDate() //i天后的日期
        let weekday = days[date.getDay()] //i天后的周数

        if (day === today) {
          weekday = '今天'
        }

        let dateStr = `${date.getMonth() + 1}月${day}日（${weekday}）`
        dateList.push(dateStr) //['4月14日（周五）'，'4月15日（周六）'，...]
      }
    } else if (currentHours > 18 && currentHours <= 23) {
      for (let i = 1; i < 8; i++) {
        let date = new Date(now.getTime() + 24 * 60 * 60 * 1000 * i) //i天后的时间
        let day = date.getDate() //i天后的日期
        let weekday = days[date.getDay()] //i天后的周数

        let dateStr = `${date.getMonth() + 1}月${day}日（${weekday}）`
        dateList.push(dateStr) //['4月14日（周五）'，'4月15日（周六）'，...]
      }
    }

    // 生成时间列表
    let startTime = 10 //开始时间10:00
    let endTime = 22 //结束事件22:00
    let interval = 20 //时间间隔20分钟
    let timeStr = ''

    for (let i = startTime; i < endTime; i++) {
      for (let j = 0; j < 60; j += interval) {
        timeStr = `${i}:${j === 0 ? '00' : j}`
        this.data.normalList.push(timeStr)
      }
    }
    this.data.normalList.push('22:00')

    if (currentHours >= 6 && currentHours < 18) {
      let startTime = currentHours + 4 //当前时间往后4小时
      let startMinutes = Math.round(currentMinutes / 20) * 20
      let endTime = 22 //结束事件22:00
      let interval = 20 //时间间隔20分钟
      let timeStr = ''
      for (let i = startMinutes; i < 60; i += interval) {
        timeStr = `${startTime}:${i === 0 ? '00' : i}`
        timeList.push(timeStr)
      }
      for (let i = startTime + 1; i < endTime; i++) {
        for (let j = 0; j < 60; j += interval) {
          timeStr = `${i}:${j === 0 ? '00' : j}`
          timeList.push(timeStr)
        }
      }
      timeList.push("22:00")
    } else {
      timeList = this.data.normalList
      timeList.push("22:00")
    }

    this.setData({
      columns: [{
          values: dateList,
        },
        {
          values: timeList
        }
      ],
      time: dateList[0] + timeList[0],
      normalList: this.data.normalList,
      todayList: timeList
    })
  },

  // 监听选择器确定事件
  onConfirm(e) {
    const dateIndex = e.detail.index[0]
    const timeIndex = e.detail.index[1]
    const value = e.detail.value

    this.data.columns[0].defaultIndex = dateIndex
    this.data.columns[1].defaultIndex = timeIndex
    this.data.time = value.toString().replace(',', '')
    this.setData({
      columns: this.data.columns,
      time: this.data.time,
      showPopup: false
    })
  },

  // 监听选择器变化时间
  onChange(e) {
    // console.log(e)
    if (!e.detail.index) {
      console.log(e.detail.value[0])
      if (e.detail.value[0].includes('今天')) {
        this.data.columns[1].values = this.data.todayList
        this.setData({
          columns: this.data.columns
        })
      } else {
        this.data.columns[1].values = this.data.normalList
        this.setData({
          columns: this.data.columns
        })
      }
    }
  },

  // 监听选择器取消事件
  onCancel() {
    this.setData({
      showPopup: false
    })
  }
})