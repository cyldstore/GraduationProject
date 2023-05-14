function isTokenExpired() {
  const now = Date.now();
  const expirationTime = wx.getStorageSync('token').expireTime;
  return !expirationTime || now > expirationTime;
}

export default isTokenExpired