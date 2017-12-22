import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from 'components/HelloWorld'
import Home from 'components/Home'
import FlexibleTest from 'components/FlexibleTest'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'HOME',
      },
      beforeEnter(to, from, next) { console.log('==========home route========'); next() },
    },
    {
      path: '/hello',
      name: 'hello',
      component: HelloWorld,
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
      name: 'flexibleTest',
      component: FlexibleTest,
    },
  ],
})
