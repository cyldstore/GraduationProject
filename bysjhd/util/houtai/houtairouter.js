// 后台管理路由响应
const houtaidb = require('./houtaidb')
const jwt = require('../jwt/jwt')


// 首页登陆
function login(req, res, next) {
    const userName = req.body.userName
    const password = req.body.password
    // console.log(userName)
    houtaidb.loginSelect(userName, password).then(resolve => {
        if (resolve === 0) {
            const token = jwt.generate({
                username: userName
            }, '1d')
            // console.log(req.url)
            res.header("Authorization", token)
            res.header('Access-Control-Expose-Headers', 'Authorization')
            res.send({ status: 0, messages: '登陆成功' })
        }
        if (resolve === 1) {
            res.send({ status: 1, messages: '用户名错误' })
        }
        if (resolve === 2) {
            res.send({ status: 1, messages: '密码错误' })
        }
    })
}

// 图片上传功能
function upload(req, res, next) {
    const imgUrl = []
    req.files.forEach(item => {
        imgUrl.push(item.path.replace(/\\/g, '/').replace('public', 'http://127.0.0.1:3000/'))
    })
    res.send(imgUrl)
}

// 菜品页面获取数据
function foods(req, res, next) {
    houtaidb.foodsDb().then(resolve => {
        resolve.forEach(item => {
            item.imageUrl = item.imageUrl.split(',')
        })
        res.send({ status: 0, messages: resolve })
    }).catch(err => {
        res.send({ status: -1, messages: err })
    })
}

// 菜品页面添加菜品功能
function foodsAdd(req, res, next) {
    console.log(req.body)
    const { name, description, category, imageUrl, price } = req.body
    if (!name || !description || !category || !imageUrl.length || !price) {
        res.send('信息不完整')
        return
    }
    houtaidb.foodsAddDb(name, description, category, imageUrl, price).then(resolve => {
        res.send({ status: 0, messages: '添加成功' })
        return
    }).catch(reject => {
        res.send({ status: -1, messages: reject })
    })
}

// 菜品页面修改菜品功能
function foodsEdit(req, res, next) {
    console.log(req.body)
    const { dishId, name, description, category, imageUrl, price } = req.body
    if (!name || !description || !category || !price) {
        res.send('信息不完整')
        return
    }
    houtaidb.foodsEditDb(dishId, name, description, category, imageUrl, price).then(resolve => {
        res.send({ status: 0, messages: '成功修改' })
    }).catch(err => {
        res.send({ status: -1, messages: err })
    })
}

// 菜品页面菜品删除功能
function foodsDelete(req, res, next) {
    console.log(req.query.dishId)
    houtaidb.foodsDeleteDb(req.query.dishId).then(resolve => {
        res.send({ status: 0, messages: '删除成功' })
    }).catch(err => {
        res.send({ status: -1, messages: err })
    })
}

// 轮播图页面数据获取
function swiper(req, res, next) {
    houtaidb.swiperDb().then(resolve => {
        res.send({ status: 0, messages: resolve })
    }).catch(err => {
        res.send({ status: -1, messsages: err })
    })
}

// 轮播图页面数据添加
function swiperupload(req, res, next) {
    let imgUrl = req.files[0].path.replace(/\\/g, '/').replace('public', 'http://127.0.0.1:3000/')
    console.log(imgUrl)
    houtaidb.swiperuploadDb(imgUrl).then(resolve => {
        res.send({ status: 0, messages: "添加成功" })
    }).catch(err => {
        res.send({ status: -1, messages: err })
    })
}

// 轮播图页面数据删除
function swiperDelete(req, res, next) {
    console.log(req.query)
    const id = req.query.swiperId
    houtaidb.swiperDeleteDb(id).then(resolve => {
        res.send({ status: 0, messages: '删除成功' })
    }).catch(err => {
        res.send({ status: -1, messages: err })
    })
}

// 优惠券页面数据获取
function coupon(req, res, next) {
    houtaidb.couponDb().then(resolve => {
        res.send({ status: 0, messages: resolve })
    }).catch(err => {
        res.send({ status: -1, messages: err })
    })
}

// 优惠券页面添加数据
function couponAdd(req, res, next) {
    // console.log(req.body)
    const { couponCondition, value, number, couponLimit } = req.body
    houtaidb.couponAddDb(couponLimit, couponCondition, value, number).then(resolve => {
        res.send({ status: 0, messages: '添加成功' })
    }).catch(err => {
        res.send({ status: -1, messages: err })
    })
}

// 优惠券页面修改数据
function couponEdit(req, res, next) {
    const { couponId, couponCondition, value, number, couponLimit } = req.body
    houtaidb.couponEditDb(couponId, couponLimit, couponCondition, value, number).then(resolve => {
        res.send({ status: 0, messages: '修改成功' })
    }).catch(err => {
        res.send({ status: -1, messages: err })
    })
}

// 优惠券页面删除数据
function couponDelete(req, res, next) {
    const id = req.query.couponId
    houtaidb.couponDeleteDb(id).then(resolve => {
        res.send({ status: 0, messages: '修改成功' })
    }).catch(err => {
        res.send({ status: -1, messages: err })
    })
}

// 获取订单
function orders(req, res, next) {
    houtaidb.ordersDb().then(resolve => {
        resolve.forEach(item => {
            item.imageUrl = item.imageUrl.split(',')
            item.category = item.category.split('、')
            item.averageRating = item.averageRating.toFixed(1)
        })
        const result = resolve.reduce((acc, resolve) => {
            const orderId = resolve.orderId;
            if (!acc[orderId]) {
                acc[orderId] = {
                    orderId: orderId,
                    orderTime: resolve.orderTime,
                    createTime: resolve.createTime,
                    Tag: resolve.status == 0 ? '未接单' : resolve.status == 1 ? '已接单' : '已完成',
                    totalAmount: resolve.totalAmount,
                    userName: resolve.addressName,
                    phoneNumber: resolve.phoneNumber,
                    address: resolve.address + resolve.detailAddress,
                    dishes: []
                };
            }
            acc[orderId].dishes.push({
                dishId: resolve.dishId,
                dishName: resolve.name,
                imageUrl: resolve.imageUrl[0],
                quantity: resolve.quantity,
                price: resolve.price
            });
            return acc;
        }, {});
        res.send({ status: 0, messages: Object.values(result) })
    }).catch(err => {
        res.send({ status: -1, messages: err })
    })
}

// 接单
function orderAccess(req, res, next) {
    const orderId = req.query.orderId
    // console.log(orderId)
    houtaidb.orderAccessDb(orderId).then(resolve => {
        res.send({ status: 0, messages: resolve })
    }).catch(err => {
        res.send({ status: -1, messages: err })
    })
}

// 获取用户
function customers(req, res, next) {
    houtaidb.customersDb().then(resolve => {
        const results = []
        resolve.forEach(item => {
            results.push({
                customerId: item.customerId,
                userName: item.userName,
                userAvatar: item.userAvatar,
                gender: item.gender,
                phone: item.phone
            })
        })
        res.send({ status: 0, messages: results })
    }).catch(err => {
        res.send({ status: -1, messages: err })
    })
}

// 删除用户
function deleteuser(req, res, next) {
    const customerId = req.query.customerId
    houtaidb.deleteuserDb(customerId).then(resolve => {
        res.send({ status: 0, messages: resolve })
    }).catch(err => {
        res.send({ status: -1, messages: err })
    })
}

// 获取评论
function getComments(req, res, next) {
    houtaidb.getCommentsDb().then(resolve => {
        const results = []
        resolve.forEach(item => {
            results.push({
                commentId: item.commentId,
                commentText: item.commentText,
                commentImgUrl: item.commentImgUrl.split(',')[0] == '' ? [] : item.commentImgUrl.split(','),
                rate: item.rate,
                userName: item.userName,
                createTime: item.createtime,
                dishName: item.name
            })
        })
        res.send({ status: 0, messages: results })
    }).catch(err => {
        res.send({ status: -1, messages: err })
    })
}

// 删除评论
function deleteComment(req, res, next) {
    const commentId = req.query.commentId
    houtaidb.deleteCommentDb(commentId).then(resolve => {
        res.send({ status: 0, messages: resolve })
    }).catch(err => {
        res.send({ status: -1, messages: err })
    })
}

module.exports = {
    login,
    upload,
    foods,
    foodsAdd,
    foodsEdit,
    foodsDelete,
    swiper,
    swiperupload,
    swiperDelete,
    coupon,
    couponAdd,
    couponEdit,
    couponDelete,
    orders,
    orderAccess,
    customers,
    deleteuser,
    getComments,
    deleteComment
}