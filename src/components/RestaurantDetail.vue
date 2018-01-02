<template>
  <div class="restaurant-detail">
    <div class="content-wrapper">
      <div class="image-header">
        <!-- <div class="back" @click="hide"> <i class="icon-arrow_lift"></i> </div> -->
        <swiper :imageList="imgList"></swiper>
      </div>
      <div class="info-wrapper">
        <h1 class="title"></h1>
        <div class="info">
          <span>人均￥{{restaurant.price}}</span><span>{{restaurant.cuisine}}</span><span>{{restaurant.distance}}km</span>
        </div>
        <div class="contact">
          <span class="address">{{restaurant.address}}</span><span class="tel"></span>
        </div>
      </div>
      <div class="chef-wrapper">
        <div class="tag"></div>
        <div class="avatar">
          <div class="img"><img :src="restaurant.chefAvatar"></div>
          <h2 class="name">{{restaurant.chefName}}</h2>
          <div class="like"></div>
        </div>
        <div class="rank"></div>
        <div class="intro">{{restaurant.chefIntro}}</div>
      </div>
      <div class="introduction">
        
      </div>
      <div class="recommend"></div>
    </div>
  </div>
</template>
<script>
import Swiper from 'components/Swiper'

export default {
  name: 'RestaurantList',
  props: {
    restaurantList: {
      type: Array,
    },
  },
  components: {
    Swiper,
  },
  data() {
    return {
      restaurant: {},
      imgList: [{
        url: '../assets/img/8.jpg',
      }],
    }
  },
  computed: {
    // imgList() {
    //   return this.restaurantList[this.$route.params.id].photos
    // },
  },
  // beforeRouteUpdate(to, from, next) {
  //   console.log('999999999900ssss99999')
  //   this.restaurant = this.restaurantList[this.$route.params.id]
  //   this.imgList = this.restaurantList[this.$route.params.id].photos
  //   next()
  // },
  watch: {
    restaurantList() {
      console.log(this.restaurantList)
      this.restaurant = this.restaurantList[this.$route.params.id]
      this.imgList = this.restaurantList[this.$route.params.id].photos
    },
  },
}

</script>
<style lang="stylus" scoped>
  .restaurant-detail
    background-color: #cc0
</style>
