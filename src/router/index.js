import Vue from 'vue'
import Router from 'vue-router'
import cookie from 'cookiejs'
import { signIn, oAuth, handleOldCode } from 'utils/utils'
import Home from 'components/Home'
import RestaurantList from 'components/RestaurantList'
import FlexibleTest from 'components/FlexibleTest'

const RestaurantDetail = () => import('components/RestaurantDetail')
const User = () => import('components/User')
const UserDefault = () => import('components/UserDefault')
const UserBuy = () => import('components/UserBuy')
const UserMyCard = () => import('components/UserMyCard')
const UserOrder = () => import('components/UserOrder')
const UserCoupon = () => import('components/UserCoupon')
const UserShare = () => import('components/UserShare')
const UserFavorite = () => import('components/UserFavorite')
const AboutUs = () => import('components/AboutUs')


Vue.use(Router)
const routes = [
  {
    path: '/',
    component: Home,
    // name: 'home',
    meta: {
      title: 'HOME',
      requiresAuth: false,
    },
    children: [
      {
        path: '',
        component: RestaurantList,
        meta: {
          title: 'HOME',
        },
      },
      {
        path: 'list/:id',
        name: 'list',
        component: RestaurantList,
      },
    ],
  },
  {
    path: '/detail/:id',
    component: RestaurantDetail,
    meta: {
      title: '餐厅详情',
    },
  },
  {
    path: '/user',
    component: User,
    children: [
      {
        path: '',
        component: UserDefault,
        name: 'userDefault',
        meta: {
          title: '个人中心',
          requiresAuth: true,
        },
      },
      {
        path: '/card',
        component: UserBuy,
        name: 'userBuy',
        meta: {
          title: '购买会员',
        },
      },
      {
        path: 'mycard',
        component: UserMyCard,
        name: 'userMyCard',
        meta: {
          title: '我的玥享卡',
        },
      },
      {
        path: 'order',
        component: UserOrder,
        name: 'userOrder',
        meta: {
          title: '我的订单',
        },
      },
      {
        path: 'coupon',
        component: UserCoupon,
        name: 'userCoupon',
        meta: {
          title: '玥享卷',
        },
      },
      {
        path: 'share',
        component: UserShare,
        name: 'userShare',
        meta: {
          title: '邀请好友',
        },
      },
      {
        path: 'favorite',
        component: UserFavorite,
        name: 'userFavorite',
        meta: {
          title: '我的收藏',
        },
      },
      {
        path: '/aboutUs',
        component: AboutUs,
        name: 'aboutUs',
        meta: {
          title: '关于我们',
        },
      },
    ],
  },
  {
    path: '/flexibletest',
    component: FlexibleTest,
    name: 'flexibleTest',
  },
]
const router = new Router({
  mode: 'history',
  routes,
})

router.beforeEach(async (to, from, next) => {
  // const { code, inviter_id } = to.query
  if (to.meta.requiresAuth && !cookie('token')) { // 如果需要授权并且还没有登陆
    const { code } = to.query
    handleOldCode(code)
    // if (code && code.length <= 17) { // 把老二维码url查询参数中的code字符串替换为actCode
    //   const url = window.location.href.replace('code', 'actCode')
    //   window.location.replace(url)
    // }
    if (code) { // 是否已经获取微信授权code，如果获取则登陆
      signIn(code)
      document.title = to.meta.title
      next()
    } else { // 否则去获取授权
      oAuth()
    }
  } else { // 否则直接进入页面
    document.title = to.meta.title
    next()
  }
})

export default router

