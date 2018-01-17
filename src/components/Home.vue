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
            <li class="city-item" v-for="(city,index) in cityList" @click.stop="selectCity(index)">
              <span class="city" :class="{current: index===currentIndex }">{{city}}</span>
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
            <li class="tab-item"><router-link :to="{path:'/'}">综合排序</router-link></li>
            <li class="tab-item"><router-link :to="{path:'/list/2'}">好评优先</router-link></li>
            <li class="tab-item"><router-link :to="{path:'/list/3'}">距离最近</router-link></li>
            <li class="tab-item"><router-link :to="{path:'/custom'}">筛选</router-link></li>
            <li class="tab-item"><router-link :to="{path:'/goods'}">优品</router-link></li>
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
      <!-- <search></search> -->
    </div>
  </div>
</template>
<script>
  // import RestaurantList from 'components/RestaurantList'
  import Swiper from 'components/Swiper'
  // import Search from 'components/Search'
  import api from 'utils/api'

  // import util from 'utils/location'
  // import wx from 'utils/wx'

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
        cityList: ['北京', '上海'],
        cityShow: false,
        currentIndex: 0,
        searchShow: false,
        bannerList: [],
        isShowBanner: true,
        currentLocation: '北京',
        // restaurantList: [],
        list: [],
        loadingNum: 4, // 每次加载数量
      }
    },
    computed: {
      restaurantList() {
        return this.$store.getters.restaurantList
      },
      listOrderByPrice() { // 按价格排序
        // const list = this.restaurantList.concat() // 复制array，避免引用
        return this.restaurantList.sort((a, b) => b.price - a.price)
      },
      listOrderByDistance() { // 距离
        // const list = this.restaurantList.concat()
        return this.restaurantListlist.sort((a, b) => a.distance - b.distance)
      },
    },
    created() {
      console.log('============Home created================')
      this.initData()
      // this.restaurantList = this.$store.getters.restaurantList
      // console.log(this.restaurantList)
      this.currentCity = window.localStorage.getItem('currentCity')
      this.currentIndex = this.cityList.findIndex(item => item === this.currentCity)
    },
    // updated() {
    //   this.restaurantList = this.$store.getters.restaurantList
    // },
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
          this.cityList = area.data.map(item => item.city)

          const banners = await api.get('/banner')
          this.bannerList = banners.data.rows
        } catch (err) {
          console.log(`初始化数据错误:${err.message}`)
        }
      },
      showCity() {
        this.cityShow = !this.cityShow
      },
      hideCityList() {
        this.cityShow = false
      },
      selectCity(index) {
        this.currentCity = this.cityList[index]
        window.localStorage.setItem('currentCity', this.currentCity)
        this.cityShow = false
        this.currentIndex = index
      },
      showSearch() {
        this.$router.push({ path: '/search' })
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
              a
                display: block
                text-decoration: none
                color: rgb(77, 85, 93)
                &.router-link-exact-active
                  // text-decoration: none
                  color: rgb(240, 20, 20)
        .content
          padding: 18px
</style>
