<template>
  <div class="home">
    <div class="home-wrapper">
      <div class="header">
        <span class="location" @click="showCity">
          <span>{{currentCity}}</span><i class="iconfont icon-arrow-down"></i>
          <ul class="city-list" v-show="cityShow">
            <li class="city" v-for="(city,index) in cities" @click.stop="selectCity(index)">{{city}}</li>
          </ul>
        </span>
        <span class="search-wrapper">
          <i class="iconfont icon-search"></i>
          <input type="input" class="search-input" placeholder="search">
        </span>
        <span class="personal">
          <i class="iconfont icon-user"></i>
        </span>
      </div>
      <div class="slider">
          <ul>
            <li v-for="item in banners" class="item" :class="{active: isShowBanner}">
              <img :src="item.url" class="img">
            </li>
          </ul>
          <!-- <span class="button">点击购买</span> -->
          <span class="dot"></span>
      </div>
      <div class="content-wrapper">
        <div class="tabs">
          <ul class="tab-list">
            <li class="tab-item"><router-link :to="{path:'/'}">综合排序</router-link></li>
            <li class="tab-item"><router-link :to="{path:'/list/2'}">好评优先</router-link></li>
            <li class="tab-item"><router-link :to="{path:'/list/3'}">距离最近</router-link></li>
            <li class="tab-item"><router-link :to="{path:'/list/4'}">筛 选</router-link></li>
          </ul>
        </div>
        <div class="content">
          <!-- <restaurant-list :restaurantList="restaurantList"></restaurant-list> -->
          <router-view :restaurantList="restaurantList"></router-view>
        </div>
      </div>
      <div class="footer">
        <div class="sticky"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import RestaurantList from 'components/RestaurantList'
  import api from 'utils/api'
  import util from 'utils/location'
  // import wx from 'utils/wx'

  export default {
    name: 'Home',
    components: {
      RestaurantList,
    },
    data() {
      return {
        currentCity: '北京',
        cities: ['北京', '上海'],
        cityShow: false,
        banners: [],
        isShowBanner: true,
        currentLocation: '北京',
        restaurantList: [],
        list: [],
        filter: {
          scene_id: '',
          other_id: '',
          cuisine_id: '',
          district_id: '',
          city_id: '',
          orderby: 'updated_at', // orderby: 'created_at',
          page: 1,
          per_page: 50, // 10->30 一次请求30个，然后多次加载
          order: 'desc', //  order: 'asc',
          q: '',
          location: '', // 用户定位信息
          filter: '',
        },
        loadingNum: 4, // 每次加载数量
      }
    },
    computed: {
      // 按价格排序
      listOrderByPrice() {
        // const list = this.restaurantList.concat() // 复制array，避免引用
        return this.restaurantList.sort((a, b) => b.price - a.price)
      },
      // 距离
      listOrderByDistance() {
        // const list = this.restaurantList.concat()
        return this.restaurantListlist.sort((a, b) => a.distance - b.distance)
      },
    },
    beforeRouteUpdate(to, from, next) {
      // console.log(to, from)
      const id = parseInt(to.params.id, 10)
      console.log('=====测试mounted=====' + id)
      // console.log(to.params)
      switch (id) {
        case 'NaN':
          this.restaurantList.sort((a, b) => b.updatedAt - a.updatedAt)
          break
        case 2:
          this.restaurantList.sort((a, b) => b.price - a.price)
          break
        case 3:
          this.restaurantList.sort((a, b) => a.distance - b.distance)
          break
        default:
          this.restaurantList.sort((a, b) => b.updatedAt - a.updatedAt)
      }
      next()
    },
    created() {
      console.log('===========Home created================')
      this.initData()
    },
    methods: {
      async initData() {
        try {
          const area = await api.get('/area')
          this.cities = area.data.map(item => item.city)

          const banners = await api.get(`/banner?intro=${this.currentLocation}`)
          this.banners = banners.data.rows
          console.log(this.banners)

          const specialty = await api.get('/specialty')
          if (specialty) {
            console.log('================首页-初始化餐厅数据===================')
            // console.log(specialty.data.rows)
            this.restaurantList = specialty.data.rows.map(item => ({
              cover: item.cover,
              title: item.restaurant.name,
              desc: item.name,
              price: item.restaurant.unit_average,
              distance: this.getDistance(item.restaurant.location_x, item.restaurant.location_y),
              cuisine: item.restaurant.restaurant_cuisine.cuisine,
              updatedAt: item.updated_at,
            }))
          }
          console.log(this.restaurantList)
        } catch (err) {
          console.log(`初始化餐厅数据错误${err.message}`)
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
      showCity() {
        this.cityShow = !this.cityShow
      },
      selectCity(index) {
        this.currentCity = this.cities[index]
        this.cityShow = false
      },
      showBanner() {
        setTimeout(() => {
          // this.banners.show = false
        }, 1000)
      },
      // locate() { // 定位
      //   const self = this
      //   wxConfig.getLocation(list, (res, currentPlace) => {
      //     const minPlace = res
      //     this.filter.location = `${currentPlace.longitude},${currentPlace.latitude}`;
      //     if (!locationId || `${minPlace.id}` !== `${locationId}`) {
      //       const { id, city } = minPlace;
      //       this.$vux.confirm.show({
      //         title: `定位您在${city}附近`,
      //         content: '是否切换到该城市进行搜索',
      //         onConfirm() {
      //           // localStorage.setItem('current_location', id);
      //           self.choosePlace(id)
      //         },
      //       })
      //     }
      //   })
      // },
    },
  }

</script>
<style lang="stylus" scoped>
  @import '../assets/stylus/mixin.styl'
  .home
    .home-wrapper
      width: 100%
      .header
        position: relative
        display: flex
        height: 96px
        line-height: 96px
        padding: 8px 16px
        font-size: 0
        text-align: center
        // background: rgba(7, 17, 27, 0.2)
        .location
          flex: 0 0 120px
          width: 120px
          // align-self: center
          font-dpr(12px)
          .icon-arrow-down
            margin-left: 4px
            vertical-align: middle
            font-dpr(20px)
            color: rgba(7, 17, 27, 0.5)
        .city-list
          position: absolute
          display: flex
          flex-flow: column nowrap
          z-index: 10
          top: 80px
          left: 0
          width: 120px
          margin-left: 4px
          border-radius: 4px
          .city
            flex: 1
            border-bottom: 1px solid rgba(7, 17, 27, 0.1)
            background-color: #f3f5f7
            &:last-child
              border-bottom: 0
        .search-wrapper
          position: relative
          display: flex
          flex: 1
          align-self: center
          height: 60px
          border: 1px solid rgba(7, 17, 27, 0.1)
          border-radius: 10px
          font-dpr(14px)
          .icon-search
            flex: 0 0 60px
            width: 60px
            align-self: center
            // left: 20px
            // top: 10px
            font-dpr(20px)
            color: rgba(7, 17, 27, 0.3)
          .search-input
            flex: 1
            align-self: center
            padding: 0 10px
            border: 0 
            // border-radius: 10px
            // box-shadow: 2px 2px 2px rgba(7, 17, 27, 0.1)
            font-size: 24px
            // text-align: center
            outline: 0
        .personal
          flex: 0 0 60px
          width: 60px
          align-self: center
          margin: 0 20px
          .icon-user
            font-dpr(16px)
            font-weight: 700
            color: rgba(7, 17, 27, 0.5)
      .slider
        position: relative
        font-size: 0
        .item
          // display: none
          position: relative
          width: 100%
          height: 0
          padding-top: 56.25% /*黑魔法*/
          .img
            position: absolute
            top: 0
            bottom: 0
            width: 100%
            height: 100%
          .dot
            display: inline-block
            position: absolute
            right: 20px
            bottom: 20px
            width: 12px
            height: 12px
            border-radius: 50%
            background-color: #fff
          &.active
            display: block
      .content-wrapper
        .tabs
          .tab-list
            display: flex
            height: 80px
            line-height: 80px
            border-bottom: 1px solid rgba(7, 17, 27, 0.1)
            .tab-item
              flex: 1
              // align-self: center
              text-align: center
              a
                display: block
                color: rgb(77, 85, 93)
                &.router-link-exact-active
                  color: rgb(240, 20, 20)
        .content
          padding: 18px

</style>
