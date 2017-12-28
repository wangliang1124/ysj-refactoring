<template>
  <div class="swiper">
    <div class="swiper-wrapper"> 
      <transition-group name="move" tag="ul" class="swiper-list"> <!--  <ul class="swiper-list">  v-show="index===currentIndex"  -->
<!--         <transition name="move"> -->
          <li class="swiper-item" v-for="(img,index) in imageList" 
            v-show="index===currentIndex"
            @mouseenter="stop" 
            @mouseleave="" 
            :key="index"
          >
            <img :src="img.url" alt="首页轮播图" class="swiper-img">
          </li>
        <!-- </transition> -->
      </transition-group> <!-- </ul>  -->
      <div class="swiper-dot-wrapper">
        <span class="swiper-dot" v-for="(item,index) in imageList.length" 
          @mouseover="change(index)"
          :class="{active: index===currentIndex}"
        >
        </span>
        <!-- <div class="swiper-point" v-for="i in itemCount" :class="{'highlight': (i - 1) == slideIndex}" @click="slideTo(i - 1)"></div> -->
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Swiper',
  props: {
    imageList: {
      type: Array,
    },
  },
  data() {
    return {
      currentIndex: 0,
      timer: '',
    }
  },
  created() {
    this.$nextTick(() => {
      this.start()
    })
  },
  methods: {
    start() {
      this.timer = setInterval(() => {
        this.autoPlay()
      }, 5000)
    },
    stop() {
      clearInterval(this.timer)
      this.timer = null
    },
    autoPlay() {
      this.currentIndex += 1
      if (this.currentIndex > this.imageList.length - 1) {
        this.currentIndex = 0
      }
    },
    change(index) {
      this.currentIndex = index
    },
  },
}

</script>
<style lang="stylus">
.swiper 
  width: 100%
  font-size: 0
  overflow: hidden
  .swiper-wrapper
    position: relative
    background-color: #ccc
    .swiper-list
      position: relative
      width: 100%
      height: 0
      padding-top: 56.25% /*黑魔法*/
      .swiper-item 
        position: absolute
        display: inline-block
        left:0
        top: 0
        width: 100%
        height: 100%
        .swiper-img 
          position: absolute
          top: 0
          bottom: 0
          width: 100%
          height: 100%
        &.move-enter-active, &.move-leave-active
          transition: all .5s ease
        &.move-enter
          transform: translateX(100%)
        &.move-leave-to
          transform: translateX(-100%)
    .swiper-dot-wrapper
      position: absolute
      right: 20px
      bottom: 20px
      .swiper-dot
        display: inline-block
        margin-left: 20px
        width: 10px
        height: 10px
        border-radius: 50%
        background-color: #fff
        &.active
          background-color: rgb(240, 20, 20)
</style>
