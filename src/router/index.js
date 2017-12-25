import Vue from 'vue'
import Router from 'vue-router'
import cookie from 'cookiejs'
import HelloWorld from 'components/HelloWorld'
import Home from 'components/Home'
import FlexibleTest from 'components/FlexibleTest'

Vue.use(Router)
const routes = [
  {
    path: '/',
    component: Home,
    name: 'home',
    meta: {
      title: 'HOME',
    },
    beforeEnter(to, from, next) { console.log('==========home route========'); next() },
  },
  {
    path: '/hello',
    component: HelloWorld,
    name: 'hello',
    meta: {
      title: 'hello',
    },
    beforeEnter(to, from, next) {
      console.log('=================测试e===================')
      console.log(HelloWorld)
      next()
    },
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
  console.log(to, from)
  console.log(to.matched)
  const isAuth = !!cookie('token')
  // const host = location.search;
  const { code, inviter_id } = to.query
  // const { requireAuth = false, isAuth } = router
  if (isAuth) {
    next()
    return
  }
  if (code) {
    console.log()
  }
})

export default router
