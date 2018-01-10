<template>
  <div class="buy">
    <div class="title">
      <img src="../assets/img/card.jpg" width="100%">
    </div>
    <ul class="card-list">
      <li class="card-item" v-for="(item,index) in cardList" @click="selectCard(index)">
        <user-buy-card :card="item" :selected="selected===index"></user-buy-card>
      </li>
    </ul>
    <split></split>
    <template v-if="couponList.length">
      <div class="coupon" @click="showCouponList">
        <i class="iconfont icon-youhuiquan"></i><span class="text">您有{{couponList.length}}张可用玥享卷</span>
        <!-- <span class="couponText" @click="">{{}}</span> -->
        <span class="discount">减免<span class="value">¥{{couponValue}}</span></span>
      </div>
      <split></split>
    </template>
    <div class="fee">
      <span>合计：</span>
      <span class="total">￥{{totalPrice}}</span>
      <span class="has-code" @click="showActive">我有激活码</span>
    </div>
    <split></split>
    <div class="pay" :class="{active: isPay}" @click="pay">立即购买</div>
    <div class="active-code" v-show="isShowActive">
      <h1 class="title">会员卡激活</h1>
      <div class="content">
        <!-- <span class="code" contenteditable="true">扫描二维码或者输入激活码</span> -->
        <input v-model="actCode" @focus="emptyText" type="text" class="code" placeholder="扫描二维码或者输入激活码">
        <img class="scan" @click="openScan" src="../assets/img/scan.png">
      </div>
      <div class="btn-wrapper">
        <span class="btn" @click="hideActive">取消</span><span class="btn active" @click="doActive">激活</span>
      </div>
    </div>
    <user-buy-card-active v-show="isShowActived" v-on:confirm="cardActived"></user-buy-card-active> 
    <div class="coupon-list" v-show="isShowCouponList">
      <div class="list-header">
        <span class="title">优惠券</span>
      </div>
      <div class="list-content">
        <ul>
          <li class="list-item" v-for="(item,index) in couponList" :key="index">
            <span class="name">{{item.name}}</span>
            <span class="value">￥{{item.value}}</span>
            <span class="use" @click="useCoupon(item)">使用</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="musk" v-show="isShowMusk" @click="hideActive"></div>
  </div>
</template>
<script>
  import api from 'utils/api'
  import wxAPI from 'utils/wx'
  import UserBuyCard from 'components/UserBuyCard'
  import UserBuyCardActive from 'components/UserBuyCardActive'
  import Split from 'components/Split'
  import store from '../vuex'

  export default {
    name: 'UserBuy',
    components: {
      UserBuyCard,
      UserBuyCardActive,
      Split,
    },
    data() {
      return {
        cardId: 0,
        cardList: [],
        selected: 99,
        cardPrice: 0,
        isPay: false,
        isShowActive: false,
        isShowMusk: false,
        isShowActived: false,
        actCode: '',
        couponList: [],
        couponValue: 0,
        isShowCouponList: false,
      }
    },
    computed: {
      totalPrice() {
        if (this.cardPrice - this.couponValue < 0) {
          return 0
        }
        return this.cardPrice - this.couponValue
      },
    },
    created() {
      this.initData()
    },
    methods: {
      async initData() {
        const res = await api.get('/card')
        this.cardList = res.data.filter(item => item.id < 15)

        const res2 = await api.get('/coupon')
        const coupon = res2.data.rows
        const res3 = await api.get('/coupon/restaurant')
        const restaurantCoupon = res3.data.rows
        this.couponList = coupon.concat(restaurantCoupon)

        console.log(this.couponList)
      },
      selectCard(index) {
        // console.log(Date.now())
        this.selected = index
        this.actived = true
        this.cardPrice = this.cardList[index].price_unit
        this.cardId = this.cardList[index].id
      },
      showActive() {
        this.isShowActive = true
        this.isShowMusk = true
      },
      hideActive() {
        this.isShowActive = false
        this.isShowMusk = false
        this.isShowCouponList = false
      },
      async doActive() {
        if (!this.actCode) {
          this.actCode = '请输入激活码！'
          return
        }
        this.isShowActive = false
        console.log('+++++++++++++++++++++++++++++')
        try {
          const res = await api.post('/activation/use', { actCode: this.actCode })
          const vipInfo = res.data
          this.actCode = ''
          this.isShowActived = true // 显示激活页面
          store.dispatch('setVIPInfo', vipInfo)
        } catch (e) {
          this.actCode = '激活码激活失败，请检查激活码或重试'
        }
      },
      cardActived() {
        this.isShowActive = false
        setTimeout(() => {
          this.$router.push({ path: '/user/mycard' }) // 返回后跳转到myCard
        }, 1000)
      },
      openScan() {
        wxAPI.openScanQRCode()
      },
      emptyText() {
        this.actCode = ''
      },
      showCouponList() {
        this.isShowCouponList = true
        this.isShowMusk = true
      },
      useCoupon(coupon) {
        this.couponValue = coupon.value
        this.isShowMusk = false
        this.isShowCouponList = false
      },
      async pay() {
        /* eslint no-underscore-dangle: 0 */ /* eslint no-alert: 0 */
        if (this.totalPrice <= 0) {
          return
        }
        const _this = this // 必须的
        wxAPI.getAddress(async (address) => {
          if (address.errMsg === 'openAddress:ok') {
            const param = {
              count: 1,
              card_id: _this.cardId,
              userName: address.userName,
              telNumber: address.telNumber,
              nationalCode: address.nationalCode,
              postalCode: address.postalCode,
              provinceName: address.provinceName,
              cityName: address.cityName,
              countryName: address.countryName,
              detailInfo: address.detailInfo,
            }
            const res = await api.post('/order', param)
            window.wx.chooseWXPay({ // 此wx非彼wx
              ...res.data.payargs,
              async success() {
                const payRes = await api.post('/order/pay', res.data)
                if (payRes.message === 'success') {
                  // _this.$vux.toast.text('购买成功!', 'middle')
                  _this.selected = 99
                }
              },
            })
          }
        })
      },
    },
  }

</script>
<style lang="stylus" scoped>
  @import '../assets/stylus/mixin.styl'
  
  .buy
    .title
      padding: 24px 36px 0 36px
    .card-list
      position: relative
      padding: 0 36px
      .card-item
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      .select
        position: absolute
    .coupon
      padding: 24px 36px
      .icon-youhuiquan
        vertical-align: middle
        font-dpr(18px)
      .text
        margin-left: 8px
        vertical-align: middle
      .discount
        float: right
        vertical-align: middle
        .value
          margin-left: 10px
          font-weight: 700
          color: rgb(240, 20, 20)
    .fee
      padding: 24px 36px
      .total
        font-weight: 700
        color: rgb(240, 20, 20)
      .has-code
        float: right
    .pay
      margin: 24px 36px
      // width: 100%
      height: 80px
      line-height: 80px
      text-align: center
      border: 1px solid #ccc
      border-radius: 8px
      color: #fff
      font-weight: 700
      letter-spacing: 4px
      background: #2b333b
      &.active
        background: #00b43c
    .active-code
      position: fixed
      top: 50%
      left:50%
      z-index: 10
      transform: translate(-50%, -50%)
      width: 80%
      height: 400px
      border-radius: 8px
      background: #fff
      .title
        text-align: center
        line-height: 2
        font-dpr(14px)
        font-weight: 700
      .content
        display: flex
        margin: 64px 36px
        padding: 16px
        // border: 10px solid rgba(7, 17, 27, 0.1)
        border-radius: 4px
        background: rgba(7, 17, 27, 0.1)
        .code
          flex: 1
          align-self: center
          // line-height: 2
          padding: 16px 8px
          // border-right: 1px solid rgba(7, 17, 27, 0.5)
          color: rgb(147,153,159)
          // background: rgba(7, 17, 27, 0.1)
        .scan
          flex: 0 0 48px
          align-self: center
          margin-left: 24px
          width: 48px
          height: 48px
      .btn-wrapper
        text-align: center
        .btn
          display: inline-block
          margin-right: 40px
          padding: 16px
          width: 30%
          text-align: center
          color: rgba(7, 17, 27, 0.4)
          border: 1px solid rgba(7, 17, 27, 0.2)
          &.active
            color: rgb(7, 17, 27)
            border: 1px solid rgb(240, 20, 20)
            // color: rgb(240, 20, 20)
          &:last-child
            margin-right: 0px
    .coupon-list
      position: fixed
      left: 0
      bottom: 50%
      z-index: 10
      width: 100%
      background: #fff
      transform: translate3d(0, 50%, 0)
      // &.fold-enter, &.fold-leave-to
      //   transform: translate3d(0, 0, 0)
      // &.fold-enter-active, &.fold-leave-active
      //   transition: all 0.4s ease
      .list-header
        padding: 0 36px
        height: 80px
        line-height: 80px
        text-align: center
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        background-color: #f3f5f7
        .title
          font-dpr(14px)
          // color: rgba(7, 17, 27, 0.7)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)
      .list-content
        padding: 0 36px
        .list-item
          display: flex
          padding: 24px 0
          line-height: 2
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
          .name
            flex:1
            color: rgb(7, 17, 27)
          .value
            flex: 0 0 60px
            margin-right: 60px
            font-weight: 700
            color: rgb(240, 20, 20)
          .use
            flex: 0 0 60px
            width: 60px
    .musk
      position: fixed
      top: 0
      left: 0
      height: 100%
      width: 100%
      opacity: 1
      backdrop-filter: blur(10px)
      over-flow: hidden
      background-color: rgba(7, 17, 27, 0.6)
</style>
