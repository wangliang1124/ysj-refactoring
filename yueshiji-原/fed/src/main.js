import Vue from 'vue';
import FastClick from 'fastclick';
import VueWechatTitle from 'vue-wechat-title';
import VueClipboard from 'vue-clipboard2';
import infiniteScroll from 'vue-infinite-scroll';
import { ConfirmPlugin, AlertPlugin, ToastPlugin } from 'vux';
import AlloyFinger from 'alloyfinger';
import AlloyFingerVue from 'alloyfinger/vue/alloy_finger.vue';
import App from './App';
import router from './router';
import store from './vuex/index';
// import wxconfig from './utils/wx';
import * as filters from './filters';

require('./assets/font/iconfont.css');
require('./assets/css/reset.css');
require('./assets/css/base.styl');   // 引入基本css样式

// wxconfig.initWx();
FastClick.attach(document.body);
Vue.use(ConfirmPlugin);
Vue.use(AlertPlugin);
Vue.use(ToastPlugin);
Vue.use(VueClipboard);
Vue.use(infiniteScroll);
Vue.use(AlloyFingerVue, { AlloyFinger });  // 引入alloyfinger手势库
// // 页面切换动画
// store.registerModule('pageLoading', {
//   state: {
//     isLoading: false,
//   },
//   mutations: {
//     updateLoadingStatus(state, payload) {
//       state.isLoading = payload.isLoading;
//     },
//   },
// });
// router.afterEach(() => {
//   store.commit('updateLoadingStatus', { isLoading: false });
// });
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
Vue.use(VueWechatTitle);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
