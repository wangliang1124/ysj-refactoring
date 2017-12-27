<template>
  <div class="restaurant-cover">
    <div class="cover">
      <img :src="restaurant.cover" class="img">
    </div>
    <div class="text">
      <h1 class="title">{{restaurant.title}}</h1>
      <div class="desc">{{restaurant.desc}}</div>
      <div class="info">
        <span>人均￥{{restaurant.price}}</span><span>{{restaurant.cuisine}}</span><span>{{restaurant.distance}}km</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'RestaurantCover',
  props: {
    restaurant: {
      type: Object,
    },
  },
  data() {
    return {

    }
  },
}
</script>

<style lang="stylus" scoped>
  @import '../assets/stylus/mixin.styl'
  
  .restaurant-cover
    .cover
      position: relative
      width: 100%
      height: 0
      padding-top: 134% /*黑魔法*/
      // background: url("../assets/img/8.jpg") 
      // background-size:cover
      .img
        position: absolute
        top: 0
        bottom: 0
        width: 100%
        height: 100%
    .text
      font-size: 0
      line-height:1.5
      .title
        font-dpr(14px)
        font-weight: 700
        color: rgb(7,17,27)
      .desc
        font-dpr(10px)
        color: rgb(147,153,159)
      .info
        span
          margin-right: 10px
          font-dpr(10px)
          color: rgb(147,153,159)
</style>