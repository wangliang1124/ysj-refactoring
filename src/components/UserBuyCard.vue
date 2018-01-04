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
    <span class="select"><svg class="icon icon-ok" :class="{active: selected}"><use xlink:href="#icon-ok"></use></svg></span>
    <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <symbol id="icon-ok" viewBox="0 0 39 32">
          <title>ok</title>
          <path class="path1" d="M14.084 20.656l-7.845-9.282c-1.288-1.482-3.534-1.639-5.016-0.351s-1.639 3.534-0.351 5.016l10.697 12.306c1.451 1.669 4.057 1.623 5.448-0.096l18.168-22.456c1.235-1.527 0.999-3.765-0.528-5.001s-3.765-0.999-5.001 0.528l-15.573 19.337z"></path>
        </symbol>
      </defs>
    </svg>
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
        font-dpr(12px)
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
      .icon-ok
        width: 100%
        height: 100%
        fill: #fff
        &.active
          fill: rgb(240,20,20)

</style>
