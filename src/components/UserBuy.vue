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
    <div class="coupon">
      <i class="iconfont icon-youhuiquan"></i><span>玥享卷</span>
    </div>
    <split></split>
    <div class="fee">
      <span>合计：</span>
      <span class="total">￥{{totalPrice}}</span>

      <span class="has-code">
        我有激活码
      </span>
    </div>
    <split></split>
    <div class="pay" :class="{active: actived}">立即购买</div>
    <div class="active-code" v-show="showActive">
      <h1 class="title">会员卡激活</h1>
      <div class="content">
        <span class="code">1111222233334444</span><img class="scan" @click="openScan" src="../assets/img/scan.png">
      </div>
      <div class="btn-wrapper">
        <span class="btn">取消</span><span class="btn active">激活</span>
      </div>
    </div>
    <div class="musk"></div>
  </div>
</template>
<script>
  import api from 'utils/api'
  import UserBuyCard from 'components/UserBuyCard'
  import Split from 'components/Split'

  export default {
    name: 'UserBuy',
    components: {
      UserBuyCard,
      Split,
    },
    data() {
      return {
        cardList: [],
        selected: 99,
        totalPrice: 0,
        actived: false,
        showActive: true,
      }
    },
    created() {
      this.initData()
    },
    methods: {
      async initData() {
        const res = await api.get('/card')
        this.cardList = res.data.filter(item => item.id < 15)
        console.log(this.cardList)
      },
      selectCard(index) {
        // console.log(Date.now())
        this.selected = index
        this.actived = true
        this.totalPrice = this.cardList[index].price_unit
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
        // vertical-align: middle
        font-dpr(18px)
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
        border-radius: 4px
        background: rgba(7, 17, 27, 0.1)
        .code
          flex: 1
          align-self: center
          border-right: 1px solid rgba(7, 17, 27, 0.5)
          // background: rgba(7, 17, 27, 0.1)
        .scan
          flex: 0 0 48px
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
          &:last-child
            margin-right: 0px
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
