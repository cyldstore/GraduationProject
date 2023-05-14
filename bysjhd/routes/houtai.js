// 后台管理页面路由跳转逻辑
var express = require('express');
var router = express.Router();
const houtai = require('../util/houtai/houtairouter')
const { foodsupload,swiperupload } = require('../util/upload/uploadImg')

router.post('/login', houtai.login);

// 菜品页面路由
router.get('/foods',houtai.foods)
router.post('/foodsupload', foodsupload.array('foodsImg'), houtai.upload)
router.post('/foodsAdd',houtai.foodsAdd)
router.post('/foodsEdit',houtai.foodsEdit)
router.delete('/foodsDelete',houtai.foodsDelete)

// 轮播图页面路由
router.get('/swiper',houtai.swiper)
router.post('/swiperupload',swiperupload.array('swiperImg'),houtai.swiperupload)
router.delete('/swiperDelete',houtai.swiperDelete)

// 优惠券页面路由
router.get('/coupon',houtai.coupon)
router.post('/couponAdd',houtai.couponAdd)
router.post('/couponEdit',houtai.couponEdit)
router.delete('/couponDelete',houtai.couponDelete)

// 订单页面
router.get('/orders',houtai.orders)
router.get('/orderAccess',houtai.orderAccess)

// 用户页面
router.get('/customers',houtai.customers)
router.get('/deleteuser',houtai.deleteuser)

// 评论页面
router.get('/getComments',houtai.getComments)
router.get('/deleteComment',houtai.deleteComment)

module.exports = router;
