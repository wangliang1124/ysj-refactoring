<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script type="text/javascript">
  import wx from 'utils/wx'
  // import api from 'utils/api'

  export default {
    name: 'app',
    data() {
      return {
        // restaurantList: [],
        // filter: {
        //   scene_id: '',
        //   other_id: '',
        //   cuisine_id: '',
        //   district_id: '',
        //   city_id: '',
        //   orderby: 'updated_at', // orderby: 'created_at',
        //   page: 1,
        //   per_page: 30, // 10->30 一次请求30个，然后多次加载
        //   order: 'desc', //  order: 'asc',
        //   q: '',
        //   location: '', // 用户定位信息
        //   filter: '',
        // },
      }
    },
    created() {
      console.log('===========App created================')
      // this.initData()
      wx.initWx()
      wx.getLocation()
    },
    methods: {
      // async initData() {
      //   // const area = await api.get('/area')
      //   // this.region = area.data.map(item => item.city)

      //   // const banners = await api.get(`/banner?intro=${this.currentLocation}`)
      //   // this.banners = banners.data.rows

      //   const specialty = await api.get('/specialty', { params: this.filter })
      //   console.log(specialty)
      //   console.log('================app-初始化餐厅数据===================')
      //   this.restaurantList = specialty.data.rows.map(item => ({
      //     cover: item.cover,
      //     title: item.restaurant.name,
      //     desc: item.intro,
      //     price: item.restaurant.unit_average,
      //     // distance: this.getDistance(item.restaurant.location_x, item.restaurant.location_y),
      //     cuisine: item.restaurant.restaurant_cuisine.cuisine,
      //     updatedAt: item.updated_at,
      //   }))
      //   console.log(this.restaurantList.sort((a, b) => b.price - a.price))
      //   // eslint-disbale-next-line
      //   // console.log(this.restaurantList)
      // },
    },
  }
</script>

<style type="text/css" lang="stylus">
  #app 
    background-color: #fff
</style>
