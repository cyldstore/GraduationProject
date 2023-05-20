function uploadFiles(params, isHeader = false) {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '正在加载中',
    })
    const token = wx.getStorageSync('token').newToken
    let uploadPromises = []
    for (let i = 0; i < params.filePath.length; i++) {
      uploadPromises.push(
        new Promise((resolve, reject) => {
          wx.uploadFile({
            ...params,
            filePath: params.filePath[i],
            url: "http://localhost:3000/api/xcx" + params.url,
            header: {
              "Authorization": 'Bearer ' + token
            },
            success: (res) => {
              if (res.header.Authorization) {
                // wx.setStorageSync('token', res.header.Authorization)
                const newToken = res.header.Authorization
                const expireTime = Date.now() + (86400 * 1000)
                wx.setStorageSync('token', {newToken,expireTime})
              }
              if (isHeader) {
                if (res.statusCode === 401) {
                  wx.removeStorageSync('token')
                  wx.navigateTo({
                    url: '/pages/login/login',
                  })
                }
                resolve({
                  list: res.data,
                  total: res.header["X-Total-Count"]
                })
              } else {
                if (res.statusCode === 401) {
                  wx.removeStorageSync('token')
                  wx.navigateTo({
                    url: '/pages/login/login',
                  })
                }
                resolve(res.data)
              }
            },
            fail: (error) => {
              reject(error)
            }
          })
        })
      )
    }
    Promise.all(uploadPromises).then(res => {
      wx.hideLoading()
      resolve(res)
    }).catch(error => {
      wx.hideLoading()
      reject(error)
    })
  })
}
 export default uploadFiles