import * as types from '../../mutation-types'
import lazyLoading from './lazyLoading'
// import charts from './charts'
// import uifeatures from './uifeatures'
// import components from './components'
import users from './users'

// show: meta.label -> name
// name: component name
// meta.label: display label

const state = {
  items: [
    users,
    {
      name: '平台Banner列表',
      path: '/banner',
      meta: {
        label: 'Banner管理',
        auth: true,
        icon: 'fa-photo',
        link: 'banner/banner.vue'
      },
      component: lazyLoading('banner/banner')
    },
    {
      name: '激活码列表',
      path: '/activation',
      meta: {
        label: '激活码管理',
        auth: true,
        icon: 'fa-qrcode',
        link: 'activation/ActivationList.vue'
      },
      component: lazyLoading('activation/ActivationList')
    },
    {
      name: '平台消息列表',
      path: '/news',
      meta: {
        label: '平台消息管理',
        icon: 'fa-bell',
        link: 'news/NewsList.vue'
      },
      component: lazyLoading('news/NewsList')
    },
    {
      name: '平台尊享卡',
      path: '/card',
      meta: {
        label: '尊享卡管理',
        icon: 'fa-credit-card',
        link: 'card/CardList.vue'
      },
      component: lazyLoading('card/CardList')
    },
    {
      name: '系统业务开通城市管理',
      path: '/area',
      meta: {
        label: '开通城市',
        icon: 'fa-globe',
        link: 'area/AreaList.vue'
      },
      component: lazyLoading('area/AreaList')
    },
    {
      name: '调整系统参数',
      path: '/system',
      meta: {
        label: '系统参数',
        icon: 'fa-cogs',
        link: 'system/System.vue'
      },
      component: lazyLoading('system/System')
    },
    {
      name: '查询平台订单',
      path: '/order',
      meta: {
        label: '订单管理',
        icon: 'fa-first-order',
        link: 'order/OrderList.vue'
      },
      component: lazyLoading('order/OrderList')
    },
    {
      name: '查询平台团购订单',
      path: '/group',
      meta: {
        label: '团购订单',
        icon: 'fa-diamond',
        link: 'order/OrderList.vue'
      },
      component: lazyLoading('orderGroup/OrderList')
    },
    {
      name: '平台入住商户',
      path: '/restaurant',
      meta: {
        label: '商户管理',
        icon: 'fa-cutlery',
        link: 'restatrant/RestaurantList.vue'
      },
      component: lazyLoading('restatrant/RestaurantList')
    },
    {
      name: '平台商圈列表',
      path: '/district',
      meta: {
        label: '商圈管理',
        icon: 'fa-square',
        link: 'district/DistrictList.vue'
      },
      component: lazyLoading('district/DistrictList')
    },
    {
      name: '平台菜系列表',
      path: '/cuisine',
      meta: {
        label: '菜系管理',
        icon: 'fa-cc',
        link: 'cuisine/CuisineList.vue'
      },
      component: lazyLoading('cuisine/CuisineList')
    },
    {
      name: '平台场景列表',
      path: '/scene',
      meta: {
        label: '场景管理',
        icon: 'fa-crop',
        link: 'scene/SceneList.vue'
      },
      component: lazyLoading('scene/SceneList')
    },
    {
      name: '平台筛选其他选项',
      path: '/other',
      meta: {
        label: '其他选项',
        icon: 'fa-ellipsis-h',
        link: 'other/OtherList.vue'
      },
      component: lazyLoading('other/OtherList')
    },
    {
      name: '用户邀请记录',
      path: '/share',
      meta: {
        label: '邀请记录',
        icon: 'fa-share',
        link: 'invite/InviteList.vue.vue'
      },
      component: lazyLoading('invite/InviteList')
    }
    // charts,
    // uifeatures,
    // components
  ]
}

const mutations = {
  [types.EXPAND_MENU] (state, menuItem) {
    if (menuItem.index > -1) {
      if (state.items[menuItem.index] && state.items[menuItem.index].meta) {
        state.items[menuItem.index].meta.expanded = menuItem.expanded
      }
    } else if (menuItem.item && 'expanded' in menuItem.item.meta) {
      menuItem.item.meta.expanded = menuItem.expanded
    }
  }
}

export default {
  state,
  mutations
}
