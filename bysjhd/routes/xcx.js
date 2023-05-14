var express = require('express');
var router = express.Router();
var xcxRouter = require('../util/xcx/xcxRouter')
const { avatarupload, rateImgupload } = require('../util/upload/xcxupload')

/* GET users listing. */
// 首页轮播和热门菜品
router.get('/swiper', xcxRouter.swiper)
router.get('/hotdishes', xcxRouter.hotdishes)

// 菜品
router.get('/dishes', xcxRouter.dishes)
router.get('/dishDetail', xcxRouter.dishDetail)

// 搜索页面
router.get('/search', xcxRouter.search)

// 优惠券页面
router.get('/coupon', xcxRouter.coupon)
router.post('/receiveCoupons', xcxRouter.receiveCoupons)
router.get('/customerscoupons', xcxRouter.customerscoupons)

// 登陆注册功能
router.post('/verify', xcxRouter.verify)
router.post('/avatarupload', avatarupload.array('avatarImg'), xcxRouter.avatarupload)
router.post('/register', xcxRouter.register)

// 我的页面
router.get('/myself', xcxRouter.myself)
router.post('/myselfEdit', xcxRouter.myselfEdit)

// 地址页面
router.get('/address', xcxRouter.address)
router.post('/addAddress', xcxRouter.addAddress)
router.get('/adressDefault', xcxRouter.addressDefault)
router.get('/addressDetail', xcxRouter.addressDetail)
router.post('/addressEdit', xcxRouter.addressEdit)
router.delete('/addressDelete', xcxRouter.addressDelete)


// 收藏页面
router.get('/favorites', xcxRouter.favorites)
router.get('/favoritesDetail', xcxRouter.favoritesDetail)
router.post('/favorites', xcxRouter.addFavorites)
router.delete('/favorites', xcxRouter.deleteFavorites)

// 购物车
router.get('/cart', xcxRouter.cart)
router.delete('/cart', xcxRouter.cartDelete)
router.post('/addCart', xcxRouter.addCart)
router.get('/cartquantity', xcxRouter.cartquantity)
router.post('/isSelectCart', xcxRouter.isSelectCart)
router.get('/cartSelectAll', xcxRouter.cartSelectAll)
router.get('/cartPlus', xcxRouter.cartPlus)
router.get('/cartMinus', xcxRouter.cartMinus)
router.post('/cartQuantity', xcxRouter.cartQuantity)

// 支付页面
router.get('/cartSelect', xcxRouter.cartSelect)
router.get('/addressPay', xcxRouter.addressPay)
router.post('/orderAdd', xcxRouter.orderAdd)
router.post('/orderDetailAdd', xcxRouter.orderDetailAdd)

// 订单页面
router.get('/order', xcxRouter.order)
router.get('/orderDetail', xcxRouter.orderDetail)
router.get('/cancelOrder', xcxRouter.cancelOrder)
router.get('/completeOrder', xcxRouter.completeOrder)

// 评价页面
router.get('/orderRate', xcxRouter.orderRate)
router.post('/uploadRateImg', rateImgupload.array('rateImg'), xcxRouter.uploadRateImg)
router.post('/uploadRate',xcxRouter.uploadRate)
router.get('/getRate',xcxRouter.getRate)
router.get('/shopRate',xcxRouter.shopRate)

// 注销账号
router.get('/logout',xcxRouter.logout)

module.exports = router;
