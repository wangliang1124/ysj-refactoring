import Vue from 'vue'
import Router from 'vue-router'
import cookie from 'cookiejs'
import { signIn, oAuth, handleOldCode } from 'utils/auth'
import Home from 'components/Home'
import RestaurantList from 'components/RestaurantList'
import FlexibleTest from 'components/FlexibleTest'

const Search = () => import('components/Search')
const CustomSearch = () => import('components/CustomSearch')
const RestaurantDetail = () => import('components/RestaurantDetail')
const User = () => import('components/User')
const UserDefault = () => import('components/UserDefault')
const UserDetail = () => import('components/UserDetail')
const UserDetailEdit = () => import('components/UserDetailEdit')
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
          title: 'Home-List-default',
        },
      },
      {
        path: 'list/:id',
        component: RestaurantList,
        meta: {
          title: 'List',
        },
      },
    ],
  },
  {
    path: '/search',
    component: Search,
    meta: {
      title: '搜索',
    },
  },
  {
    path: '/custom',
    component: CustomSearch,
    meta: {
      title: '私人订制',
    },
  },
  {
    path: '/detail/:id',
    name: 'detail',
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
          requiresAuth: false,
        },
      },
      {
        path: 'detail',
        component: UserDetail,
        name: 'userDetail',
        meta: {
          title: '个人资料',
          requiresAuth: true,
        },
      },
      {
        path: 'edit',
        component: UserDetailEdit,
        name: 'userDetailEdit',
        meta: {
          title: '编辑个人资料',
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
          requiresAuth: true,
        },
      },
      {
        path: 'order',
        component: UserOrder,
        name: 'userOrder',
        meta: {
          title: '我的订单',
          requiresAuth: true,
        },
      },
      {
        path: 'coupon',
        component: UserCoupon,
        name: 'userCoupon',
        meta: {
          title: '玥享卷',
          requiresAuth: true,
        },
      },
      {
        path: 'share',
        component: UserShare,
        name: 'userShare',
        meta: {
          title: '邀请好友',
          requiresAuth: true,
        },
      },
      {
        path: 'favorite',
        component: UserFavorite,
        name: 'userFavorite',
        meta: {
          title: '我的收藏',
          requiresAuth: true,
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
  // console.log(cookie('token'))
  console.log('======router===========' + to.query + '===================')
  if (to.meta.requiresAuth && !cookie('token')) { // 如果需要授权并且还没有登陆
    const { code } = to.query
    handleOldCode(code)
    // if (code && code.length <= 17) { // 把老二维码url查询参数中的code字符串替换为actCode
    //   const url = window.location.href.replace('code', 'actCode')
    //   window.location.replace(url)
    // }
    // console.log(code)
    if (code) { // 是否已经获取微信授权code，如果获取则登陆
      signIn(code, next)
      document.title = to.meta.title
    } else { // 否则去获取授权
      oAuth(to)
    }
  } else { // 否则直接进入页面
    document.title = to.meta.title
    next()
  }
})

export default router

