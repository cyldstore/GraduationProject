var jwt = require('./jwt')

// 后台管理页面验证token
function verifyHoutaiToken(req, res, next) {
    if (req.url === '/login') {
        console.log(req.url)
        next()
        return
    }

    const token = req.headers["authorization"].split(" ")[1]
    if (token) {
        var payload = jwt.verify(token)
        // console.log(payload)
        if (payload) {
            const newToken = jwt.generate({
                username: payload.username
            }, "1d")
            res.header("Authorization", newToken)
            res.header('Access-Control-Expose-Headers', 'Authorization')
            next()
        } else {
            res.status(401).send({ errCode: "-1", errorInfo: "token过期" })
        }
    }
}

function verifyXcxToken(req, res, next) {
    if (req.url.includes('/verify') || req.url === '/swiper' || req.url === '/hotdishes' || req.url.includes('/dishDetail') || req.url === '/dishes' || req.url.includes('/search') || req.url === '/coupon' || req.url.includes('/shopRate')) {
        console.log(req.url)
        next()
        return
    }

    const token = req.headers["authorization"].split(" ")[1]
    if (token) {
        var payload = jwt.verify(token)
        // console.log(payload)
        if (payload) {
            const newToken = jwt.generate({
                session_key: payload.session_key,
                openid: payload.openid
            }, "1d")
            res.header("Authorization", newToken)
            res.header('Access-Control-Expose-Headers', 'Authorization')
            next()
        } else {
            res.status(401).send({ errCode: "-1", errorInfo: "token过期" })
        }
    }
}

module.exports = {
    verifyHoutaiToken,
    verifyXcxToken
}