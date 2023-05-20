const {
  default: http
} = require("../../util/http")
const QQMapWX = require('../../util/qqmap/qqmap-wx-jssdk');

// pages/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    option: '', //页面功能
    id: '',
    addressName: '', //收货人
    phoneNumber: '', //手机号码
    address: '', //所在地区
    detailAddress: '', //详细地址
    latitude: '', //经度
    longitude: '', //纬度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      option: options.option,
      id: options.id
    })

    if (options.option == '修改地址') {
      http({
        url: `/addressDetail?id=${this.data.id}`
      }).then(res => {
        const {
          addressName,
          phoneNumber,
          address,
          detailAddress
        } = res.messages[0]
        this.setData({
          addressName,
          phoneNumber,
          address,
          detailAddress
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // 获取定位
    this.getLocation()
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

  //保存地址信息
  onSubmit(e) {
    const option = this.data.option
    const id = this.data.id
    // console.log(e)
    const {
      addressName,
      phoneNumber,
      address,
      detailAddress
    } = e.detail.value
    const phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
    if (!phoneReg.test(phoneNumber)) {
      wx.showToast({
        title: '号码格式错误',
        icon: 'error'
      })
      return
    }
    if (option == '添加地址') {
      http({
        url: '/addAddress',
        method: "POST",
        data: {
          addressName,
          phoneNumber,
          address,
          detailAddress
        }
      }).then(res => {
        if (res.status == 0) {
          wx.showToast({
            title: '添加成功',
          })
          wx.navigateBack()
        }
        if (res.status == -1) {
          wx.showToast({
            title: '添加失败',
            icon: 'error'
          })
          console.log(res.messages)
        }
        if (res == '信息不完整') {
          wx.showToast({
            title: res,
            icon: 'error'
          })
        }
      }).catch(err => {
        // console.log(err)
        wx.showToast({
          title: '添加失败',
          icon: 'error'
        })
      })
    }
    if (option == '修改地址') {
      http({
        url: '/addressEdit',
        method: "POST",
        data: {
          id,
          addressName,
          phoneNumber,
          address,
          detailAddress
        }
      }).then(res => {
        if (res.status === 0) {
          wx.navigateBack()
        }
        if (res.status === 1) {
          wx.showToast({
            title: '修改失败',
            icon: 'error'
          })
        }
        if (res == '信息不完整') {
          wx.showToast({
            title: res,
            icon: 'error'
          })
        }
      })
    }
  },

  // 获取当前定位
  getLocation() {
    console.log(111111)
    // 获取当前定位
    wx.getFuzzyLocation({
      success: (res) => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        console.log(res)
        // 获取当前定位
        new QQMapWX({
          key: 'IZ5BZ-I5YEJ-2AUFM-FFKH6-ZC34Z-L5F6C'
        }).reverseGeocoder({
          location: `${this.data.latitude},${this.data.longitude}`,
          success: (res) => {
            console.log(res.result)
            const {
              province,
              city,
              district,
              street_number
            } = res.result.address_component
            this.setData({
              address: province + city + district,
              detailAddress: street_number,
              latitude: res.result.location.lat,
              longitude: res.result.location.lng
            })
          },
          fail:(err) => {
            console.log(err)
          }
        })
      },
      fail: (err) => {
        console.log(err)
        this.setData({
          location: '获取位置失败'
        })
      }
    })
  },

  // 获取详细地址
  toMap() {
    wx.chooseLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      success: (res) => {
        console.log(res)
        this.setData({
          detailAddress: res.name,
          address:res.address
        })
      }
    })
  },
})