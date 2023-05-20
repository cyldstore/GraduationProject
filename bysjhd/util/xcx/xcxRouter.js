const xcxDb = require('./xcxDb')
const getOpenidAndSessionKey = require('./login')
const generate = require('../jwt/generate')
const getOpenid = require('./getOpenid')
const { handleDb, handleDbParam, handleDbList } = require('../router/handleDb')


// 获取swiper数据
function swiper(req, res, next) {
    xcxDb.swiperDb().then(resolve => {
        res.send({ status: 0, messages: resolve })
    }).catch(err => {
        res.send({ status: -1, messages: err })
    })
}

// 获取热门菜品
function hotdishes(req, res, next) {
    handleDb(xcxDb.hotdishesDb(), req, res)
}

// 根据id获取菜品详情
function dishDetail(req, res, next) {
    const dishId = req.query.dishId
    handleDb(xcxDb.dishDetailDb(dishId), req, res)
}

// 获取菜品列表
function dishes(req, res, next) {
    handleDb(xcxDb.dishesDb(), req, res)
}

// 根据关键词搜索菜品
function search(req, res, next) {
    const searchInfo = req.query.searchInfo
    handleDb(xcxDb.searchDb(searchInfo), req, res)
}

// 获取优惠券列表
function coupon(req, res, next) {
    xcxDb.couponDb().then(resolve => {
        res.send({ status: 0, messages: resolve })
    }).catch(err => {
        res.send({ status: -1, messages: err })
    })
}

// 验证登陆
function verify(req, res, next) {
    // console.log(req.body.code)
    const code = req.body.code
    getOpenidAndSessionKey(code).then(resolve => {
        // console.log(resolve)
        const { session_key, openid } = resolve
        xcxDb.verifyDb(openid).then(resolve => {
            generate(res, { session_key, openid })
            res.send({ status: 0, messages: '已注册' })
        }).catch(err => {
            if (err == -1) {
                res.status(402).json({ messages: '授权失败' })
            } else if (err == 0) {
                generate(res, { session_key, openid })
                res.status(402).json({ messages: '未注册' })
            }
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: '服务器错误' });
    })
}

// 用户头像上传
function avatarupload(req, res, next) {
    const imgUrl = []
    req.files.forEach(item => {
        imgUrl.push(item.path.replace(/\\/g, '/').replace('public', 'http://127.0.0.1:3000/'))
    })
    res.send(imgUrl)
}

// 注册用户
function register(req, res, next) {
    const { nickname, avatar } = req.body
    const openid = getOpenid(req)
    xcxDb.registerDb(nickname, avatar, openid).then(resolve => {
        res.send({ status: 0, messages: '注册成功' })
    }).catch(err => [
        res.send({ status: -1, messages: err })
    ])
}

// 获取我的信息
function myself(req, res, next) {
    handleDbParam(xcxDb.myselfDb, req, res)
}

// 修改个人信息
function myselfEdit(req, res, next) {
    const { userName, gender, phone } = req.body
    handleDbParam(xcxDb.myselfEditDb, req, res, { userName, gender, phone })
}

// 获取地址
function address(req, res, next) {
    handleDbParam(xcxDb.addressDb, req, res)
}

// 添加地址信息
function addAddress(req, res, next) {
    const { addressName, phoneNumber, address, detailAddress } = req.body
    if (!addressName || !phoneNumber || !address || !detailAddress) {
        res.send('信息不完整')
        return
    }
    handleDbParam(xcxDb.addAddressDb, req, res, { addressName, phoneNumber, address, detailAddress })
}

// 设置默认地址
function addressDefault(req, res, next) {
    const userAddressId = req.query.id
    handleDbParam(xcxDb.addressDefaultDb, req, res, userAddressId)
}

// 获取具体地址
function addressDetail(req, res, next) {
    const userAddressId = req.query.id
    handleDbParam(xcxDb.addressDetailDb, req, res, userAddressId)
}

// 修改地址
function addressEdit(req, res, next) {
    const { id, addressName, phoneNumber, address, detailAddress } = req.body
    if (!addressName || !phoneNumber || !address || !detailAddress) {
        res.send('信息不完整')
        return
    }
    handleDbParam(xcxDb.addressEditDb, req, res, { id, addressName, phoneNumber, address, detailAddress })
}

// 删除地址
function addressDelete(req, res, next) {
    const id = req.query.id
    handleDbParam(xcxDb.addressDeleteDb, req, res, id)
}

// 根据dishId获取收藏
function favoritesDetail(req, res, next) {
    const dishId = req.query.dishId
    handleDbParam(xcxDb.favoritesDetailDb, req, res, dishId)
}

// 根据dishId添加收藏
function addFavorites(req, res, next) {
    const dishId = req.body.dishId
    handleDbParam(xcxDb.addFavoritesDb, req, res, dishId)
}

// 根据dishId删除收藏
function deleteFavorites(req, res, next) {
    const id = req.query.dishId
    handleDbParam(xcxDb.deleteFavoritesDb, req, res, id)
}

// 获取收藏列表
function favorites(req, res, next) {
    handleDbList(xcxDb.favoritesDb, req, res)
}

// 领取优惠券
function receiveCoupons(req, res, next) {
    const openid = getOpenid(req)
    const couponId = req.body.couponId
    xcxDb.receiveCouponsDb(openid, couponId).then(resolve => {
        res.send({ status: 0, messages: resolve })
    }).catch(err => {
        if (err == '优惠已被领取完') {
            res.send({ status: 1, messages: err })
        } else if (err == '领取次数已达上限，请勿重复领取') {
            res.send({ status: 1, messages: err })
        } else {
            res.send({ status: -1, messages: '领取失败' })
        }
    })
}

// 获取用户优惠券
function customerscoupons(req, res, next) {
    handleDbParam(xcxDb.customerscouponsDb, req, res)
}

// 加入购物车
function addCart(req, res, next) {
    const dishId = req.body.dishId
    handleDbParam(xcxDb.addCartDb, req, res, dishId)
}

// 查询购物车商品数量
function cartquantity(req, res, next) {
    handleDbParam(xcxDb.cartquantityDb, req, res)
}

// 获取购物车商品
function cart(req, res, next) {
    handleDbList(xcxDb.cartDb, req, res)
}

// 选择商品
function isSelectCart(req, res, next) {
    const { isSelect, cartId } = req.body
    handleDbParam(xcxDb.isSelectCartDb, req, res, { isSelect, cartId })
}

// 设置全选
function cartSelectAll(req, res, next) {
    const { selectAll } = req.query
    handleDbParam(xcxDb.cartSelectAllDb, req, res, selectAll)
}

// 购物车移除商品
function cartDelete(req, res, next) {
    const { cartId } = req.query
    handleDbParam(xcxDb.cartDeleteDb, req, res, cartId)
}

// 增加商品数量
function cartPlus(req, res, next) {
    const cartId = req.query.cartId
    handleDbParam(xcxDb.cartPlusDb, req, res, cartId)
}

// 减少商品数量
function cartMinus(req, res, next) {
    const cartId = req.query.cartId
    handleDbParam(xcxDb.cartMinusDb, req, res, cartId)
}

// 更改商品数量
function cartQuantity(req, res, next) {
    const { cartId, quantity } = req.body
    handleDbParam(xcxDb.cartQuantityDb, req, res, { cartId, quantity })
}

// 获取已选择购物车商品
function cartSelect(req, res, next) {
    handleDbList(xcxDb.cartSelectDb, req, res)
}

// 获取默认地址
function addressPay(req, res, next) {
    handleDbParam(xcxDb.addressPayDb, req, res)
}

// 提交订单
function orderAdd(req, res, next) {
    const { orderTime, totalAmount, userAddressId, customerscouponId, createTime } = req.body
    handleDbParam(xcxDb.orderAddDb, req, res, { orderTime, totalAmount, userAddressId, customerscouponId, createTime })
}

// 提交订单详情
function orderDetailAdd(req, res, next) {
    const { orderId, dishes, customerCouponId, sourceId } = req.body
    handleDbParam(xcxDb.orderDetailAddDb, req, res, { orderId, dishes, customerCouponId, sourceId })
}

// 获取订单
function order(req, res, next) {
    const openid = getOpenid(req)
    const status = req.query.status
    xcxDb.orderDb(openid, status).then(resolve => {
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
                    status: resolve.status,
                    totalAmount: resolve.totalAmount,
                    isComment: resolve.isComment,
                    dishes: []
                };
            }
            acc[orderId].dishes.push({
                dishId: resolve.dishId,
                dishName: resolve.name,
                imageUrl: resolve.imageUrl[0]
            });
            return acc;
        }, {});
        res.send({ status: 0, messages: Object.values(result) })
    }).catch(err => {
        res.send({ status: -1, messages: err })
    })
}

// 获取订单详情
function orderDetail(req, res, next) {
    const orderId = req.query.orderId
    const openid = getOpenid(req)
    xcxDb.orderDetailDb(openid, orderId).then(resolve => {
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
                    status: resolve.status,
                    totalAmount: resolve.totalAmount,
                    dishes: [],
                    address: {
                        userName: resolve.addressName,
                        useraddress: resolve.address,
                        userdetailAddress: resolve.detailAddress,
                        userphone: resolve.phoneNumber
                    }
                };
            }
            acc[orderId].dishes.push({
                dishId: resolve.dishId,
                dishName: resolve.name,
                imageUrl: resolve.imageUrl[0],
                price: resolve.price,
                quantity: resolve.quantity
            });
            return acc;
        }, {});
        res.send({ status: 0, messages: Object.values(result) })
    }).catch(err => {
        res.send({ status: -1, messages: err })
    })
}

// 取消订单
function cancelOrder(req, res, next) {
    const orderId = req.query.orderId
    handleDbParam(xcxDb.cancelOrderDb, req, res, orderId)
}

// 完成订单
function completeOrder(req, res, next) {
    const orderId = req.query.orderId
    handleDbParam(xcxDb.completeOrderDb, req, res, orderId)
}

// 获取评价页面订单信息
function orderRate(req, res, next) {
    const orderId = req.query.orderId
    const openid = getOpenid(req)
    xcxDb.orderRateDb(openid, orderId).then(resolve => {
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
                    dishes: [],
                };
            }
            acc[orderId].dishes.push({
                dishId: resolve.dishId,
                dishName: resolve.name,
                imageUrl: resolve.imageUrl[0],
                category: resolve.category
            });
            return acc;
        }, {});
        res.send({ status: 0, messages: Object.values(result) })
    }).catch(err => {
        res.send({ status: -1, messages: err })
    })

}

// 评价图片上传
function uploadRateImg(req, res, next) {
    const imgUrl = req.files[0].path.replace(/\\/g, '/').replace('public', 'http://127.0.0.1:3000/')
    res.send(imgUrl)
}

// 发表评论
function uploadRate(req, res, next) {
    const orderRate = req.body.orderRate
    console.log(orderRate)
    handleDbParam(xcxDb.uploadRateDb, req, res, orderRate)
}

// 获取评论
function getRate(req, res, next) {
    const orderId = req.query.orderId
    const openid = getOpenid(req)
    xcxDb.getRateDb(openid, orderId).then(resolve => {
        resolve.forEach(item => {
            item.imageUrl = item.imageUrl.split(',')
            item.commentImgUrl = item.commentImgUrl.split(',')[0] == '' ? [] : item.commentImgUrl.split(',')
            item.category = item.category.split('、')
            item.averageRating = item.averageRating.toFixed(1)
        })
        const result = resolve.reduce((acc, resolve) => {
            const orderId = resolve.orderId;
            if (!acc[orderId]) {
                acc[orderId] = {
                    orderId: orderId,
                    time: resolve.createTime,
                    dishes: [],
                };
            }
            acc[orderId].dishes.push({
                dishId: resolve.dishId,
                dishName: resolve.name,
                imageUrl: resolve.imageUrl[0],
                category: resolve.category,
                comment: resolve.commentText,
                rateImg: resolve.commentImgUrl,
                rate: resolve.rate
            });
            return acc;
        }, {});
        res.send({ status: 0, messages: Object.values(result) })
    }).catch(err => {
        res.send({ status: -1, messages: err })
    })
}

// 获取菜品评论
function shopRate(req, res, next) {
    const dishId = req.query.dishId
    xcxDb.shopRateDb(dishId).then(resolve => {
        resolve.forEach(item => {
            item.commentImgUrl = item.commentImgUrl.split(',')[0] == '' ? [] : item.commentImgUrl.split(',')
        })
        const results = []
        resolve.forEach(item => {
            results.push({
                time:item.createtime,
                imgUrl:item.commentImgUrl,
                comment:item.commentText,
                rate:item.rate,
                userAvatar:item.userAvatar,
                userName:item.userName
            })
        })
        res.send({ status: 0, messages: results })
    }).catch(err => {
        res.send({ status: -1, messages: err })
    })
}

// 注销账号
function logout(req,res,next) {
    handleDbParam(xcxDb.logoutDb,req,res)
}

module.exports = {
    swiper,
    hotdishes,
    dishDetail,
    dishes,
    search,
    coupon,
    verify,
    register,
    avatarupload,
    myself,
    myselfEdit,
    addAddress,
    address,
    addressDefault,
    addressDetail,
    addressEdit,
    addressDelete,
    favoritesDetail,
    addFavorites,
    deleteFavorites,
    favorites,
    receiveCoupons,
    customerscoupons,
    addCart,
    cartquantity,
    cart,
    isSelectCart,
    cartSelectAll,
    cartDelete,
    cartPlus,
    cartMinus,
    cartQuantity,
    cartSelect,
    addressPay,
    orderAdd,
    orderDetailAdd,
    order,
    orderDetail,
    cancelOrder,
    completeOrder,
    orderRate,
    uploadRateImg,
    uploadRate,
    getRate,
    shopRate,
    logout
}