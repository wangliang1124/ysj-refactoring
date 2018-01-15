<template>
  <div class="restaurant-cover">
    <div class="cover">
      <router-link :to="{ name: 'detail', params: {id: restaurant.id}}">
        <img :src="restaurant.cover" class="img">
      </router-link>
    </div>
    <div class="text">
      <h1 class="title">{{restaurant.title}}</h1>
      <div class="desc">享受价值 <em class="value">¥{{restaurant.value}}元</em>{{restaurant.type}}服务</div>
      <!-- <div class="desc">{{restaurant.desc}}</div> -->
      <div class="info">
        <span>人均￥{{restaurant.price}}</span><span>{{restaurant.cuisine}}</span><span v-if="restaurant.distance">{{restaurant.distance}}km</span>
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
        object-fit: cover /*裁剪超出比例部分，防止图片变形*/
    .text
      font-size: 0
      line-height:1.5
      .title
        font-dpr(14px)
        font-weight: 200
        color: rgb(7,17,27)
      .desc
        font-dpr(10px)
        font-weight: 200
        color: rgb(147,153,159)
        .value
          color: #550055
          font-weight: 700
      .info
        span
          margin-right: 10px
          padding: 0px 4px
          font-dpr(10px)
          font-weight: 200
          color: #fff
          border-radius: 2px
          background: #550055
</style>