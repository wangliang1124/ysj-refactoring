<template>
  <div class="m-coupon">
    <tab active-color="#000" style="position: fixed;z-index: 999;width: 100%">
      <tab-item selected  @on-item-click="onTabClick">个人</tab-item>
      <tab-item @on-item-click="onTabClick">团购</tab-item>
    </tab>
    <div style="height: 44px;"></div>
    <div class="coupons">
      <Grid :rows="2" class='list' v-if="couponList.length === 0">
        <div class="showNoOffer">
          <div class="content">
            <img src="/static/noOffer.png" width="50px" />
            <div class="text"> 数据被瞄星人偷走了~</div>
          </div>
        </div>
      </Grid>
      <div  v-bind:class="{coupon: true, 'coupon-expired': item.status.status === '0'}"  v-for="item in couponList">
        <div class="content">
          <div class="left">
            <img slot="header" src="../../assets/card.png" style="width:100%;display:block;">
          </div>
          <div class="right">
            <p class="date">订单号：{{item.order_num}}</p>
            <p class="date">玥享卡：{{item.card.name}}</p>
            <p class="date">金额：{{item.should_fee}}元</p>
            <p class="date">数量：{{item.count}}张</p>
            <p class="date">时间：{{item.created_at | format('YYYY-MM DD:HH:MM')}}</p>
          </div>
          <div type="right2" class="right2">
            <x-button @click.native="getInvoice(item.id)" v-if="showInvoice && item.status.status !== '0' && (!item.invoices[0] || item.invoices[0].status.status === '2')" style="height:30px;font-size:12px;top:28px;width:60px;padding:0 6px 0 6px" type="primary">申请发票</x-button>
          </div>
        </div>
      </div>
    </div>
    <x-dialog v-model="showScrollBox" class="m-dialog m-dialog-code" :scroll="false">
      <p class="dialog-title">申请发票</p>
      <div class="dialog-content">
        <group>
          <selector style="font-size:14px" title="发票类型" :options="list" v-model="defaultSelectValue"></selector>
          <x-input v-model="invoiceTitle" required style="font-size:14px" title="发票抬头 " name="username" placeholder="请输入发票抬头" ></x-input>
          <x-input v-model="invoiceContent" required style="font-size:14px" title="发票内容 " name="username" placeholder="请输入发票内容" ></x-input>
          <x-input v-model="invoiceTaxCode" v-if="defaultSelectValue === '1'" style="font-size:14px" title="纳税识别号" name="username" placeholder="请输入纳税识别号" ></x-input>
        </group>
      </div>
       <div class="dialog-footer">
         <span class="cancel" @click="showScrollBox=false" >取消</span>
         <span class="done" @click="postInvoice" >确认</span>
       </div>
    </x-dialog>
  </div>
</template>
<script>
  import api from '@/utils/api';
  import { Grid, Tab, TabItem, XDialog, XButton, Selector, XInput, Group } from 'vux';

  export default {
    name: 'order',
    data() {
      return {
        showScrollBox: false,
        stageCouponList: [],
        restaurantCouponList: [],
        couponList: [],
        showInvoice: false,
        list: [{ key: '0', value: '个人' }, { key: '1', value: '单位' }],
        defaultSelectValue: '0',
        orderId: null,
        invoiceTitle: '',
        invoiceTaxCode: '',
        invoiceContent: '',
        allowTax: false,
        orderGroupId: null,
        tab: 0,
      };
    },
    created() {
      this.initData();
    },
    methods: {
      async initData() {
        const res = await api.get('/order');
        this.stageCouponList = res.data.rows || [];
        this.couponList = this.stageCouponList;
        const res2 = await api.get('/group/order');
        this.restaurantCouponList = res2.data.rows || [];
        const system = await api.get('/system');
        this.showInvoice = system.data.allowTax;
      },
      onTabClick(value) {
        this.tab = value;
        if (value === 1) {
          this.couponList = this.restaurantCouponList;
          console.log(this.couponList);
        } else {
          this.couponList = this.stageCouponList;
        }
      },
      async getInvoice(id) {
        const system = await api.get('/system');
        this.showInvoice = system.data.allowTax;
        if (!this.showInvoice) {
          this.$vux.toast.text('发票申请暂时关闭', 'middle');
          return;
        }
        if (this.tab === 0) {
          this.orderId = id;
          this.orderGroupId = null;
        } else {
          this.orderId = null;
          this.orderGroupId = id;
        }
        this.showScrollBox = true;
      },
      async postInvoice() {
        const system = await api.get('/system');
        this.showInvoice = system.data.allowTax;
        if (!this.showInvoice) {
          this.$vux.toast.text('发票申请暂时关闭', 'middle');
          return;
        }
        if (this.defaultSelectValue === '0' && (!this.invoiceTitle || !this.invoiceContent)) {
          this.$vux.toast.text('请填写发票抬头和内容', 'middle');
          return;
        }
        if (this.defaultSelectValue === '1' && (!this.invoiceTitle || !this.invoiceContent || !this.invoiceTaxCode)) {
          this.$vux.toast.text('请填写发票抬头、内容、纳税人识别号', 'middle');
          return;
        }
        const res = await api.post('/invoice', {
          type: this.defaultSelectValue,
          tab: this.tab,
          order_id: this.orderId,
          order_group_id: this.orderGroupId,
          title: this.invoiceTitle,
          content: this.invoiceContent,
          tax_code: !this.invoiceTaxCode,
        });
        if (res) {
          this.$vux.toast.text('申请成功', 'middle');
        } else {
          this.$vux.toast.text('已经申请过了,请耐心等待', 'middle');
        }
        this.showScrollBox = false;
      },
    },
    components: {
      Tab,
      TabItem,
      XDialog,
      Grid,
      XButton,
      Selector,
      XInput,
      Group,
    },
  };
</script>
<style lang='less'>
  ::-webkit-input-placeholder { /* WebKit browsers */
    color: #000 !important;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #000 !important;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #000 !important;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #000 !important;
  }
  .m-coupon{
    .list::before {
      border-top: none
    }
    .showNoOffer{
      margin-top: 200px;
      text-align: center;
      .text{
        margin-top:10px;
        color: #ccc;
      }
    }
    .coupons{
      margin-top:10px;
      .coupon{
        margin-bottom:10px;
        overflow: hidden;
        padding:0 10px;
        .content{
          background: #fdfdfd;
          height: 90px;
          .left,.right{
            float: left;
            box-sizing: border-box;
            height: 100%;
          }
          .left{
            width: 30%;
            padding:10px 0 10px 16px;
            overflow: hidden;
            .price{
              color:#753675;
              font-size:28px;
              line-height: 70px;
              border-right:2px dotted #eee;
              .rmb{
                font-size: 12px;
                display: inline-block;
                vertical-align: top;
                line-height: 45px;
              }
            }
            .cardType{
              line-height: 1rem;
              font-size: 14px;
            }
          }
          .right{
            width: 50%;
            padding: 6px 0 20px 23px;
            line-height: 20px;
            color:#333;
            .title{
              font-size: 15px;
            }
            .date{
              font-size: 12px;
            }
          }
          .right2{
            width: 20%;
            float: right;
          }
        }
      }
      .coupon-expired{
        .content{
          position: relative;
          overflow: hidden;
          &:before{
            position: absolute;
            top: 5px;
            right: -20px;
            content: "未支付";
            background: #d3d3d3;
            color: #fff;
            height: 12px;
            padding: 5px 18px;
            transform: rotate(45deg);
          }
          .left .price{
            color:#c8c8c8;
          }
          .right{
            color:#c8c8c8;
          }
        }
      }
    }
    .instruction{
      margin-top:10px;
      width: 100%;
      padding:20px 0;
      text-align: center;
      color:#999;
      font-size: 12px;
      .iconfont{
        font-size: 12px;
      }
    }
  }
  .m-dialog-code {
    .dialog-content {
      height:70px;
      padding-top:0;
      .input-box {
        height:40px;
        background-color: #eeeeee;
        padding: 5px 0;
        input{
          float: right;
          background-color: #eeeeee;
          width: 200px;
          border: none;
          height: 40px;
          padding-left:10px;
        }
      }
    }
    .dialog-footer{
      .cancel, .done{
        float: left;
        line-height:45px;
        text-align: center;
        border-top: 1px solid #eaeaea;
      }
      .cancel{
        width: 148px;
        color: #ccc;
        border-right: 1px solid #eaeaea;
      }
      .done{
        width: 148px;
        color:#000;
      }
    }
  }
  .m-dialog {
  .dialog-title {
    padding: 15px 0;
    font-size: 16px;
    color: #333;
  }
  .dialog-content {
    height: 200px;
    padding: 10px 24px;
    overflow: scroll;
    text-align: left;
    color: #333;
    font-family: initial;
    h3 {
      font-size: 14px;
      margin-bottom: 15px;
      font-weight: normal;
      .point {
        font-size: 20px;
        font-weight: bold;
        margin-right: 5px;
      }
    }
    p {
      font-size: 12px;
      line-height: 20px;
      margin-bottom: 25px;
    }
  }
  .dialog-footer {
    .dialog-close {
      margin: 8px 0;
      color: #999;
    }
  }
  }
</style>
