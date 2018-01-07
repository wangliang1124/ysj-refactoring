<template>
  <div class="order">
    <div class="order-wrapper">
      <div class="header">
        <span class="title" :class="{ current: actived }" v-for="(item, index) in title">{{item}}</span>
      </div>
      <div class="content-wrapper">
        <ul class="list">
          <li class="item" v-for="item in orderList">
            <img class="cover" src="../assets/img/card.jpg">
            <div class="content">
                <li class="info">订单号：{{item.order_num}}</li>
                <li class="info">玥享卡：{{item.card.name}}</li>
                <li class="info">金额：{{item.should_fee}}</li>
                <li class="info">数量：{{item.count}}</li>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import api from 'utils/api'

  export default {
    name: 'UserOrder',
    data() {
      return {
        title: ['个人', '团购'],
        orderList: [],
        groupOrderList: [],
        actived: false,
      }
    },
    created() {
      this.initData()
    },
    methods: {
      async initData() {
        const res = await api.get('/order')
        this.orderList = res.data.rows
        console.log(this.orderList)
        const res2 = await api.get('/group/order')
        this.groupOrderList = res2.data.rows
        // const system = await api.get('/system')
        // this.showInvoice = system.data.allowTax
      },
    },
  }
</script>
<style lang="stylus" scoped>
  .order
    .order-wrapper
      .header
        display: flex
        height: 96px
        line-height: 96px
        text-align: center
        background: #fff
        .title
          flex: 1
          &.current
            border-bottom: 4px solid rgb(240, 20, 20)
      .content-wrapper
        padding: 24px
        background: #f3f5f7
        .list
          .item
            display: flex
            margin-bottom: 24px
            padding: 20px
            background: #fff
            .cover
              flex: 0 0 240px
              width: 240px
              height: 100%
            .content
              flex: 1
              margin-left: 24px
              color: rgb(147, 153, 159)
              .info
                margin-bottom: 16px
</style>
