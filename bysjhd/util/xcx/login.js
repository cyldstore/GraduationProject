const https = require('https');
const querystring = require('querystring');
const { appId, appSecret } = require('./config');

function getOpenidAndSessionKey(code) {
  const params = {
    appid: appId,
    secret: appSecret,
    js_code: code,
    grant_type: 'authorization_code'
  };
  const options = {
    hostname: 'api.weixin.qq.com',
    path: '/sns/jscode2session?' + querystring.stringify(params),
    method: 'GET'
  };
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', chunk => {
        rawData += chunk;
      });
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          resolve(parsedData);
        } catch (err) {
          reject(err);
        }
      });
    });
    req.on('error', err => {
      reject(err);
    });
    req.end();
  });
}

module.exports = getOpenidAndSessionKey