import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import foods from '@/views/foods'
import swiper from '@/views/swiper'
import coupon from '@/views/coupon'
import orders from '@/views/orders'
import users from '@/views/users'
import comments from '@/views/comments'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '后台管理系统'
    }
  },
  {
    path: '/foods',
    name: 'foods',
    component: foods,
    meta: {
      title: '菜品管理'
    }
  },
  {
    path: '/swiper',
    name: 'swiper',
    component: swiper,
    meta: {
      title: '轮播图管理'
    }
  },
  {
    path: '/coupon',
    name: 'coupon',
    component: coupon,
    meta: {
      title: '优惠券管理'
    }
  },
  {
    path: '/orders',
    name: 'orders',
    component: orders,
    meta: {
      title: '订单管理'
    }
  },
  {
    path: '/users',
    name: 'users',
    component: users,
    meta: {
      title: '用户管理'
    }
  },
  {
    path: '/comments',
    name: 'comments',
    component: comments,
    meta: {
      title: '评论管理'
    }
  },
  {
    path: '*',
    redirect: '/foods'
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
