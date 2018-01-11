<template>
  <div id="app">
    <router-view :restaurantList="restaurantList"></router-view>
  </div>
</template>
<script type="text/javascript">
  import wx from 'utils/wx'
  import api from 'utils/api'
  import util from 'utils/location'

  export default {
    name: 'app',
    data() {
      return {
        restaurantList: [],
      }
    },
    created() {
      console.log('===========App created================')
      this.initData()
      wx.initWx()
      wx.getLocation()
    },
    methods: {
      async initData() {
        try {
          const specialty = await api.get('/specialty')
          console.log('================app-初始化餐厅数据===================')

          console.log(specialty)
          if (specialty) {
            console.log('================首页-初始化餐厅数据===================')
            console.log(specialty.data.rows)
            this.restaurantList = specialty.data.rows.map(item => ({
              id: item.id,
              cover: item.cover,
              photos: item.restaurant.restaurant_imgs,
              title: item.restaurant.name,
              desc: item.name,
              price: item.restaurant.unit_average,
              distance: this.getDistance(item.restaurant.location_x, item.restaurant.location_y),
              cuisine: item.restaurant.restaurant_cuisine.cuisine,
              address: item.restaurant.address,
              district: item.restaurant.restaurant_district.district,
              tel: item.restaurant.tel,
              icons: this.iconMap(JSON.parse(item.restaurant.icons)),
              value: item.value,
              chefAvatar: item.cook_avatar,
              chefName: item.cook_name,
              chefIntro: item.cook_intro,
              updatedAt: item.updated_at,
            }))
          }
        } catch (err) {
          console.log(err.message)
        }
      },
      getDistance(loX, loY) {
        const location = JSON.parse(window.localStorage.getItem('location'))
        if (location) {
          const { latitude: lat, longitude: lng } = location
          return Math.round(util.getDistance(loY, loX, lat, lng) / 100) / 10
        }
        return '未知'
      },
      iconMap(icons) {
        const r = icons.map((i) => {
          switch (i) {
            case '待客泊车':
              return { title: i, icon: 'iconfont icon-oVysciLwD' }
            case '可带宠物':
              return { title: i, icon: 'iconfont icon-vPCHseaFi' }
            case '地铁附近':
              return { title: i, icon: 'iconfont icon-zFOmztGDo' }
            case '调酒吧台':
              return { title: i, icon: 'iconfont icon-xvFpiJrWX' }
            case '无线网络':
              return { title: i, icon: 'iconfont icon-shWTwrAEe' }
            case '有宝宝座':
              return { title: i, icon: 'iconfont icon-jSQeuJJX' }
            case '家庭聚会':
              return { title: i, icon: 'iconfont icon-RikPEBC' }
            case '升级包厢':
              return { title: i, icon: 'iconfont icon-iCAgknQ' }
            case '残疾人设施':
              return { title: i, icon: 'iconfont icon-IDdBCGitF' }
            case '观景露台':
              return { title: i, icon: 'iconfont icon-hhVBdtvF' }
            case '情侣约会':
              return { title: i, icon: 'iconfont icon-dFgpwBF' }
            case '停泊车位':
              return { title: i, icon: 'iconfont icon-UXeeuJPSuc' }
            case '商务宴席':
              return { title: i, icon: 'iconfont icon-LPaRCxiMw' }
            case '周末Brunch':
              return { title: i, icon: 'iconfont icon-DgrxzcJgS' }
            case '免费隐藏菜':
              return { title: i, icon: 'iconfont icon-GIKjR' }
            case '朋友聚会':
              return { title: i, icon: 'iconfont icon-aUIbgI' }
            case '玥享推荐':
              return { title: i, icon: 'iconfont icon-IKsuHWPb' }
            case '西式餐饮':
              return { title: i, icon: 'iconfont icon-UnBIjqLcy' }
            case '日本料理':
              return { title: i, icon: 'iconfont icon-wcfNVkazu' }
            case '中式餐饮':
              return { title: i, icon: 'iconfont icon-lqiLwkFL' }
            case '下午茶':
              return { title: i, icon: 'iconfont icon-wWzUEGHJu' }
            default:
              break
          }
          return i
        })
        // console.log(r)
        return r
      },
    },
  }
</script>

<style type="text/css" lang="stylus">
  #app 
    background-color: #fff
</style>
