const getOpenid = require('../xcx/getOpenid')

// 不验证，操作数据库不携带参数
function handleDb(dboperation, req, res) {
    return dboperation.then(resolve => {
        resolve.forEach(item => {
            item.imageUrl = item.imageUrl.split(',')
            item.category = item.category.split('、')
            item.averageRating = item.averageRating.toFixed(1)
        })
        res.send({ status: 0, messages: resolve })
    }).catch(err => {
        res.send({ status: -1, messages: err })
    })
}

function handleDbParam(dboperation, req, res, params = null) {
    const openid = getOpenid(req)
    return dboperation(openid, params).then(resolve => {
        res.send({ status: 0, messages: resolve })
    }).catch(err => {
        res.send({ status: -1, messages: err })
    })
}

function handleDbList(dboperation, req, res, params = null) {
    const openid = getOpenid(req)
    return dboperation(openid, params).then(resolve => {
        resolve.forEach(item => {
            item.imageUrl = item.imageUrl.split(',')
            item.category = item.category.split('、')
            item.averageRating = item.averageRating.toFixed(1)
        })
        res.send({ status: 0, messages: resolve })
    }).catch(err => {
        console.log(err)
        res.send({ status: -1, messages: err })
    })
}

module.exports = {
    handleDb,
    handleDbParam,
    handleDbList
}