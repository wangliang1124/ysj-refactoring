<template>
  <div id="app">
    <!-- <keep-alive> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
  </div>
</template>
<script type="text/javascript">
  import wx from 'utils/wx'
  import api from 'utils/api'
  import distance from 'utils/distance'

  export default {
    name: 'app',
    data() {
      return {
        // restaurantList: [],
      }
    },
    computed: {
      coordinates() {
        return this.$store.getters.coordinates
      },
    },
    created() {
      console.log('===========App created================')
      this.initData()
      wx.initWx()
      wx.getCoordinates()
    },
    methods: {
      async initData() {
        try {
          if (this.$store.getters.restaurantList && this.$store.getters.restaurantList.length) {
            console.log('=================app getter restaurantList===================')
            console.log(this.$store.getters.restaurantList)
            return
          }
          const specialty = await api.get('/specialty')
          console.log('================app-初始化餐厅数据===================')
          if (specialty) {
            console.log(specialty.data.rows)
            const restaurantList = specialty.data.rows.map(item => ({
              id: item.id,
              cover: item.cover,
              photos: item.restaurant.restaurant_imgs,
              title: item.restaurant.name,
              desc: item.name,
              price: item.restaurant.unit_average,
              distance: this.getDistance(item.restaurant.location_x, item.restaurant.location_y),
              district: (item.restaurant.restaurant_district && item.restaurant.restaurant_district.district) || '不限',
              cuisine: (item.restaurant.restaurant_cuisine && item.restaurant.restaurant_cuisine.cuisine) || '不限',
              scene: (item.restaurant.restaurant_scene && item.restaurant.restaurant_scene.scene) || '不限',
              other: (item.restaurant.restaurant_other && item.restaurant.restaurant_other.other) || '不限',
              address: item.restaurant.address,
              tel: item.restaurant.tel,
              icons: this.iconMap(JSON.parse(item.restaurant.icons)),
              value: item.value,
              type: item.type,
              chefAvatar: item.cook_avatar,
              chefName: item.cook_name,
              chefIntro: item.cook_intro,
              recommendId: item.recommend_id,
              updatedAt: item.updated_at,
            }))
            console.log(restaurantList)
            this.$store.dispatch('setRestaurantList', restaurantList)
          }
        } catch (err) {
          console.log(err.message)
        }
      },
      getDistance(loX, loY) {
        // const location = JSON.parse(window.localStorage.getItem('location'))
        // const location = store.getLocation()
        if (this.location) {
          const { latitude: lat, longitude: lng } = this.location
          return Math.round(distance.getDistance(loY, loX, lat, lng) / 100) / 10
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
