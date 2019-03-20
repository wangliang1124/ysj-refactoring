<template>
  <div class="m-pay">
    <div class="content">
      <h1>{{title}}</h1>
      <div class="rawPrice">
        <span class="label">消费金额：</span><x-input  v-model="price" />
      </div>
      <!--<cell class="cell" is-link>-->
        <!--<span slot='title' class="couponTitle"> <span class="iconfont icon-gou"/> 玥享券</span>-->
        <!--<span class="couponPrice"><span class="rmb">¥</span>{{couponPrice}}</span>-->
      <!--</cell>-->
      <!--<cell class="cell">-->
        <!--<span slot='title' class="discountTitle">玥享会员专享</span>-->
        <!--<span class="discountPrice">{{discountDesc}}{{discountPrice}}</span>-->
      <!--</cell>-->
      <cell class="cell pay-cell">
        <div class="payPrice">实际支付：<span class="price"><span class="num">{{getPayPrice}}</span>元</span></div>
        <!--<div class="reduce">（已尊享{{reduce}}元特惠）</div>-->
      </cell>
    </div>
    <x-button class="payBtn" @click.native="paySubmit">确认支付</x-button>
  </div>
</template>

<script>
  import api from '@/utils/api';
  import { XButton, Cell, XInput } from 'vux';

  export default {
    name: 'productDetail',
    computed: {
      getPayPrice() { return this.price; },
    },
    data() {
      const data = {
        title: 'Oximfix餐厅',
        price: 0,
//        couponPrice: 50,
//        discountTag: '九折',
//        discountDesc: '0.1*200=',
//        discountPrice: 20,
      };
//      data.reduce = Number(data.discountPrice) + Number(data.couponPrice);
      data.payPrice = Number(data.price) - Number(data.reduce);
      return data;
    },
    methods: {
      async paySubmit() {
        if (!this.price) {
          this.$vux.toast.text('请输入价格');
        }
        const res = await api.post('/record', {
          price: this.getPayPrice,
          specialty_id: this.$route.query.specialty_id,
        });
        if (res && res.message === 'success') {
          this.$vux.toast.text('支付成功');
          this.$router.push({ name: 'purchases' });
        } else {
          this.$vux.toast.text('会员身份验证错误');
        }
      },
    },
    components: {
      XButton,
      Cell,
      XInput,
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .m-pay {
    color: #333;
    .content {
      padding: 0 24px;
      background: #fff;
    }
    h1 {
      padding: 22px 0;
      font-size: 18px;
    }
    .rawPrice {
      position: relative;
      height: 65px;
      line-height: 65px;
      font-size: 15px;
      border: 1px solid #d3d3d3;
      padding: 0 10px;
      .label{
        position: absolute;
        top:0;
        left:10px;
        line-height: 65px;
      }
      .vux-x-input{
        padding:0;
        padding-left: 75px;
      }
      input{
        border:0;
        line-height: 63px;
        padding-left:75px;
      }
    }
    .cell {
      height: 55px;
      line-height: 55px;
      padding: 0;
      font-size: 14px;
      color: #000;
      .couponTitle{
          color:#333;
        .icon-gou {
          margin-right: 5px;
          color: #000;
        }
      }
      .couponPrice {
        color: #000;
      }
      .discountTitle{
        color: #000;
        .discountTag {
          margin-left: 10px;
          padding: 2px 4px;
          font-size: 12px;
          color: #550055;
          border: 1px solid #550055;
          border-radius: 2px;
        }
      }
      .discountPrice{
        color: #000;
      }
    }
    .pay-cell{
      padding:10px 0 ;
      .payPrice{
        color:#333;
        line-height: 30px;
        font-size: 15px;
        .price{
          color: #550055;
          .num{
            margin-right: 2px;
            font-size: 18px;
          }
        }
      }
      .reduce{
        line-height: 20px;
        font-size: 12px;
        color:#333;
      }
    }
    .payBtn {
      margin-top: 60px;
      height: 44px;
      line-height: 44px;
      width: 90%;
      background: #000;
      color: #fff;
    }
  }
</style>
