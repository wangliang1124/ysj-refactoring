<template>
  <div class="restaurant-detail">
    <div class="content-wrapper">
      <div class="image-header">
        <!-- <div class="back" @click="hide"> <i class="icon-arrow_lift"></i> </div> -->
        <swiper :imageList="imgList"></swiper>
      </div>
      <div class="info-wrapper">
        <h1 class="title">{{restaurant.title}}</h1>
        <div class="info">
          <span>人均：￥{{restaurant.price}}</span><span>{{restaurant.cuisine}}</span><span>{{restaurant.district}}</span><span>{{restaurant.distance}}km</span>
        </div>
        <div class="contact">
          <span class="address">地址：{{restaurant.address}}</span><br>
          <span class="tel">电话： {{restaurant.tel}}</span>
        </div>
<!--         <div class="icons">
          <ul class="icon-list">
            <li class="icon-item" v-for="i in restaurant.icons">
              <i class="icon" :class="i.icon"></i>
              <div class="title">{{i.title}}</div>
            </li>
          </ul>
        </div> -->
        <!-- <div class="rule" v-html="rule"></div> -->
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
      <div class="rule">
        <div class="title">使用须知</div>
        <p class="text" v-html="rule"></p>
      </div>
      <split></split>
      <div class="chef-wrapper">
 <!--        <div class="avatar"> -->
          <h2 class="title">主厨介绍</h2>
          <div class="avatar">
            <img :src="restaurant.chefAvatar">
            <h3 class="name">{{restaurant.chefName}}</h3>
          </div>
          <div class="like"></div>
          <p class="intro">{{restaurant.chefIntro}}</p>
        <!-- </div> -->
      </div>
      <div class="rank"></div>
      <div class="notice"></div>
      <split></split>
      <div class="super">
        <a :href="superRestaurant" class="link">超级食探</a>
      </div>
      <split></split>
      <div class="detail-wrapper">
        <div class="title">餐厅详情</div>
        <p class="detail" v-html="detail"></p>
      </div>
      <!-- <div class="rule" v-html="rule"></div> -->
      <!-- <div class="detail" v-html="detail"> -->
      </div>
      <div class="recommend"></div>
    </div>
  </div>
</template>
<script>
  import Swiper from 'components/Swiper'
  import Split from 'components/Split'
  import api from 'utils/api'

  export default {
    name: 'RestaurantList',
    props: {
      restaurantList: {
        type: Array,
      },
    },
    components: {
      Swiper,
      Split,
    },
    data() {
      return {
        list: [],
        restaurant: {},
        imgList: [],
        detail: {},
        rule: '',
        superRestaurant: '',
        // detailStyle: '',
      }
    },
    watch: {
      restaurantList() {
        console.log(this.restaurantList[2].icons)
        this.restaurant = this.restaurantList.find(item =>
          item.id === parseInt(this.$route.params.id, 10))
        this.imgList = this.restaurant.photos
      },
    },
    computed: {
      detailStyle() {
        return {
          lineHeight: 2,
          textAlign: 'center',
          color: 'rgb(77, 85, 93)',
        }
      },
    },
    created() {
      this.init()
    },
    methods: {
      async init() {
        const res = await api.get(`/specialty/${this.$route.params.id}`)
        this.detail = res.data.content_markdown_url
        this.rule = res.data.rule_markdown_url
        this.superRestaurant = res.data.shika_markdown_url || res.data.shitan_markdown_url
        console.log('=========初始化数据=======')
      },
    },
  }
</script>
<style lang="stylus">
  @import '../assets/stylus/mixin.styl'
  
  .restaurant-detail
    .content-wrapper
      .info-wrapper
        padding: 20px
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
      .icons
          margin: 20px 20px
          .icon-list
            display: flex
            justify-content: space-between
            .icon-item
              flex: 0 0 auto
              display: inline-block
              text-align: center
              .icon
                font-dpr(18px)
                color: rgb(147,153,159)
              .title
                font-dpr(8px)
                // font-weight: 300
                color: rgb(147,153,159)
      .rule
        padding: 0 20px
        .title
          margin-top: 20px
          line-height: 14px
          font-dpr(14px)
          color: rgb(7, 17, 27)
        .text
          margin-top: 20px
          padding: 6px 8px 0 8px
          line-height: 2
          font-dpr(12px)
          color: rgb(147,153,159)
      .chef-wrapper
        padding: 0 20px
        .title
          margin-top: 20px
          line-height: 14px
          font-dpr(14px)
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
          color: rgb(77, 85, 93)
      .super
        padding: 20px
        .link
          display: block
          font-dpr(14px)
          color: rgb(7, 17, 27)
      .detail-wrapper
        margin: 20px
        overflow: hidden
        .title
          margin-top: 20px
          line-height: 14px
          font-dpr(14px)
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
              font-weight: 700
          img
            width: 100%
</style>
