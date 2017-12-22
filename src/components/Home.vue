<template>
  <div class="home">
    <div class="home-wrapper">
      <div class="header">
        <span class="location">
          <span>北京</span><i class="iconfont icon-arrow-down"></i>
        </span>
        <span class="search-wrapper">
          <i class="iconfont icon-search"></i>
          <input type="input" class="search-input" placeholder="search">
        </span>
        <span class="personal">
          <i class="iconfont icon-user"></i>
        </span>
      </div>
      <div class="slider">
        <img src="../assets/img/北京.jpg" class="img" alt="">
        <!-- <span class="button">点击购买</span> -->
        <span class="dot"></span>
      </div>
      <div class="content-wrapper">
        <div class="tabs">
          <span class="tab-item">综合排序</span>
          <span class="tab-item">好评优先</span>
          <span class="tab-item">距离最近</span>
          <span class="tab-item">筛选</span>
        </div>
        <div class="content">
          <ul class="restaurant-list">
            <li class="restaurant-item">
              <restaurant-cover></restaurant-cover>
            </li>
            <div class="split"></div>
            <li class="restaurant-item">
              <restaurant-cover></restaurant-cover>
            </li>
            <li class="restaurant-item">
              <restaurant-cover></restaurant-cover>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer">
        <div class="sticky"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import RestaurantCover from 'components/RestaurantCover'

  export default {
    name: 'Home',
    components: {
      RestaurantCover,
    },
  }

</script>
<style lang="stylus" scoped>
  @import '../assets/stylus/mixin.styl'
  .home
    .home-wrapper
      width: 100%
      .header
        display: flex
        height: 96px
        line-height: 96px
        margin: 8px 16px
        font-size: 0
        text-align: center
        // background: rgba(7, 17, 27, 0.2)
        .location
          flex: 0 0 120px
          width: 120px
          // align-self: center
          font-dpr(12px)
          .icon-arrow-down
            margin-left: 4px
            vertical-align: middle
            font-dpr(20px)
            color: rgba(7, 17, 27, 0.5)
        .search-wrapper
          position: relative
          display: flex
          flex: 1
          align-self: center
          height: 60px
          border: 1px solid rgba(7, 17, 27, 0.1)
          border-radius: 10px
          font-dpr(14px)
          .icon-search
            flex: 0 0 60px
            width: 60px
            align-self: center
            // left: 20px
            // top: 10px
            font-dpr(20px)
            color: rgba(7, 17, 27, 0.3)
          .search-input
            flex: 1
            align-self: center
            padding: 0 10px
            border: 0 
            // border-radius: 10px
            // box-shadow: 2px 2px 2px rgba(7, 17, 27, 0.1)
            font-size: 24px
            // text-align: center
            outline: 0
        .personal
          flex: 0 0 60px
          width: 60px
          align-self: center
          margin: 0 20px
          .icon-user
            font-dpr(16px)
            font-weight: 700
            color: rgba(7, 17, 27, 0.5)
      .slider
        position: relative
        font-size: 0
        .img
          width: 100%
        .dot
          display: inline-block
          position: absolute
          right: 20px
          bottom: 20px
          width: 12px
          height: 12px
          border-radius: 50%
          background-color: #fff
      .content-wrapper
        .tabs
          display: flex
          height: 80px
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
          .tab-item
            flex: 1
            align-self: center
            text-align: center
        .content
          padding: 18px
          // background-color: #ccc
          .restaurant-list
            display: flex
            flex-flow: row wrap
            font-size: 0
            .restaurant-item
              flex: 0 0 49%
              width: 49%
              margin-bottom: 20px
            .split
              flex: 0 0 2%
              width: 2%
</style>
