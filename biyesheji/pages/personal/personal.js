// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'',   //预约日期
    detialTime:'',    //详细时间
    address:'',    //所在地区
    isNotice:false,  //是否有忌口
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

  // 图片预览
  previewImg() {
    wx.previewImage({
      urls: ['/public/personImg/chushi.webp'],
      current:'/public/personImg/chushi.webp'
    })
  },

  // 日期选择
  dateSelet(e) {
    // console.log(e.detail.value)
    this.setData({
      date:e.detail.value
    })
    // console.log(this.data.date)
  },

  // 具体时间
  detailTime(e) {
    this.setData({
      detailTime:e.detail.value
    })
  },

  // 地区选择
  addressSelect(e) {
    this.setData({
      address:e.detail.value
    })
  },

  // 是否忌口
  onChange() {
   console.log(this.data.isNotice)
   this.setData({
     isNotice:!this.data.isNotice
   })
  },

  // 表单提交
  formSubmit(e) {
    // console.log(e.detail.value)
    const data = e.detail.value
    // 验证手机号码
    const regPhone = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
    // 地址与菜品名称不能有纯数字组成
    const regNumber =/^\d+$/
    if(!data.date) {
      return wx.showToast({
        title: '请选择日期',
        icon: 'error'
      })
    }
    if(!data.detailTime) {
      return wx.showToast({
        title: '请选择具体时间',
        icon: 'error'
      })
    }
    if(!data.address) {
      return wx.showToast({
        title: '请选择所在地区',
        icon: 'error'
      })
    }
    if(!data.detailAddress) {
      return wx.showToast({
        title: '请填写详细地址',
        icon: 'error'
      })
    }else if(regNumber.test(data.detailAddress)) {
      return wx.showToast({
        title: '地址格式错误',
        icon: 'error'
      })
    }
    if(!data.foods[0]) {
      return wx.showToast({
        title: '请选择食材准备方式',
        icon: 'error'
      })
    }
    if(this.data.isNotice) {
      if(!data.notice) {
        return wx.showToast({
          title: '请输入注意事项',
          icon: 'error'
        })
      }else if(regNumber.test(data.notice)) {
        return wx.showToast({
          title: '注意事项格式错误',
          icon: 'error'
        })
      }
    }
    if(!data.dish) {
      return wx.showToast({
        title: '请填写意向菜品名称',
        icon: 'error'
      })
    }else if(regNumber.test(data.dish)) {
      return wx.showToast({
        title: '菜品名称格式错误',
        icon: 'error'
      })
    }
    if(!data.phoneNumber) {
      return wx.showToast({
        title: '请填写手机号',
        icon: 'error'
      })
    }else if(!regPhone.test(data.phoneNumber)) {
      return wx.showToast({
        title: '手机号码格式错误',
        icon: 'error'
      })
    }
    if(!data.wechatNumber) {
      return wx.showToast({
        title: '请填写微信号',
        icon: 'error'
      })
    }
  },

  // 表单重置
  formReset(e) {
    // console.log(e)
  }
})