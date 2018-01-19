// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import fastclick from 'fastclick'
import AlloyFinger from 'alloyfinger'
import AlloyFingerVue from 'alloyfinger/vue/alloy_finger.vue'
import App from './App'
import router from './router'
import store from './vuex'

fastclick.attach(document.body) // 解决移动端点击事件200ms延迟

require('./assets/fonts/iconfont.css')
// require('./assets/stylus/mixin.styl')

Vue.config.productionTip = false

Vue.use(AlloyFingerVue, { AlloyFinger }) // 引入alloyfinger手势库

console.log('======main=======' + Date.now())
/* eslint-disable no-new */

// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App },
// })

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
