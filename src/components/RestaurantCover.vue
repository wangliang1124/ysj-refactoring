<template>
  <div class="restaurant-cover">
    <div class="cover">
      <img src="../assets/img/8.jpg" class="img">
    </div>
    <div class="text">
      <h1 class="title">测试测试</h1>
      <div class="desc">享受价值99元主厨定制菜</div>
      <div class="info">
        <span>人均</span><span>日本菜</span><span>18.9km</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'RestaurantCover',

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
          font-dpr(10px)
          color: rgb(147,153,159)
</style>