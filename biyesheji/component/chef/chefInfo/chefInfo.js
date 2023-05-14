// component/chef/chefInfo/chefInfo.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    introduction:{
      type:"String",
      value:"菜品介绍"
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
    // 调用微信API接口，实现点击电话号码拨打电话
    toPhone(e) {
      // console.log(e.currentTarget.dataset.phone)
      wx.makePhoneCall({
        phoneNumber: 'e.currentTarget.dataset.phone',
        success:() => {
          wx.showToast({
            title: '拨号成功',
          })
        },
        fail:() => {
          wx.showToast({
            title: '拨号失败，请重试',
            icon: "error"
          })
        }
      })
    }
  }
})
