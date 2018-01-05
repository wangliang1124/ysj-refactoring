<template>
  <div class="card">
    <!-- <img src="../assets/img/logo@3x.jpg" class="photo"> -->
    <div class="content">
      <div class="name">{{card.name}}</div>
      <p class="desc">{{card.intro}}</p>
      <div>
        <span class="price">￥{{card.price_unit}}/张</span>
        <span class="old-price" v-if="!!card.oldPrice">￥{{card.oldPrice}}</span>
      </div>
    </div>
    <span class="select"><input type="checkbox" class="check" v-show="selected" checked="selected"></span>
  </div>
</template>
<script>
export default {
  name: 'UserBuyCard',
  props: {
    card: {
      type: Object,
    },
    selected: {
      type: Boolean,
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
  
  .card
    display: flex
    .photo
      flex: 0 0 100px
      width: 100px
      height: 100px
      align-self: center
      margin-right: 20px
    .content
      flex: 1
      align-self: center
      position: relative
      // margin-left: 40px
      line-height: 2
      .name
        margin-top: 8px            
        font-dpr(14px)
        font-weight: 700
        color: rgb(7,17,27)
      .desc
        margin-rgiht: 10px
        font-dpr(10px)
        color: rgb(147,153,159)
      .price
        font-weight: 700
        color: rgb(240,20,20)
    .select
      flex: 0 0 36px
      align-self: center
      display: inline-block
      width: 36px
      height: 36px
      // padding: 4px
      // border: 1px solid rgba(7, 17, 27, 0.5)
      // border-radius: 50%
      .check
        width: 100%
        height: 100%
        color: rgb(240,20,20)
</style>
