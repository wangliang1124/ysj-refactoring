import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'
import NProgress from 'vue-nprogress'
import VueQuillEditor from 'vue-quill-editor'
import { sync } from 'vuex-router-sync'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './filters'
import { TOGGLE_SIDEBAR } from 'vuex-store/mutation-types'
import { ImageImport } from './lib/imageImport'
import { ImageResize } from './lib/imageResize'

const instance = axios.create({
  baseURL: 'http://ysj.tcfellow.com:3000/api/v1', // 使用本地koa web服务 baseURL: 'http://localhost:3000/api/v1'
  timeout: 3000000000
})
Vue.router = router
Vue.use(iView)
Vue.use(VueAxios, instance)
Vue.use(VueAuth, {
  auth: {
    request: function (req, token) {
      req.headers.Authorization = token
    },
    response: function (res, error) {
      if (res.data.data.token) return res.data.data.token
    }
  },
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  loginData: { url: 'http://ysj.tcfellow.com:3000/api/v1/admin/signin', fetchUser: false },
  refreshData: { enabled: false },
  forbiddenRedirect: {path: '/login'},
  authRedirect: {path: '/login'},
  logoutData: {url: '/', method: 'POST', redirect: '/login', makeRequest: false}
})
Vue.use(NProgress)
VueQuillEditor.Quill.register('modules/imageImport', ImageImport)
VueQuillEditor.Quill.register('modules/imageResize', ImageResize)
Vue.use(VueQuillEditor)
// Enable devtools
Vue.config.devtools = true

sync(store, router)

const nprogress = new NProgress({ parent: '.nprogress-container' })

const { state } = store

router.beforeEach((route, redirect, next) => {
  if (state.app.device.isMobile && state.app.sidebar.opened) {
    store.commit(TOGGLE_SIDEBAR, false)
  }
  next()
})
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// map
const app = new Vue({
  router,
  store,
  nprogress,
  ...App
})

app.axios.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response) {
      app.$Notice.config({
        top: 100,
        duration: 3
      })
      app.$Notice.error({
        top: 500,
        title: error.response.data.code,
        desc: error.response.data.message
      })
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          app.$router.push('/login')
        }
      }
    }
  }
)
export { app, router, store }
