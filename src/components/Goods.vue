<template>
  <div class="goods">
    <div class="goods-wrapper" ref="goods">
      <!-- <keep-alive> -->
        <router-view :goods="goods"></router-view>
      <!-- </keep-alive> -->
      <div class="shopcart">
        <div class="shopcart-content-wrapper">
          <span class="icon" @click="toggleList">
            <i class="iconfont icon-shopcart" :class="{highlight:totalCount>0}">
            </i>
            <span class="num" v-if="totalCount>0">{{totalCount}}</span>
          </span>
          <span class="total" :class="{highlight:totalPrice>0}"><i class="text">合计：</i>¥{{totalPrice}}</span>
          <span class="pay" :class="{highlight:totalPrice>0}" @click="showPay">去结算</span>
        </div>
        <transition name="fold">
          <div class="shopcart-list" v-show="showList">
            <div class="list-header">
              <span class="title">购物车</span><span class="empty" @click="emptyShopcart">清空</span>
            </div>
            <div class="list-content">
              <ul>
                <li class="list-item border-1px" v-for="(goods,index) in chosenGoods" :key="index">
                  <span class="name">{{goods.name}}</span><span v-if="goods.card_tags.length" class="spec">{{goods.card_tags[0].tag}}</span><span class="price">¥{{goods.price_unit}}</span>
                  <span class="cartcontrol-wrapper"><cart-control :goods.sync="goods"> </cart-control></span>
                </li>
              </ul>
              <div class="delivery">运费：¥{{deliveryFee}}</div>
            </div>
          </div>
        </transition>
      </div>
      <!-- <actionsheet v-model="showPayAction" :menus="actionMenus" @on-click-menu="choosePayWay"></actionsheet> -->
      <div class="pay-info" v-show="showPayInfo">
        <div class="pay-info-wrapper">
          <h1 class="pay-info-title">订单详情</h1>
          <p class="pay-info-content">
            {{message}}
          </p>
        </div>
        <div class="pay-info-footer">
          <div class="close" @click="closeInfo"><span>×</span></div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="list-mask" @click="hideList" v-show="showMask"></div>
    </transition>
  </div>
</template>
<script>
  /* eslint-disable */
  import wxconfig from 'utils/wx'
  import api from 'utils/api'
  // import { XDialog, XButton, Group, Cell, Scroller, Actionsheet } from 'vux'
  import BetterScroll from 'better-scroll'
  import CartControl from './CartControl'

  export default {
    name: 'Goods',
    components: {
      CartControl,
      // XDialog,
      // XButton,
      // Group,
      // Cell,
      // Scroller,
      // Actionsheet,
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
      // goodsItem() {
      //   console.log('===computed====' + Date.now());
      //   return this.goods.find(item => item.id === this.cardId);
      // },
    },
    created() {
      console.log('=====goods created======');
      this.initData();
      wxconfig.initWx(); // 获取微信签名
    },
    mounted() {
      this.$nextTick(() => {
        if (!this.goodsScroll) {
          console.log('-------------goods mounted-------------------');
          this.goodsScroll = new BetterScroll(this.$refs.goods, { click: true });
        } else {
          this.goodsScroll.refresh();
        }
      });
    },
    methods: {
      async initData() {
        const res = await api.get('/card');
        this.cardList = res.data;
      },
      onCopy() {
        this.copyText = '已复制到剪切板';
      },
      showPay() {
        if (!this.totalCount) {
          return;
        }
        this.hideList();
        this.showPayAction = true;
      },
      choosePayWay(val) {
        this.payway = val;
        this.pay();
      },
      showInfo() {
        this.showPayInfo = true;
        this.showMask = true;
      },
      async pay() {
        /* eslint no-underscore-dangle: 0 */ /* eslint no-alert: 0 */
        if (this.totalPrice <= 0 || this.totalCount <= 0) {
          return;
        }
        this.showPayAction = true; // 显示付款方式
        const _this = this; // 必须的
        window.wx.ready(() => {
          window.wx.openAddress({
            async success(address) {
              if (address.errMsg === 'openAddress:ok') {  // if (address.errMsg === 'openAddress:ok') {
                const param = {};
                param.goods = _this.chosenGoods; // 把商品对象传入，包括id和count
                param.payway = _this.payway;
                param.userName = address.userName;
                param.telNumber = address.telNumber;
                param.nationalCode = address.nationalCode;
                param.postalCode = address.postalCode;
                param.provinceName = address.provinceName;
                param.cityName = address.cityName;
                param.countryName = address.countryName;
                param.detailInfo = address.detailInfo;
                if (_this.payway === 'pay1') {
                  const res = await api.post('/order/gooditem', param);
                  window.wx.chooseWXPay({
                    ...res.data.payargs,
                    async success() {
                      const payRes = await api.post('/order/pay/gooditem', res.data);
                      // alert(payRes);
                      if (payRes.message === 'success') {
                        _this.$vux.toast.text('购买成功!', 'middle');
                        _this.emptyShopcart();
                      }
                    },
                  });
                } else {
                  // alert('====pay2');
                  const res = await api.post('/order/gooditem', param);
                  const orders = res.data;

                  let _totalFee = 0;
                  Object.values(orders).forEach((item) => { _totalFee += item.total_fee; });

                  _this.orderNo = orders[0].order_num;
                  _this.totalFee = _totalFee;
                  _this.message = `
                    订 单 号: ${_this.orderNo}
                    总 金 额: ${_this.totalFee}元
                    开 户 行: 广发银行
                    开户网点: 广发银行北京朝阳北路支行
                    银行账号: 9550880200259600164
                    公司名称: 北京玥食互动科技有限公司
                    信用代码: 9111011MA003BP53C
                    电话号码: 021-32035192
                        邮箱: yueshijihudong@yueshiji.com.cn`;
                  _this.showInfo();
                }
              }
            },
          });
        });
      },
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.isShowList = !this.isShowList;
      },
      emptyShopcart() {
        this.chosenGoods.forEach((item) => {
          item.count = 0;
        });
        this.hideList();
      },
      hideList() {
        this.isShowList = false;
        this.showMask = false;
      },
      closeInfo() {
        this.showPayInfo = false;
        this.emptyShopcart();
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
      .shopcart
        position: fixed
        bottom: 0
        left: 0
        height: 96px
        width: 100%
        z-index: 50
        line-height: 96px
        background-color: #141d17
        .shopcart-content-wrapper
          display: flex
          z-index: 20
          font-size: 0
          color: rgba(255,255,255,0.4)
          background-color: #141d17
          .icon
            position: relative
            display: inline-block
            flex: 0 0 120px
            width: 120px
            height: 100%
            padding: 0 8px
            text-align: center
            background: #2b333b
            .iconfont
              font-dpr(28px)
              color: rgba(255,255,255,0.4)
              &.highlight
                color:rgba(255,255,255,0.8)
            .num
              position: absolute
              right: 20px
              top: 12px
              padding: 4px
              width: 40px
              height: 24px
              line-height: 1
              border-radius: 20px
              font-dpr(10px)
              color: #fff
              font-weight: 700
              background-color: rgb(240, 20, 20)
              box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.4)
          .total
            flex: 1
            font-dpr(16px)
            font-weight: 700
            text-align: center
            &.highlight
              color: #fff
            .text
              font-style: normal
              font-dpr(14px)
              color: rgba(255,255,255,0.4)
          .pay
            flex: 0 0 240px
            width: 240px
            font-dpr(12px)
            font-weight: 700
            text-align: center
            background-color: #2b333b
            &.highlight
              background: #00b43c
              color: #fff
        .shopcart-list
          position: absolute
          left: 0
          top: 0
          z-index: -10
          width: 100%
          background-color: #fff
          transform: translate3d(0, -100%, 0)
          &.fold-enter, &.fold-leave-to
            transform: translate3d(0, 0, 0)
          &.fold-enter-active, &.fold-leave-active
            transition: all 0.4s ease
          .list-header
            padding: 0 36px
            height: 80px
            line-height: 80px
            border-bottom: 1px solid rgba(7, 17, 27, 0.1)
            background-color: #f3f5f7
            .title
              float: left
              font-dpr(14px)
              color: rgba(7, 17, 27, 0.7)
            .empty
              float: right
              font-dpr(12px)
              color: rgb(0, 160, 220)
          .list-content
            font-dpr(12px)
            .list-item
              margin: 0 36px
              padding: 48px 0
              line-height: 1
              border-1px(rgba(7,17,27,0.1))
              .name
                font-dpr(14px)
                color: rgb(7, 17, 27)
              .spec
                margin-left: 24px
                color: rgb(147,153,159)
              .price
                position: absolute
                right: 160px
                margin-right: 80px
                font-dpr(14px)
                font-weight: 700
                color: rgb(240, 20, 20)
              .cartcontrol-wrapper
                position: absolute
                display: inline-block
                right: 0
                bottom: 36px
          .delivery
            padding: 0 36px
            text-align: right
      .pay-info
        position: fixed
        top: 50%
        left: 50%
        z-index: 10
        transform: translate(-50%, -50%)
        width: 90%
        height: 66%
        border: 1px solid rgba(7, 17, 27, 0.1)
        background-color: #fff
        box-shadow: 2px 2px 4px rgba(7, 17, 27, 0.1)
        // overflow: auto
        .pay-info-wrapper
           height: 100%
          .pay-info-title
            height: 80px
            line-height: 80px
            text-align: center
            // border-bottom: 1px dashed rgba(7, 17, 27, 0.1)
            background-color: #f3f5f7
          .pay-info-content
            padding: 0 40px 60px 40px
            line-height: 48px
            font-dpr(12px)
            white-space: pre
        .pay-info-footer
          position: relative
          bottom: 0
          width: 60px
          height: 60px
          border-radius: 50%
          margin: -80px auto 0 auto
          .close
            text-align: center
            font-size: 30px
            color: rgb(0, 160, 220)
    .list-mask
      position: fixed
      top: 0
      left: 0
      height: 100%
      width: 100%
      opacity: 1
      backdrop-filter: blur(10px)
      over-flow: hidden
      background-color: rgba(7, 17, 27, 0.6)
      &.fade-enter-active
        transition: all .4s ease
      &.fade-enter, &.fade.leave-to
        opactiy: 0
        background: rgba(7, 17, 27, 0)
</style>
