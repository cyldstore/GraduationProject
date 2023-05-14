function upload(parmas,isHeader=false) {
  return new Promise((resolve,rejects) => {
    wx.showLoading({
      title: '正在加载中',
    })
    const token = wx.getStorageSync('token').newToken
    wx.uploadFile({
      ...parmas,
      url:"https://cyldwz.cn/api/xcx" + parmas.url,
      header:{
        "Authorization":'Bearer ' + token
      },
      success:(res) => {
        if (res.header.Authorization) {
          // wx.setStorageSync('token', res.header.Authorization)
          const newToken = res.header.Authorization
          const expireTime = Date.now() + (86400 * 1000)
          wx.setStorageSync('token', {newToken,expireTime})
        }
        if(isHeader) {
          if (res.statusCode === 401) {
            wx.removeStorageSync('token')
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
          resolve({
            list:res.data,
            total:res.header["X-Total-Count"]
          })
        }else {
          if (res.statusCode === 401) {
            wx.removeStorageSync('token')
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
          resolve(res.data)
        }
        
      },
      fail:(error) => {
        rejects(error)
      }
    })
    wx.hideLoading()
  })
}

export default upload