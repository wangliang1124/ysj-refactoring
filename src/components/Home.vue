<template>
  <div class="home">
    <div class="home-wrapper">
      <div class="header">
        <span class="location">
          <span>北京</span><i class="iconfont icon-arrow-down"></i>
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
          <img src="../assets/img/北京.jpg" class="img" alt="">
          <!-- <span class="button">点击购买</span> -->
          <span class="dot"></span>
      </div>
      <div class="content-wrapper">
        <div class="tabs">
          <span class="tab-item current">综合排序</span>
          <span class="tab-item">好评优先</span>
          <span class="tab-item">距离最近</span>
          <span class="tab-item">筛选</span>
        </div>
        <div class="content">
          <ul class="restaurant-list">
            <li class="restaurant-item">
              <restaurant-cover></restaurant-cover>
            </li>
            <div class="split"></div>
            <li class="restaurant-item">
              <restaurant-cover></restaurant-cover>
            </li>
            <li class="restaurant-item">
              <restaurant-cover></restaurant-cover>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer">
        <div class="sticky"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import RestaurantCover from 'components/RestaurantCover'
  import api from 'utils/api'
  import wx from 'utils/wx'

  export default {
    name: 'Home',
    components: {
      RestaurantCover,
    },
    data() {
      return {
        region: ['北京', '上海'],
        banners: [],
        currentLocation: '北京',
        restaurantList: [],
        filter: {
          scene_id: '',
          other_id: '',
          cuisine_id: '',
          district_id: '',
          city_id: '',
          orderby: 'updated_at', // orderby: 'created_at',
          page: 1,
          per_page: 30, // 10->30 一次请求30个，然后多次加载
          order: 'desc', //  order: 'asc',
          q: '',
          location: '', // 用户定位信息
          filter: '',
        },
        loadingNum: 4, // 每次加载数量
      }
    },
    computed: {
      // 最新
      // orderByTime() {

      // },
      // 按价格排序
      listOrderByPrice() {
        return this.restaurantList.sort((a, b) => a.price - b.price)
      },
      // 距离
      // orderByDistance
      // 自定义筛选
      // orderByCustom
    },
    created() {
      console.log('===========created================')
      wx.initWx()
      // wx.getLocation()
      this.initData()
      this.getDistance()
    },
    methods: {
      async initData() {
        const area = await api.get('/area')
        this.region = area.data.map(item => item.city)

        const banners = await api.get(`/banner?intro=${this.currentLocation}`)
        this.banners = banners.data.rows

        const specialty = await api.get('/specialty', { params: this.filter })
        console.log(specialty)
        console.log('================首页-初始化餐厅数据===================')
        this.restaurantList = specialty.data.rows.map(item => ({
          cover: item.cover,
          title: item.restaurant.name,
          desc: item.intro,
          price: item.restaurant.unit_average,
          // distance: this.getDistance(item.restaurant.location_x, item.restaurant.location_y),
          cuisine: item.restaurant.restaurant_cuisine.cuisine,
          updatedAt: item.updated_at,
        }))
        console.log(this.restaurantList.sort((a, b) => b.price - a.price))
        // eslint-disbale-next-line
        // console.log(this.restaurantList)
      },
      getDistance(loX, loY) {
        // const { locationX: loX, locationY: loY } = { locationX, locationY }
        const location = JSON.parse(window.localStorage.getItem('location'))
        console.log(location)
        if (location) {
          const { lat, lng } = location
          console.log(lat, lng)
          if (!loY || !lat) {
            return '未知'
          }
          // return `${(Number(util.getDistance(loY, loX, lat, lng)) / 1000).toFixed(2)}km`
        }

        /**
        wxconfig.getLocation([], (res, location) => {
          const { latitude, longitude } = location;
          console.log(latitude, longitude);
          return `${(Number(util.getDistance(loY, loX, latitude, longitude)) / 1000).toFixed(2)}km`;
        });
        */
        return ''
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
        display: flex
        height: 96px
        line-height: 96px
        margin: 8px 16px
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
        .img
          width: 100%
        .dot
          display: inline-block
          position: absolute
          right: 20px
          bottom: 20px
          width: 12px
          height: 12px
          border-radius: 50%
          background-color: #fff
      .content-wrapper
        .tabs
          display: flex
          height: 80px
          line-height: 80px
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
          .tab-item
            flex: 1
            // align-self: center
            text-align: center
            &.current
              // border-bottom: 2px solid rgb(147,153,159); /*no*/
              font-weight: 700
              color: rgb(240,20,20)
        .content
          padding: 18px
          // background-color: #ccc
          .restaurant-list
            display: flex
            flex-flow: row wrap
            font-size: 0
            .restaurant-item
              flex: 0 0 49%
              width: 49%
              margin-bottom: 20px
            .split
              flex: 0 0 2%
              width: 2%
</style>
