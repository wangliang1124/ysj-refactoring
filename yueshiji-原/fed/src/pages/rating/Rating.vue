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
  .rating
    display: inline-block
    margin-bottom: 10px
    font-size: 0px
    .icon-star-full
      display: inline-block
      margin-right: 2px  
      padding:2px
      border-radius: 6px
      font-size: 10px
      background-color: #999
      color: #fff 
     .active
       background-color: #4a094d    
</style>
