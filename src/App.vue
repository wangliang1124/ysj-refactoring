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
            // console.log(specialty.data.rows)
            this.restaurantList = specialty.data.rows.map(item => ({
              id: item.id,
              title: item.restaurant.name,
              desc: item.name,
              price: item.restaurant.unit_average,
              distance: this.getDistance(item.restaurant.location_x, item.restaurant.location_y),
              cuisine: item.restaurant.restaurant_cuisine.cuisine,
              cover: item.cover,
              photos: item.restaurant.restaurant_imgs,
              address: item.restaurant.address,
              district: item.restaurant.restaurant_district.district,
              tags: JSON.parse(item.restaurant.icons),
              chefName: item.cook_name,
              chefIntro: item.cook_intro,
              chefAvatar: item.cook_avatar,
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
    },
  }
</script>

<style type="text/css" lang="stylus">
  #app 
    background-color: #fff
</style>
