<template>
  <div class="restaurant-detail">
    <div class="content-wrapper">
      <div class="image-header">
        <!-- <router-link to="/"> <i class="iconfont icon-arrow-right"></i></router-link> -->
        <span class="back" @click="back"><i class="iconfont icon-arrow-right"></i></span>
        <swiper :imageList="imgList"></swiper>
      </div>
      <div class="info-wrapper">
        <h1 class="title">{{restaurant.title}}</h1>
        <div class="info">
          <span>人均：￥{{restaurant.price}}</span><span>{{restaurant.cuisine}}</span><span>{{restaurant.district}}</span><span v-if="restaurant.distance">{{restaurant.distance}}km</span>
        </div>
        <div class="contact">
          <span class="address">地址：{{restaurant.address}}</span><br>
          <a class="tel" :href="'tel:' + restaurant.tel">电话：{{restaurant.tel}}</a>
        </div>
      </div>
      <split></split>
      <div class="icons">
        <ul class="icon-list">
          <li class="icon-item" v-for="i in restaurant.icons">
            <i class="icon" :class="i.icon"></i>
            <div class="title">{{i.title}}</div>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="use-rule">
        <div class="title">玥享卡使用须知</div>
        <p class="text" v-html="useRule"></p>
      </div>
      <split></split>
      <div class="chef-wrapper">
        <h2 class="title">主厨介绍</h2>
        <div class="avatar">
          <img :src="restaurant.chefAvatar">
          <h3 class="name">{{restaurant.chefName}}</h3>
        </div>
        <div class="like"></div>
        <p class="intro">{{restaurant.chefIntro}}</p>
      </div>
      <div class="rank"></div>
      <div class="notice"></div>
      <split></split>
      <div class="ranking">
        <span class="item"><a href="/ranklist/cook">主厨排名&nbsp;&nbsp; {{this.chefIndex}}</a></span>
        <span class="item"><a href="/ranklist/month">餐厅月排名&nbsp;&nbsp; {{this.monthIndex}}</a></span>
        <span class="item"><a href="/ranklist/total">餐厅总排名&nbsp;&nbsp; {{this.totalIndex}}</a></span>
      </div>
      <split></split>
      <template  v-if="chefTalk">
        <div class="chef-talk">
          <a :href="chefTalk" class="link">超级食探</a>
        </div>
        <split></split>
      </template>
      <div class="detail-wrapper">
        <h2 class="title">餐厅详情</h2>
        <div class="detail" v-html="detail"></div>
      </div>
      </div>
      <div class="guess" v-if="recommendRestaurants.length">
        <div class="guess-title">
          <span class="line"></span><span class="text">猜你喜欢</span><span class="line"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Swiper from 'components/Swiper'
  import Split from 'components/Split'
  import api from 'utils/api'

  export default {
    name: 'RestaurantList',
    // props: {
    //   restaurantList: {
    //     type: Array,
    //   },
    // },
    components: {
      Swiper,
      Split,
    },
    data() {
      return {
        restaurant: {},
        recommendRestaurants: [],
        imgList: [],
        detail: {},
        useRule: '',
        chefTalk: '',
      }
    },
    updated() {
      const { restaurantList } = this.$store.getters
      this.restaurant = restaurantList.find(item => item.id === parseInt(this.$route.params.id, 10))
      this.imgList = this.restaurant.photos
      // if (this.restaurant.recommendID) {
      //   this.recommendRestaurants = restaurantList.filter((item) => {
      //     const arr = JSON.parse(this.restaurant.recommendID)
      //     for (let i = 0; i < arr.length; i += 1) {
      //       if (item.id === arr[i]) {
      //         return true
      //       }
      //     }
      //     return false
      //   })
      // }

      // },
    },
    // computed: {
    //   detailStyle() {
    //     return {
    //       lineHeight: 2,
    //       textAlign: 'center',
    //       color: 'rgb(77, 85, 93)',
    //     }
    //   },
    // },
    created() {
      this.init()
    },
    methods: {
      async init() {
        const res = await api.get(`/specialty/${this.$route.params.id}`)
        this.detail = res.data.content_markdown_url
        this.useRule = res.data.rule_markdown_url
        this.chefTalk = res.data.shika_markdown_url || res.data.shitan_markdown_url
        console.log('=========初始化数据=======')
      },
      back() {
        this.$router.back()
      },
    },
  }
</script>
<style lang="stylus">
  @import '../assets/stylus/mixin.styl'
  
  .restaurant-detail
    .content-wrapper
      .image-header
        position: relative
        .router-link-active, .back
          position: absolute
          top: 24px
          left: 18px
          z-index: 1
          padding: 6px
          .icon-arrow-right
            display: inline-block
            font-dpr(18px)
            color: #fff
            font-weight: 900
            transform: rotate(180deg)
      .info-wrapper
        padding: 12px 24px
        line-height: 1.5
        .title
          line-height: 1
          font-dpr(14px)
          font-weight: 700
          text-align: center
          color: rgb(7, 17, 27)
        .info
          margin-top: 40px
          display: flex
          justify-content: space-between
          span
            flex: 1
            // text-align: center
            // margin-right: 10px
            // border: 1px solid rgba(7, 17, 27, 0.1)
            color: rgb(147,153,159)
        .contact
          margin-top: 20px
          color: rgb(147,153,159)
          .tel
            text-decoration: none
      .icons
          padding: 12px 24px
          .icon-list
            display: flex
            justify-content: space-between
            .icon-item
              flex: 0 0 auto
              display: inline-block
              text-align: center
              .icon
                font-dpr(24px)
                color: rgb(147,153,159)
              .title
                font-dpr(8px)
                font-weight: 200
                color: rgb(147,153,159)
      .use-rule
        padding: 12px 24px
        .title
          margin-top: 20px
          line-height: 14px
          font-dpr(14px)
          font-weight: 700
          color: rgb(7, 17, 27)
        .text
          margin-top: 20px
          padding: 6px 8px 0 8px
          line-height: 2
          font-dpr(12px)
          color: rgb(147,153,159)
      .chef-wrapper
        padding: 12px 24px
        .title
          margin-top: 20px
          line-height: 14px
          font-dpr(14px)
          font-weight: 700
          color: rgb(7, 17, 27)
        .avatar
          margin-top: 20px
          text-align: center
          font-size: 0
          img
            width: 200px
            height: 200px
            border-radius: 50%
          .name
            margin-top: 20px
            text-align: center
            font-dpr(12px)
            color: rgb(147,153,159)
        .intro
          margin-top: 20px
          padding: 6px 8px 0 8px
          line-height: 2
          font-dpr(12px)
          color: rgb(147,153,159)
      .ranking 
        display: flex
        margin: 0 24px
      .ranking .item 
        flex: 1
        margin: 20px 0
        text-align: left
        color: rgb(147,153,159)
        border-right: 1px solid rgba(7, 17, 27, 0.1)
      .ranking .item:nth-child(2) 
        text-align: center
      .ranking .item:last-child
        border-right: 0
        text-align: right
      .chef-talk
        padding: 12px 24px
        .link
          display: block
          font-dpr(14px)
          font-weight: 700
          color: rgb(7, 17, 27)
      .detail-wrapper
        margin: 20px
        overflow: hidden
        .title
          margin-top: 20px
          line-height: 14px
          font-dpr(14px)
          font-weight: 700
          color: rgb(7, 17, 27)
        .detail
          padding: 6px 8px 0 8px
          line-height: 2
          color: rgb(147,153,159)
          .ql-align-center
            .ql-size-large
              display: block
              font-dpr(14px)
              text-align: center
              color: rgb(7, 17, 27)
            em
              color: rgb(7, 17, 27)
              font-weight: 700
          img
            width: 100%
      .guess
        .guess-title
          display: flex
          // margin: 28px 0 24px 0
          // text-align: center
          .line
            flex: 1
            display: inline-block
            // position: relative
            // top: -8px
            // border-bottom: 1px solid rgba(255, 255, 255, 0.2)
          .text
            margin: 0 10px
            font-dpr(16px)
</style>
