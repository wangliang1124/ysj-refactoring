<template>
  <div class="goods-list">
    <ul>
      <router-link tag="li" class="goods-item border-1px" 
        v-for="(item,index) in goods" 
        :to="{ name:'goodsDetail', params:{ id: item.id } }" 
        :key="index"
      >
        <img src="../assets/img/logo@80x80.jpg" class="photo">
        <div class="content">
          <div class="name">{{item.name}}</div>
          <p class="desc">{{item.intro}}</p>
          <div>
            <span class="price">¥{{item.price_unit}}</span>
            <span class="old-price" v-if="!!item.oldPrice">¥{{item.oldPrice}}</span>
          </div>
          <div class="control-wrapper">
            <cart-control :goods.sync="item"></cart-control>
          </div>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
  /* eslint-disable */
  import wxconfig from 'utils/wx'
  import CartControl from './CartControl'

  export default {
    name: 'GoodsList',
    components: {
      CartControl,
    },
    props: {
      goods: {
        type: Array,
      },
    },
    created() {
      console.log('=============goods  list  created================');
      wxconfig.initWx(); // 获取微信签名
    },
  };
</script>
<style lang='stylus' type="text/css" scoped>
  @import '../assets/stylus/mixin.styl' 
 
  .goods-list
    .goods-item
        display: flex
        margin: 0 40px
        padding: 40px 0
        border-1px(rgba(7,17,27,0.1))
        .photo
          flex: 0 0 160px
          width: 160px
          height: 160px
          // border: 1px solid rgba(7,17,27,0.1)
        .content
          flex: 1
          position: relative
          margin-left: 40px
          .name
            margin-top: 4px            
            font-dpr(14px)
            color: rgb(7,17,27)
          .desc
            margin: 20px 0
            font-dpr(10px)
            line-height: 1.5
            color: rgb(147,153,159)
          .price
            font-weight: 700
            color: rgb(240,20,20)
          .control-wrapper
            position: absolute
            right: 0
            bottom: 0
        // &:last-child
        //   border-none()
</style>
