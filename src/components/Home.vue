<template>
  <div class="home">
    <div class="home-wrapper">
      <div class="header-wrapper">
        <div class="header">
          <span class="location" @click="showCity">
            <span>{{currentCity}}</span><i class="iconfont icon-arrow-down"></i>
          </span>
          <span class="search-wrapper" @click="showSearch">
            <i class="iconfont icon-search"></i>
            <input type="input" class="search-input" placeholder="search">
          </span>
          <span class="personal">
            <router-link to="/user"><i class="iconfont icon-user"></i></router-link>
          </span>
        </div>
        <transition name="drop">
          <ul class="city-list" v-show="cityShow">
            <li class="city-item" v-for="(item,index) in cityList" @click.stop="selectCity(index)">
              <span class="city" :class="{current: index===currentIndex }">{{item.city}}</span>
            </li>
          </ul>
        </transition>
        <div class="mask" v-show="cityShow" @click="hideCityList"></div>
      </div>
      <router-link to="/card">
        <swiper :imageList="bannerList"></swiper>
      </router-link>
      <div class="content-wrapper">
        <div class="tabs">
          <ul class="tab-list">
            <li class="tab-item"><router-link class="router-link" :to="{path:'/'}">综合排序</router-link></li>
            <li class="tab-item"><router-link class="router-link" :to="{path:'/list/2'}">好评优先</router-link></li>
            <li class="tab-item"><router-link class="router-link" :to="{path:'/list/3'}">距离最近</router-link></li>
            <li class="tab-item"><router-link class="router-link" :to="{path:'/custom'}">筛选</router-link></li>
            <li class="tab-item"><router-link class="router-link new" :to="{path:'/goods'}">优品</router-link></li>
          </ul>
        </div>
        <div class="content">
          <div v-if="restaurantList.length === 0" class="loading">
            <img src="../assets/img/loading.gif" width="54" height="54">
          </div>
          <!-- <restaurant-list :restaurantList="restaurantList"></restaurant-list> -->
          <router-view :restaurantList="restaurantList"></router-view>
        </div>
      </div>
      <div class="locate-city" v-show="locateShow">
        <div class="content">
          <h2 class="title">定位您在<em style="color:rgb(240,20,20)">{{currentLocation.city}}</em>附近</h2>
          <span class="text">是否切换到该城市进行搜索</span>
        </div>
        <div class="btn-wrapper">
          <span class="btn" @click="locateShow=false">取消</span><span class="btn current" @click="confirmLocate">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  // import RestaurantList from 'components/RestaurantList'
  import Swiper from 'components/Swiper'
  // import Search from 'components/Search'
  import api from 'utils/api'
  import distance from 'utils/distance'

  export default {
    name: 'Home',
    components: {
      // RestaurantList,
      Swiper,
      // Search,
    },
    data() {
      return {
        currentCity: '北京',
        cityList: [],
        cityShow: false,
        currentIndex: 0,
        searchShow: false,
        bannerList: [],
        isShowBanner: true,
        currentLocation: '北京',
        locateShow: false,
      }
    },
    computed: {
      restaurantList() {
        return this.$store.getters.restaurantList // filter(item => item.city === this.currentCity)
      },
    },
    created() {
      console.log('============Home created================')
      this.initData()
    },
    beforeRouteUpdate(to, from, next) {
      const { id } = to.params
      console.log('=====beforeRouteUpdate=====' + id)
      // console.log(to.params)
      switch (id) {
        case '2':
          this.restaurantList.sort((a, b) => b.price - a.price)
          break
        case '3':
          this.restaurantList.sort((a, b) => a.distance - b.distance)
          break
        default:
          this.restaurantList.sort((a, b) => b.updatedAt - a.updatedAt)
      }
      next()
    },
    methods: {
      async initData() {
        try {
          const area = await api.get('/area')
          this.cityList = area.data // area.data.map(item => item.city)

          const banners = await api.get('/banner')
          this.bannerList = banners.data.rows
        } catch (err) {
          console.log(`初始化数据错误:${err.message}`)
        }
        // 初始化城市数据
        const curCity = window.localStorage.getItem('currentCity')
        if (curCity) { this.currentCity = curCity }
        this.currentIndex = this.cityList.findIndex(item => item.city === this.currentCity)
        // 定位当前所在城市
        this.locateCurrentCity(this.cityList)
      },
      locateCurrentCity(cityList) {
        let minDis = 0
        let city = {}
        const coord = this.$store.getters.coordinates
        cityList.forEach((item) => { // 获取当前最近城市
          // eslint-disable-next-line
          const dis = distance.getDistance(item.location_x, item.location_y, coord.latitude, coord.longitude)
          if (dis <= minDis || minDis === 0) { minDis = dis; city = item }
        })
        this.currentLocation = city
        if (this.currentLocation.city !== this.currentCity) {
          this.locateShow = true
        }
      },
      confirmLocate() {
        this.locateShow = false
        this.currentCity = this.currentLocation.city
        window.localStorage.setItem('currentCity', this.currentCity)
      },
      showCity() {
        this.cityShow = !this.cityShow
      },
      hideCityList() {
        this.cityShow = false
      },
      selectCity(index) {
        console.log(this.cityList[index])
        this.currentCity = this.cityList[index].city
        window.localStorage.setItem('currentCity', this.currentCity)
        this.cityShow = false
        this.currentIndex = index
      },
      showSearch() {
        this.$router.push({ path: '/search' })
      },
    },
  }
</script>
<style lang="stylus" scoped>
  @import '../assets/stylus/mixin.styl'
  .home
    .home-wrapper
      width: 100%
      .header-wrapper
        .header
          position: relative
          display: flex
          z-index: 5
          height: 96px
          line-height: 96px
          padding: 8px 16px
          font-size: 0
          text-align: center
          background: #fff
          .location
            position: relative
            flex: 0 0 120px
            width: 120px
            // align-self: center
            font-dpr(12px)
            .icon-arrow-down
              margin-left: 4px
              vertical-align: middle
              font-dpr(20px)
              color: rgba(7, 17, 27, 0.5)
          .search-wrapper
            position: relative
            display: flex
            flex: 1
            align-self: center
            height: 60px
            border: 1px solid rgba(7, 17, 27, 0.1)
            border-radius: 4px
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
        .city-list
          position: absolute
          z-index: 3
          display: flex
          top: 96px
          left: 0
          width: 100%
          line-height: 98px
          text-align: center
          border-radius: 4px
          &.drop-enter-active, &.drop-leave-active
            transition: all .4s ease
          &.drop-enter, &.drop-leave-to
            opacity: 0
            transform: translateY(-100%)
          .city-item
            flex-grow: 1
            flex-shrink: 1
            flex-basis: auto
            background-color: #fff
            .city
              display: inline-block
              line-height: 2
              padding: 4px 60px
              border: 1px solid rgba(7, 17, 27, 0.1)
              &.current
                border: 1px solid rgb(240, 20, 20)
                color: rgb(240, 20, 20)
        .mask
          position: fixed
          top: 0
          left: 0
          z-index: 1
          width: 100%
          height: 100%
          backdrop-filter: blur(10px)
          background-color: rgba(7, 17, 27, 0.6)
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
              .router-link
                position: relative
                display: block
                text-decoration: none
                color: rgb(77, 85, 93)
                &.new:after
                  position: absolute
                  top: -18px
                  right: 12px
                  content: 'new'  
                  color: rgb(240, 20, 20)
                  font-dpr(10px)
                  font-style: italic
                &.router-link-exact-active
                  color: rgb(240, 20, 20)
        .content
          padding: 18px
          .loading
            text-align: center
            line-height: 2
            font-dpr(16px)
      .locate-city
        position: fixed
        top: 50%
        left: 50%
        width: 80%
        // height: 25%
        text-align: center
        transform: translate(-50%, -50%)
        border-radius: 4px
        background: #fff
        .content
          padding: 24px 48px 60px 48px 
          line-height: 2 
          .title
            font-dpr(14px)
          .text
            color: rgb(147, 153, 159)
        .btn-wrapper
          width: 100%
          line-height: 80px
          border-top: 1px solid rgba(7, 17, 27, 0.1)
          .btn
            display: inline-block
            width: 49%
            &.btn:first-child
              border-right: 1px solid rgba(7, 17, 27, 0.1)
            &.current
              color: rgb(240, 20, 20)
</style>
