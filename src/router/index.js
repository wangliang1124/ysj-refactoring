import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
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
  ],
})
