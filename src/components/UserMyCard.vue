<template>
  <div class="mycard">
    <!-- <h1 class="title">我的玥享卡</h1> -->
    <div class="card" v-for="item in cardList">
      <div class="header">
        <span class="city" v-for="city in item.card.restaurant_areas">{{city.city}}</span>
        <span class="status" :class="{used: getStatus(item)}">{{getStatus(item)?'已使用':'使用中'}}</span>
      </div>
      <div class="content">
        <div class="left">
          <div class="price">
            <span>￥</span><span class="num">101</span>
          </div>
        </div>
        <div class="right">
          <h2 class="name">会员卡</h2>
          <div class="info">购买日期： {{item.start_time | formatDate}}</div>
          <div class="info">赏味期限： {{item.expire_time | formatDate}}</div>
        </div>
      </div>
    </div>
    <div class="no-card" v-if='!cardList.length'>您还不是会员，没有会员卡， <router-link to="/card"><span>点击开通</span></router-link></div>
  </div>
</template>
<script>
  import api from 'utils/api'
  import FormatDate from 'utils/date'

  export default {
    name: 'UserMyCard',
    data() {
      return {
        cardList: [],
      }
    },
    created() {
      console.log('=========mycard=====')
      this.initData()
    },
    filters: {
      formatDate(time) {
        const date = new Date(time)
        return FormatDate(date, 'yyyy-MM-dd')
      },
    },
    methods: {
      async initData() {
        const res = await api.get('/vip')
        this.cardList = res.data.rows
        console.log(this.cardList)
      },
      getStatus(item) {
        return item.status.status === '1'
      },
    },
  }
</script>
<style lang="stylus" scoped>
  @import '../assets/stylus/mixin.styl'

  .mycard
    padding: 36px
    .title
      line-height: 2
      text-align: center
      font-dpr(18px)
    .card
      margin: 36px 0
      // border: 1px solid rgba(7, 17, 27, 0.8)
      border-radius: 8px
      box-shadow: 0 4px 10px #ccc
      // background: #ccc
      .header
        display: flex
        height: 80px
        // line-height: 80px
        padding: 0 24px
        border-radius: 8px 8px 0 0
        background: #ccc
        .city
          flex: 1
          line-height: 80px
        .status
          flex: 0 0 100px
          width: 100px
          align-self: center
          padding: 10px
          text-align: center
          color: #fff
          background: #753775
          &.used
            background: rgb(77, 85, 93)
      .content
        display: flex
        padding: 24px
        .left
          flex: 0 0 200px
          width: 200px
          .price
            margin: 20px
            width: 180px
            height: 180px
            line-height: 180px
            text-align: center
            border: 4px solid rgba(7, 17, 27, 0.8)
            border-radius: 50%
            .num
              color: #753775
              font-dpr(30px)
        .right
          flex: 1
          margin-left: 36px
          padding-top: 36px
          margin-right: 60px
          .name
            padding-bottom: 24px
            border-bottom: 1px solid rgba(7, 17, 27, 0.4)
            font-dpr(14px)
            font-weight: 700
          .info
            line-height: 2
            color: rgb(147,153,159)
    .no-card
      text-align: center
</style>
