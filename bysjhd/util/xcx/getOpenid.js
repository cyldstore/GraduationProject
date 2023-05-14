const jwt = require('../jwt/jwt')

function getOpenid(req) {
    const token = req.headers["authorization"].split(" ")[1]
    const payload = jwt.verify(token)
    const {openid} = payload
    return openid
}

module.exports = getOpenid
