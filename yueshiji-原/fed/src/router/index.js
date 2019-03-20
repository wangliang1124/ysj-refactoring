import cookie from 'cookiejs';
import qs from 'qs';
import Vue from 'vue';
import Router from 'vue-router';
import store from '@/vuex';
import Home from '@/pages/home';
import Card from '@/pages/card';
import Person from '@/pages/person';
import Share from '@/pages/share';
import PersonCenter from '@/pages/personCenter';
import MyCard from '@/pages/myCard';
import verify from '@/pages/vipVerify';
import Coupon from '@/pages/coupon';
import ProductDetail from '@/pages/productDetail';
import PersonDetailEdit from '@/pages/person/edit';
import Pay from '@/pages/pay';
import Purchases from '@/pages/purchases';
import Introduction from '@/pages/introduction';
import Collect from '@/pages/collect';
import GroupCard from '@/pages/groupCard';
import Order from '@/pages/order';
import api from '@/utils/api';
import RankList from '@/pages/ranklist/RankList';
import TotalMonth from '@/pages/ranklist/TotalMonth';
import CookTop11 from '@/pages/ranklist/CookTop11';
import GiftCard from '@/pages/card/GiftCard';
// import Test from '@/pages/ranklist/Test';


Vue.use(Router);
window.cookie = cookie;
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requireAuth: true,
        title: '玥享卡',
      },
    },
    {
      path: '/productDetail/:id',
      name: 'productDetail',
      component: ProductDetail,
      meta: {
        requireAuth: true,
        title: '餐厅详情',
      },
    },
    {
      path: '/groupCard',
      name: 'groupCard',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        title: '玥享卡',
      },
      component: GroupCard,
    },
    {
      path: '/pay',
      name: 'pay',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        title: '支付',
      },
      component: Pay,
    },
    {
      path: '/order',
      name: 'order',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        title: '订单',
      },
      component: Order,
    },
    {
      path: '/card',
      name: 'card',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        title: '玥享卡',
      },
      component: Card,
    },
    {
      path: '/share',
      name: 'share',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        title: '我的分享',
      },
      component: Share,
    },
    {
      path: '/person',
      name: 'person',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        title: '个人资料',
      },
      component: Person,
    },
    {
      path: '/personCenter',
      name: 'personCenter',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        title: '个人中心',
      },
      component: PersonCenter,
    },
    {
      path: '/myCard',
      name: 'myCard',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        title: '我的玥享卡',
      },
      component: MyCard,
    },
    {
      path: '/verify',
      name: 'verify',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        title: '会员验证',
      },

      component: verify,
    },
    {
      path: '/coupon',
      name: 'coupon',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        title: '我的优惠券',
      },

      component: Coupon,
    },
    {
      path: '/purchases',
      name: 'purchases',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        title: '消费记录',
      },

      component: Purchases,
    },
    {
      path: '/introduction',
      name: 'introduction',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        title: '关于我们',
      },

      component: Introduction,
    },
    {
      path: '/personDetailEdit/:key',
      name: 'personDetailEdit',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        title: '编辑个人资料',
      },
      component: PersonDetailEdit,
    },
    {
      path: '/collect',
      name: 'collect',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        title: '我的收藏',
      },
      component: Collect,
    },
    {
      path: '/ranklist',
      name: 'ranklist',
      meta: {
        requireAuth: false,
        title: '排行榜',
      },
      component: RankList,
      children: [{
        path: '/ranklist/cook',
        name: 'cook',
        component: CookTop11,
      }, {
        path: '/ranklist/total',
        name: 'total',
        meta: {
          title: '餐厅总排行',
        },
        component: TotalMonth,
      }, {
        path: '/ranklist/month',
        name: 'month',
        meta: {
          title: '餐厅月排行',
        },
        component: TotalMonth,
      }],
      // beforeEnter或者 组件内beforeRouteUpdate
      async beforeEnter(to, from, next) {
        const res = await api.get('/collect/ranklist');
        const res2 = await api.get('/specialty/getcooktop11');
        console.log('=================存储排行榜数据到store===================');
        store.dispatch('setCookTop11', { cookTop11: res2.data });
        store.dispatch('setRankListMonth', { rankListMonth: res.data[1] });
        store.dispatch('setRankListTotal', { rankListTotal: res.data[0] });
        next();
      },
    },
    {
      path: '/card/giftcard',
      name: 'giftcard',
      meta: {
        requireAuth: true,
        title: '礼品卡',
      },
      component: GiftCard,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  router.requireAuth = to.matched.some(record => record.meta.requireAuth);
  router.isAuth = !!cookie('token');
  const host = location.search;
  const arr = host.replace('?', '').split('&');
  const query = arr.reduce((ret, val) => {
    const arr2 = val.split('=');
    if (arr2.length > 1) {
      ret[arr2[0]] = arr2[1];
    }
    return ret;
  }, {});
  const { code, inviter_id } = query;
  const { requireAuth = false, isAuth } = router;
  // 如果页面不需要权限或者已经登录
  if (!requireAuth || isAuth) {
    if (code && code.length <= 17) { // 如果已经验证，扫描老的二维码后用actCode替换code
      const urlStr = location.href.replace('code', 'actCode');
      location.replace(urlStr);
    }
    next();
    return;
  }
  // 把老二维码中的code=字符串替换为actCode= ,然后直接跳转到验证页面
  if (code && code.length <= 17) {
    const urlStr = location.href.replace('code', 'actCode');
    // console.log(`测试1 + ${tmpStr}`);
    const args = {
      appid: 'wxfc34b0cedd6ce73f',
      state: 'appwx',
      backurl: urlStr,
    };
    const u = `http://ysj.tcfellow.com/static/auth.html?${qs.stringify(args)}`;
    location.replace(u);
  }
  // 登录逻辑
  if (code) {
    try {
      const res = await api.post('/user/signin', {
        code,
        inviter_id,
      });
      store.dispatch('setUser', res.data);
      next();
    } catch (err) {
      if (err.message.startsWith('code has benn used')) {
        const args = {
          appid: 'wx348c69e32f011439',
          state: 'appwx',
          backurl: `${location.href}`,
        };
        const u = `http://ysj.tcfellow.com/static/auth.html?${qs.stringify(args)}`;
        location.replace(u);
      }
    }
  } else {
    const args = {
      appid: 'wxfc34b0cedd6ce73f',
      state: 'appwx',
      backurl: `${location.href}`,
    };
    const u = `http://ysj.tcfellow.com/static/auth.html?${qs.stringify(args)}`;
    location.replace(u);
  }
});
export default router;

