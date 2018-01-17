<template>
  <div class="cartcontrol">
    <transition name="move">
      <span class="reduce iconfont icon-removecircleoutline" v-if="goods.count>0" @click.stop="reduce"></span>
    </transition>
    <span class="count"  v-if="goods.count>0">{{goods.count}}</span>
    <span class="add iconfont icon-addcircle" @click.stop="add"></span>
  </div>
</template>
<script>
  /* eslint-disable */
  export default {
    name: 'CartControl',
    props: {
      goods: {
        type: Object,
        default: {
          count: 0,
        },
      },
    },
    methods: {
      /* eslint no-underscore-dangle: 0 */
      add(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.goods.count) {
          this.$set(this.goods, 'count', 1);
        } else {
          this.goods.count += 1;
          console.log('--------click--------');
        }
      },
      reduce(event) {
        if (!event._constructed) {
          return;
        }
        if (this.goods.count > 0) {
          this.goods.count -= 1;
        }
      },
    },
  };
</script>
<style lang="stylus">
  @import '../assets/stylus/mixin.styl'
  
  .cartcontrol
    font-size: 0
    .reduce, .add
      display: inline-block
      vertical-align: middle
      padding: 12px
      font-dpr(24px)
      color: rgb(0, 160, 220)
      background-color: #fff
    .move-enter-active, .move-leave-active
      transition: all 0.4s ease
      transform: rotate(180deg)
    .move-enter, .move-leave-to
      opacity: 0
      transform: translate(20px, 0)
    .count
      display: inline-block
      margin: 0 12px
      vertical-align: middle
      font-dpr(12px)
      color: rgb(147, 153, 159)
</style>

