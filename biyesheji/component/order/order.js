// component/order/order.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orders:{
      type:"Array",
      value:[]
    },
    state:{
      type:"String",
      value:"未接单"
    },
    icon:{
      type:"String",
      value:"todo-list-o"
    },
    color:{
      type:"String",
      value:"skyblue"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转订单详情
    toOrderDetail(e) {
      const orderId = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/orderdetail/orderdetail?orderId=${orderId}`,
      })
    },
    
    // 跳转评价页面
    toRate(e) {
      const orderId = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/rate/rate?orderId=${orderId}`,
      })
    },

    // 跳转评价详情页面
    toRateDetail(e) {
      const orderId = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/ratedetail/ratedetail?orderId=${orderId}`,
      })
    }
  }
})
