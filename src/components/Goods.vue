<template>
  <div class="goods">
    <div class="goods-wrapper">
      <!-- <keep-alive> -->
        <router-view :goods="goods"></router-view>
      <!-- </keep-alive> -->

    </div>
    <!-- <shopcart :goods="goods"></shopcart> -->
  </div>
</template>
<script>
  /* eslint-disable */
  import wxconfig from 'utils/wx'
  import api from 'utils/api'
  import Shopcart from './Shopcart'

  export default {
    name: 'Goods',
    components: {
      Shopcart,
    },
    data() {
      return {
        cardList: [],
      };
    },
    computed: {
      goods() {
        return this.cardList.filter(item => item.id > 15); // .filter(item => item.id > 15);
      },
    },
    created() {
      console.log('=====goods created======');
      this.initData();
    },
    methods: {
      async initData() {
        const res = await api.get('/card');
        this.cardList = res.data;
      },
    },
  };
</script>
<style lang='stylus' type="text/css" scoped>
  @import '../assets/stylus/mixin.styl' 
  
  .goods
    position: absolute
    top: 0px
    bottom: 96px
    width: 100%
    height: 100%
    // min-height: 100%
    background: #fff
    .goods-wrapper
      width: 100%
      background: #fff
</style>
