<template>
  <div class="content-wrapper">
    <div class="content-cook-item" v-for='(item, index) in cookTop11' :key='index'>
      <div class="cover">
        <router-link :to="{ name:'detail', params:{id: item.id}}">
          <span class="num">No.{{index+1}}</span>
          <img :src="item.cook_avatar" :alt="item.restaurant.name">
        </router-link>
      </div>
      <div class="intro">
        <!-- <divider class='title'>No.{{index+1}}</divider> -->
        <span class="restaurant-name">{{item.restaurant.name}}</span><br/>
        <h2 class="cook-name">{{item.cook_name}}</h2>
      </div>
    </div>
    <div v-if="!cookTop11.length">
      <h2 class='content-none'>~本月没有数据~</h2>
    </div>
  </div>  
</template>
<script type="text/javascript">
  /* eslint-disable */
  import { mapGetters } from 'vuex'

  export default {
    name: 'CookTop11',

    computed: {
      ...mapGetters(['cookTop11']),
    },
    created() {
      console.log('=============================');
      console.log(this.cookTop11);
    },
  };
</script>
<style type="text/css" lang="stylus" scoped>
  @import '../assets/stylus/mixin.styl'
  .content-wrapper
    display: flex
    flex-wrap: wrap
    justify-content: space-around 
    padding-bottom: 60px; // sticky
    font-size: 0
    overflow: hidden
    .content-cook-item
      position: relative
      flex: 0 0 48% 
      width: 48%
      .cover
        a
          img
           width: 100%
           height: 100%
          .num
            position: absolute
            display: inline-block
            top: 12px
            padding: 8px
            border-top-right-radius: 4px
            border-bottom-right-radius: 4px
            font-dpr(12px)
            text-align: center
            color: #fff
            background-color: #480a4d 
      .intro
        margin: 24px 0
        white-space: nowrap
        text-align: center
        font-size: 10px
        .title
          padding: 0
          font-weight: 700
          color: #a26ab1
        .restaurant-name
          margin-top: 12px 
          font-dpr(10px)
          font-weight: 200
          color: rgb(147,153,159)
        .cook-name
          margin-top: 12px 
          font-dpr(14px)
          font-weight: 200
      &:first-child
        flex: 0 0 100%
        width: 100%
        margin-top: 4px
        .title
          position: absolute
          top: 20px
          padding: 4px 10px 
          width: 90px
          border-top-right-radius: 4px
          border-bottom-right-radius: 4px
          font-dpr(24px)
          color: #fff
          background-color: #550055
        .intro
          display: flex
          justify-content: space-around
          padding: 36px 0
          .cook-name
            flex: 1
            align-self: center
            font-dpr(18px)
            font-weight: 200
          .restaurant-name
            flex: 1
            align-self: center
            color: rgb(147,153,159)
            font-weight: 200
            overflow: visible
        .cover
          a
            img
             width: 100%
             height: 100%
             vertical-align: middle 
</style>
