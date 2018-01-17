<template>
  <div class="rating">
<!--     <span class="icon-star-full"></span>
    <span class="icon-star-full"></span>
    <span class="icon-star-full"></span>
    <span class="icon-star-full"></span> -->
    <span class="icon-star-full" v-for="index in NUM" :class="{active:index<=score}" :key="index"></span>
  </div>
    <!-- <span class="rating" v-html="rating"></span> -->
</template>
<script type="text/javascript">
  /* eslint-disable */
  export default {
    name: 'rating',
    props: {
      score: {
        type: Number,
        default: 4,
      },
    },
    data() {
      return {
        NUM: 5,
      };
    },
  };
</script>
<style lang="stylus" type="text/css" rel="stylesheet/stylus" scoped>
  @import '../assets/stylus/mixin.styl'
  .rating
    display: inline-block
    font-size: 0px
    .icon-star-full
      display: inline-block
      margin-right: 4px  
      padding: 4px
      border-radius: 8px
      font-dpr(10px)
      background-color: #999
      color: #fff 
     .active
       background-color: #4a094d    
</style>
