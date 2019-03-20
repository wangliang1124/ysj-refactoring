import Vue from 'vue'
import Router from 'vue-router'
import menuModule from 'vuex-store/modules/menu'
import Card from './Card'
import Activation from './Activation'
import Area from './Area'
import News from './News'
import Users from './Users'
import Restaurant from './Restaurant'
import Specialty from './Specialty'
Vue.use(Router)

export default new Router({
  mode: 'history', // Demo is living in GitHub.io, so required!
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: require('../views/Home')
    },
    {
      name: 'Login',
      path: '/login',
      component: require('../views/auth/Login')
    },
    ...generateRoutesFromMenu(menuModule.state.items),
    {
      path: '*',
      redirect: '/'
    },
    ...Card,
    ...Activation,
    ...Area,
    ...News,
    ...Users,
    ...Restaurant,
    ...Specialty
  ]
})
// Menu should have 2 levels.
function generateRoutesFromMenu (menu = [], routes = []) {
  for (let i = 0, l = menu.length; i < l; i++) {
    let item = menu[i]
    if (item.path) {
      item.meta.auth = true
      routes.push(item)
    }
    if (!item.component) {
      generateRoutesFromMenu(item.children, routes)
    }
  }
  return routes
}
