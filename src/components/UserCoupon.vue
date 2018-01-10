<template>
  <div class="coupon">
    <div class="coupon-wrapper">
      <div class="header">
        <span class="title" @click="select(index)" :class="{ current: index === currentIndex }"
          v-for="(item, index) in tabTitle">{{item}}
        </span>
      </div>
      <div class="content-wrapper" v-if='list.length'>
        <ul class="list">
          <li class="item" v-for="item in list">
            <span class="price">￥{{item.value}}</span>
            <div class="content">
              <h2 class="title">{{item.name}}</h2>
              <div class="expired">过期时间：{{item.expire_at | formatDate}}</div>
            </div>
            <div class="status" v-if="Date.now() - item.expire_at">已过期</div>
          </li>
        </ul>
      </div>
      <div class="no-order" v-else>您没有{{tabTitle[currentIndex]}}</div>
    </div> 
  </div>
</template>
<script>
import api from 'utils/api'
import FormatDate from 'utils/date'

export default {
  name: 'UserCoupon',
  data() {
    return {
      tabTitle: ['玥享卷', '尊享卷'],
      currentIndex: 0,
      couponList: [],
      restaurantCouponList: [],
    }
  },
  computed: {
    list() {
      if (this.currentIndex === 0) {
        return this.couponList
      }
      return this.restaurantCouponList
    },
  },
  created() {
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
      const res = await api.get('/coupon')
      this.couponList = res.data.rows || []
      console.log(this.couponList)
      const res2 = await api.get('/coupon/restaurant')
      this.restaurantCouponList = res2.data.rows || []
    },
    select(index) {
      this.currentIndex = index
    },
  },
}
</script>
<style lang="stylus" scoped>
  @import '../assets/stylus/mixin.styl' 

  .coupon
    .coupon-wrapper
      margin-bottom: 24px
      .header
        display: flex
        height: 80px
        line-height: 80px
        text-align: center
        background: #fff
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          flex: 1
          &.current
            border-bottom: 4px solid rgb(240, 20, 20)
      .content-wrapper
        padding: 24px
        // background: rgba(7, 27, 27, 0.1)
        .list
          .item
            position: relative
            display: flex
            margin-top: 24px
            padding: 24px 0
            border: 1px solid rgba(7, 17, 27, 0.1)
            overflow: hidden
            .price
              flex: 0 0 120px
              padding: 0 24px
              text-align: center
              width: 120px
              line-height: 120px
              border-right: 1px dashed rgba(7, 17, 27, 0.1)
              font-dpr(24px)
              color: rgb(240, 20, 20)
            .content
              flex: 1
              align-self: center
              margin-left: 48px
              .title
                font-dpr(14px)
              .expired
                margin-top: 24px
                color: rgb(147, 153, 159)
            .status
              position: absolute
              top: 18px
              right: -40px
              line-height: 30px
              padding: 6px 40px
              transform: rotate(45deg)
              background: #ccc
    .no-order
      margin-top: 24px
      text-align: center
</style>

