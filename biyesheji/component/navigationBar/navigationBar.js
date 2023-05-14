// component/navigationBar/navigationBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 头部导航栏标题
    title:{
      type:String,
      value:"预约做饭"
    },
    // 是否显示返回主页图标
    isShow:{
      type:Boolean,
      value:true
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
    // 点击图标返回首页
    onClick() {
      wx.switchTab({
        url: '/pages/index/index',
      })
    },
  }
})
