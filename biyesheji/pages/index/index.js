// index.js
const {
  default: http
} = require('../../util/http');
const QQMapWX = require('../../util/qqmap/qqmap-wx-jssdk');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    location: '', //当前定位
    indexSwiper: [], //首页轮播图
    loadingerr: true, //轮播图是否加载成功
    hotdishes: [], //热门菜品数据
    latitude: '', //经度
    longitude: '', //纬度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取当前定位
    wx.getFuzzyLocation({
      success: (res) => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        new QQMapWX({
          key: 'IZ5BZ-I5YEJ-2AUFM-FFKH6-ZC34Z-L5F6C'
        }).reverseGeocoder({
          location: `${this.data.latitude},${this.data.longitude}`,
          success: (res) => {
            // console.log(res.result.address)
            this.setData({
              location: res.result.address,
              latitude: res.result.location.lat,
              longitude: res.result.location.lng
            })
          },
          fail: (err) => {
            // console.log(err)
            this.setData({
              location: '获取位置失败！'
            })
          }
        })
      },
      fail: (err) => {
        this.setData({
          location: '获取位置失败'
        })
      }
    })

    // 获取首页轮播数据
    this.getSwiperData()

    // 获取热门厨师
    this.getHotCook()
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
    this.getSwiperData()
    this.getHotCook()
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

  // 头部导航栏点击跳转地图页面
  toMap() {
    wx.chooseLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      success: (res) => {
        console.log(res)
        this.setData({
          location: res.name
        })
      }
    })
  },

  // 首页搜索框跳转搜索页面
  onClick() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  // 获取首页轮播数据
  getSwiperData() {
    http({
      url: '/swiper'
    }).then(res => {
      this.setData({
        indexSwiper: res.messages,
        loadingerr: false
      })
      console.log(this.data.indexSwiper)
    }).catch(err => {
      console.log(err)
    })
  },

  //跳转功能页面
  toFunctionPage(evt) {
    const name = evt.currentTarget.dataset.name
    //  console.log(name)
    wx.navigateTo({
      url: `/pages/${name}/${name}`,
    })
    // console.log(evt.currentTarget.dataset.name)
  },

  //获取热门厨菜品
  getHotCook() {
    http({
      url: '/hotdishes'
    }).then(res => {
      // console.log(res)
      this.setData({
        hotdishes: res.messages
      })
      console.log(this.data.hotdishes)
    }).catch(err => {
      console.log(err)
    })
  },

 // 跳转菜品详情页面
  chefMessage(e) {
    // console.log(e.currentTarget.dataset.dishid)
    const id = e.currentTarget.dataset.dishid
    wx.navigateTo({
      url: `/pages/chef/chef?id=${id}`,
    })
  },
})