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
        orderNo: '',
        showPayInfo: false,
        showPayAction: false,
        // showNotice: true,
        // cardList: [],
        cardId: 0,
        actionMenus: {
          pay1: '微信支付',
          pay2: '对公打款',
        },
        payway: 'pay1',
        chosen: false,
        price: 0,
        totalFee: 0,
        copyText: '点我复制',
        message: '',
        isShowList: false,
        showMask: false,
      };
    },
    computed: {
      goods() {
        return this.cardList.filter(item => item.id > 15); // .filter(item => item.id > 15);
      },
      chosenGoods() {
        const chosenGoods = [];
        this.goods.forEach((item) => {
          if (item.count) {
            chosenGoods.push(item);
          }
        });
        return chosenGoods;
      },
      totalCount() {
        let totalCount = 0;
        this.chosenGoods.forEach((item) => {
          totalCount += item.count;
        });
        return totalCount;
      },
      totalPrice() {
        let totalPrice = 0;
        this.chosenGoods.forEach((item) => {
          totalPrice += item.price_unit * item.count;
        });
        totalPrice += this.deliveryFee;
        return Number(totalPrice).toFixed(2);
      },
      deliveryFee() {
        let fee = 0;
        this.chosenGoods.forEach((item) => {
          if (item.delivery && item.delivery > fee) {
            fee = item.delivery;
          }
        });
        return fee;
      },
      showList() {
        if (this.totalCount > 0 && this.isShowList) {
          this.showMask = true;
          return true;
        }
        this.hideList();
        return false;
      },
    },
    created() {
      console.log('=====goods created======');
      this.initData();
      wxconfig.initWx(); // 获取微信签名
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
