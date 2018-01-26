<template>
  <div class="goods-detail" :class="{over: addCartShow}" ref="goodsDetail">
    <div class="detail-wrapper" v-if="SKU">
      <div class="header">
        <span class="back" @click="backToList"><i class="iconfont icon-arrow-right"></i></span>
        <swiper :imageList="imgList"></swiper>
        <div class="title-wrapper">
          <h1 class="title">{{SKU.name}}</h1>  <!-- goodsItem.name -->
          <div class="desc">{{SKU.intro}}</div>
          <div class="price-wrapper"><span class="price">¥{{SKU.price_unit}}</span><span class="old-price">¥{{SKU.old_price}}</span></div>
        </div>
        <div class="info">
          <span class="delivery">运费：¥{{SKU.delivery}}</span><span class="sell-count">销量：99份</span><span class="rating">好评率100%</span>
        </div>
        <div class="do-select" @click="showChooseItem">
          <span>{{selected ?'已选择:':'请选择规格'}}</span>
          <span class="selected" v-if="!!SKU.card_tags">{{ SKU.card_tags[0].tag }}</span>
          <i class="iconfont icon-arrow-right"></i>
        </div>
      </div>
      <split></split>
      <div class="detail">
        <h2 class="title">商品详情</h2>
        <div class="introduction" v-html="SKU.introduction" ref="detail"></div>
      </div>
    </div>
    <div class="add-cart" v-show="addCartShow">
      <div class="text"  @click="addCart">加入购物车</div>
      <div class="goods-list" v-show="goodsShow">
        <div class="list-header">
          <img :src="cover" class="cover">
          <div class="content">
            <h2 class="title">{{SKU.name}}</h2>
            <!-- <div class="desc">{{}}</div> -->
            <div class="price">¥{{SKU.price_unit}}</div>
          </div>
        </div>
        <div class="list-spec">
          <h2 class="title">规格:</h2>
          <div class="spec">
            <li class="item" 
              :class="{selected: item.id===cardId}" 
              @click="selectSpec(item.id)" 
              v-for="(item,index) in SPU"
            >
              {{item.card_tags[0].tag}}
            </li>
            <!-- <li class="item">375ML</li> -->
          </div>
        </div>
        <div class="list-count">
          <h2 class="title">购买数量:</h2>
          <div class="control-wrapper">
            <cart-control :goods="SKU" ref="cartControl"></cart-control>
          </div>
        </div>
      </div>
      <div class="musk" @touchstart="hideAddCart" v-show="goodsShow"></div>
    </div>
    <shopcart :goods="goods" @addCart="onAddCart"></shopcart>
  </div>
</template>
<script>
  /* eslint-disable */
  import BetterScroll from 'better-scroll';
  import wxconfig from '@/utils/wx';
  import Swiper from './Swiper';
  import Split from './Split';
  import CartControl from './CartControl';
  import Shopcart from './Shopcart'
  // import api from '@/utils/api';

  export default {
    name: 'GoodsDetail',
    components: {
      Swiper,
      Split,
      CartControl,
      Shopcart,
    },
    props: {
      goods: {
        type: Array,
      },
    },
    data() {
      return {
        // imgList: [],
        // goodsItem: {},
        cardId: 0,
        addCartShow: true,
        goodsShow: false,
        selected: false,
      };
    },
    computed: {
      SKU() { // 单个产品条目
        const sku = this.goods.find(item => item.id === this.cardId) || {}
        return sku
      },
      SPU() {  // 同类产品
        return this.goods.filter(item => item.name === this.SKU.name)
      },
      imgList() {
        if (this.SKU.photos) {
          const photos = JSON.parse(this.SKU.photos);
          return photos.map(path => ({
            url: 'http://ysj.tcfellow.com:3000' + path,
          }));
        }
        return [];
      },
      cover() {
        return `http://ysj.tcfellow.com:3000${this.SKU.cover}`;
      },
    },
    created() {
      wxconfig.initWx(); // 获取微信签名
    },
    updated() {
      console.log('===updated===');
      console.log(this.SKU);
      if (!this.goodsDetailScroll) {
        this.goodsDetailScroll = new BetterScroll(this.$refs.goodsDetail, { click: true });
      } else {
        this.goodsDetailScroll.refresh();
      }
      this.cardId = parseInt(this.$route.params.id, 10);
      // 修改富文本中图片样式
      const els = this.$refs.detail.getElementsByTagName('img');
      console.log(els);
      for (let i = 0; i < els.length; i += 1) {
        els[i].style.width = '100%';
      }
    },
    mounted() {
      console.log('==============goods-detail mounted==============');
      console.log(this.goods);
      this.cardId = parseInt(this.$route.params.id, 10);
    },
    methods: {
      addCart(event) {
        // this.$refs.cartControl.add(event);
        if(!this.goodsShow){
          this.goodsShow = true
          if(!this.SKU.count){
            this.$set(this.SKU, 'count', 1)
          }
        } else {
          this.addCartShow = false
          // this.$refs.cartControl.add(event)
        }
        
        // this.addCartShow = false;
      },
      onAddCart(event){
        if(!this.addCartShow){
          this.addCartShow = true
          this.goodsShow = true
          if(!this.SKU.count){
            this.$set(this.SKU, 'count', 1)
          }
        } else {
          this.addCartShow = true
          this.goodsShow = false
          // this.$refs.cartControl.add(event)
        }
      },
      showChooseItem() {
        this.addCartShow = true;
        this.goodsShow = true;
        this.cardId = this.$route.params.id;
      },
      selectSpec(id) {
        this.cardId = id;
        this.selected = true;
        this.$router.push({ name: 'goodsDetail', params: { id } });
      },
      hideAddCart() {
        this.addCartShow = false;
      },
      backToList() {
        this.$router.push({ path: '/goods' });
      },
    },
  };
</script>
<style lang="stylus" scoped>
  @import '../assets/stylus/mixin.styl'
  
  .goods-detail
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100% 
    background: #fff
    &.over
      z-index: 60
    .detail-wrapper
      .header
        position: relative
        .back, .router-link-active
          position: absolute
          top: 12px
          left: 12px
          z-index: 1
          padding: 12px
          .icon-arrow-right
            display: inline-block
            font-dpr(16px)
            color: #fff
            font-weight: 900
            transform: rotate(180deg)
        .title-wrapper
          padding-top: 48px
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
          letter-spacing: 4px
          .title
            text-align: center
            font-dpr(18px)
          .desc
            margin-top: 24px
            line-height: 1.5
            text-align: center
            color: rgb(170, 170, 170)
          .price-wrapper
            margin: 24px 0
            text-align: center
            color: rgb(170, 170, 170)
            .price
              // padding: 0px 12px
              font-dpr(14px)
              font-weight: 700
              color: rgb(240, 20, 20)
            .old-price
              margin-left: 12px
              text-decoration: line-through
        .info
          display: flex
          padding: 0px 24px
          height: 72px
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
          span
            flex: 1
            align-self: center
            color: rgb(170, 170, 170)
        .do-select
          padding: 0px 24px
          height: 72px
          line-height: 72px
          color: rgb(170, 170, 170)
          .selected
            margin-left: 24px
            color: rgb(7, 17, 27)
          .icon-arrow-right
            float: right
            font-dpr(10px)
            font-weight: 700
      .detail
        overflow: hidden
        .title
          height: 72px
          line-height: 72px
          text-align: center
          font-dpr(14px)
          color: rgb(7,17,27)
          border-bottom: 4px solid rgb(214, 108, 120)
        .introduction
          padding: 12px 16px 0 16px
          line-height: 2
          img
            width: 80%
            display: inline-block
    .add-cart
      position: fixed
      z-index: 70
      bottom: 0
      left: 0
      width: 100%
      .text
        height: 96px
        line-height: 96px
        text-align: center
        font-weight: 700
        color: #fff
        background: rgb(214, 108, 120)
      .goods-list
        position: absolute
        left: 0
        top: 0
        width: 100%
        border-top: 1px solid rgba(7, 17, 27, 0.1)
        background-color: #fff
        transform: translate3d(0, -100%, 0)
        .list-header
          display: flex
          margin: 0 24px
          padding: 24px 0
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
          .cover
            flex: 0 0 160px
            width: 160px
            height: 160px
          .content
            flex: 1
            margin-left: 48px
            .title
              margin-top: 8px
              font-dpr(16px)
            .price
              margin-top: 24px
              font-dpr(14px)
              color: rgb(240, 20, 20)
        .list-spec
          margin: 0 24px
          padding: 24px 0
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
          .title
            font-dpr(14px)
            color: rgb(7,17,27)
          .spec
            margin-top: 24px
            .item
              display: inline-block
              padding: 16px 20px
              margin-right: 36px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 2px
              &.selected
                border: 1px solid rgb(214, 108, 120)
        .list-count
          position: relative
          margin: 0px 24px
          padding: 48px 0
          .title
            display: inline-block
            font-dpr(14px)
            color: rgb(7,17,27)
          .control-wrapper
            position: absolute
            top: 50%
            right: 0
            transform: translateY(-50%)
      .musk
        position: fixed
        z-index: -10
        top: 0
        left: 0
        height: 100%
        width: 100%
        opacity: 1
        backdrop-filter: blur(10px)
        overflow: hidden
        background-color: rgba(7, 17, 27, 0.6)
</style>

