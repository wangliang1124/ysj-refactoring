<template>
  <div class="order">
    <div class="order-wrapper">
      <div class="header">
        <span class="title" @click="select(index)" :class="{ current: index === currentIndex }" v-for="(item, index) in tabTitle">{{item}}</span>
      </div>
      <div class="content-wrapper" v-if='!!list.length'>
        <ul class="list">
          <li class="item" v-for="item in list">
            <!-- <img class="cover" src="../assets/img/card.jpg"> -->
            <div class="content">
                <li class="info">订单号：{{item.order_num}}</li>
                <li class="info" >玥享卡：{{item.card ? item.card.name : '玥享卡'}}</li>
                <li class="info">金额：{{item.should_fee}}</li>
                <li class="info">数量：{{item.count}}</li>
            </div>
            <div class="invoice-btn" v-if="item.status.status==='1'" @click="showInvoice(item)">申请发票</div>
            <div class="unpay" v-if="item.status.status==='0'">{{item.status.info}}</div>
            <div class="pay" v-else-if="item.status.status==='1'">{{item.status.info}}</div>
            <div class="expired" v-else="item.status.status==='2'">{{item.status.info}}</div>
          </li>
        </ul>
        <div class="invoice" v-show="invoiceShow">
          <h2 class="title">申请发票</h2>
          <div class="invoice-item">
            <span class="field">发票类型</span>
            <select name="invoice-type" v-model="invoiceType">
              <option value="0">个人</option><option value="1">单位</option>
            </select>
          </div>
          <div class="invoice-item">
            <span class="field">发票抬头</span><input type="text" v-model="invoiceTitle" placeholder="请输入发票抬头">
          </div>
          <div class="invoice-item">
            <span class="field">发票内容</span><input type="text" v-model="invoiceContent" placeholder="请输入发票内容">
          </div>
          <div class="invoice-item" v-if="invoiceType=== '1'">
            <span class="field">纳税人识别号</span><input type="text" v-model="invoiceTaxCode" placeholder="请输入纳税人识别号">
          </div>
          <div class="warning">{{warningText}}</div>
          <div class="btn">
            <button @click="hideInvoice">取消</button><button @click="applyInvoice">确定</button>
          </div>
        </div>
      </div>
      <div class="no-order" v-else>您还没有购买过会员， <router-link to="/card"><span>马上购买</span></router-link></div>
    </div>
  </div>
</template>
<script>
  import api from 'utils/api'

  export default {
    name: 'UserOrder',
    data() {
      return {
        tabTitle: ['个人', '团购'],
        currentIndex: 0,
        orderList: [],
        groupOrderList: [],
        actived: false,
        invoiceShow: false,
        invoiceType: '0',
        orderId: null,
        orderGroupId: null,
        invoiceTitle: '',
        invoiceTaxCode: '',
        invoiceContent: '',
        allowTax: false,
        warningText: '',
      }
    },
    computed: {
      list() {
        if (this.currentIndex === 0) {
          return this.orderList
        }
        return this.groupOrderList
      },
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
      select(index) {
        this.currentIndex = index
      },
      showInvoice(item) {
        this.invoiceShow = true
        if (this.currentIndex === 0) {
          this.orderId = item.id
          console.log(this.orderId)
          this.orderGroupId = null
        } else if (this.currentIndex === 1) {
          this.orderId = null
          this.orderGroupId = item.id
        }
      },
      hideInvoice() {
        this.invoiceShow = false
      },
      async applyInvoice() {
        this.warningText = ''
        if (this.invoiceType === 0 && (!this.invoiceTitle || !this.invoiceContent)) {
          if (!this.invoiceTitle) {
            this.warningText += '发票抬头不能为空！ '
          }
          if (!this.invoiceContent) {
            this.warningText += '发票内容不能为空！ '
          }
          return
        }
        if (this.invoiceType === 1 && (!this.invoiceTitle ||
          !this.invoiceContent || !this.invoiceTaxCode)) {
          if (!this.invoiceTitle) {
            this.warningText += '发票抬头不能为空！'
          }
          if (!this.invoiceContent) {
            this.warningText += '发票内容不能为空！'
          }
          if (!this.invoiceTaxCode) {
            this.warningText += '纳税人识别号不能为空！'
          }
          return
        }
        console.log('llllllllllllllllllllllll')
        try {
          const res = await api.post('/invoice', {
            type: this.invoiceType,
            tab: this.currentIndex,
            order_id: this.orderId,
            order_group_id: this.orderGroupId,
            title: this.invoiceTitle,
            content: this.invoiceContent,
            tax_code: !this.invoiceTaxCode,
          })
          if (res) {
            // console.log('申请成功')
            this.warningText = '申请成功'
            setTimeout(() => {
              this.invoiceShow = false
            }, 1500)
          }
        } catch (err) {
          this.warningText = err.message
          setTimeout(() => {
            this.invoiceShow = false
          }, 1500)
        }
      },
    },
  }
</script>
<style lang="stylus" scoped>
  @import '../assets/stylus/mixin.styl'
  
  .order
    .order-wrapper
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
        background: rgba(7, 27, 27, 0.1)
        .list
          .item
            position: relative
            display: flex
            margin-bottom: 24px
            padding: 20px
            // border-bottom: 1px solid rgba(7, 17, 27, 0.1)
            background: #fff
            overflow: hidden
            &:last-child
              margin-bottom: 0
            .cover
              flex: 0 0 200px
              width: 200px
              height: 100%
            .content
              flex: 1
              margin-left: 24px
              color: rgb(147, 153, 159)
              .info
                margin-bottom: 16px
            .invoice-btn
              flex: 0 0 120px
              align-self: center
              margin-right: 36px
              padding: 4px
              width: 120px
              line-height: 2
              text-align: center
              border-radius: 2px
              color: #fff
              background: #00b43c
            .unpay, .pay ,.expired
              position: absolute
              top: 18px
              right: -40px
              line-height: 30px
              padding: 6px 40px
              transform: rotate(45deg)
            .pay
              background: #00b43c
            .unpay
              background: rgb(240, 20, 20)
            .expired
              background: #ccc
        .invoice
          position: fixed
          top: 50%
          left: 50%
          width: 80%
          transform: translate(-50%, -50%)
          // border: 1px solid #ccc
          box-shadow: 0px 0px 36px #ccc
          background: #fff
          .title
            margin: 36px 0
            text-align: center
            font-dpr(16px)
          .invoice-item  
            margin: 0 48px
            padding: 36px 0
            border-bottom: 1px solid rgba(7, 27, 27, 0.1)
            &:last-child
              border: 0
            .field
              margin-right: 36px
            select
              padding: 8px 24px
              border: 1px solid rgba(7, 27, 27, 0.1)
          .warning
            padding: 12px 48px
            line-height: 1.5
            text-align: center
            color: rgb(240, 20, 20)
          .btn
            display: flex
            margin-top: 24px
            text-align: center
            // font-dpr(14px)
            border-top: 1px solid rgba(7, 27, 27, 0.1)
            button
              flex: 1
              padding: 16px 0
              border: 0
              line-height: 2
              font-dpr(14px)
              background: #fff
              border-right: 2px solid rgba(7, 27, 27, 0.1)
              &:last-child
                border: 0
      .no-order
        line-height: 2
        text-align: center
</style>  
