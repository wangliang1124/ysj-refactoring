<template>
  <div class="m-coupon">
    <tab active-color="#000">
      <tab-item selected  @on-item-click="onTabClick">玥享券</tab-item>
      <tab-item @on-item-click="onTabClick">尊享券</tab-item>
    </tab>
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
            <p class="price"><span class="rmb">¥</span>{{item.value}}</p>
          </div>
          <div class="right">
            <p class="title">{{item.name}}</p>
            <p class="date">过期时间：{{item.expire_at | format('YYYY-MM-DD')}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="instruction" @click="showScrollBox=true">
      玥享券使用说明 <span class="iconfont icon-wenhao"></span>
    </div>
    <x-dialog v-model="showScrollBox" class="m-dialog" :scroll="false"  :hide-on-blur="true">
      <p class="dialog-title">使用说明</p>
      <div class="dialog-content">
        <h3><span class="point">·</span>优惠券类型</h3>
        <p>玥食记礼券：本券不兑换现金、不找零、不与其他活动同时使用，使用本券不开票、不找零、不兑换现金；</p>
        <h3><span class="point">·</span>如何使用</h3>
        <p>领取天猫优惠券以后，然后点立即购买：就 就会在优惠方式下方看到店铺优惠券的选择 口。选择合适的优惠券然后付款购买，就好 了选择</p>
      </div>
      <div @click="showScrollBox=false" class="dialog-footer">
        <x-icon type="ios-close-empty" size="30"></x-icon>
      </div>
    </x-dialog>
  </div>
</template>
<script>
  import api from '@/utils/api';
  import { Grid, Tab, TabItem, XDialog } from 'vux';

  export default {
    name: 'myCard',
    data() {
      return {
        showScrollBox: false,
        stageCouponList: [],
        restaurantCouponList: [],
        couponList: [],
      };
    },
    created() {
      this.initData();
    },
    methods: {
      async initData() {
        const res = await api.get('/coupon');
        this.stageCouponList = res.data.rows || [];
        this.couponList = this.stageCouponList;
        const res2 = await api.get('/coupon/restaurant');
        this.restaurantCouponList = res2.data.rows || [];
      },
      onTabClick(value) {
        if (value === 1) {
          this.couponList = this.stageCouponList;
        } else {
          this.couponList = this.restaurantCouponList;
        }
      },
    },
    components: {
      Tab,
      TabItem,
      XDialog,
      Grid,
    },
  };
</script>
<style lang='less' scoped>
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
            width: 70%;
            padding: 30px 0 20px 23px;
            line-height: 20px;
            color:#333;
            .title{
              font-size: 15px;
            }
            .date{
              font-size: 12px;
            }
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
            content: "\5DF2\8FC7\671F";
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
  .m-dialog{
    .dialog-title{
      padding:25px 0 ;
      font-size: 16px;
      color: #333;
    }
    .dialog-content{
      height: 200px;
      padding:10px 24px;
      overflow: scroll;
      text-align: left;
      color: #333;
      font-family: initial;
      h3{
        font-size: 14px;
        margin-bottom: 15px;
        font-weight: normal;
        .point{
          font-size: 20px;
          font-weight: bold;
          margin-right: 5px;
        }
      }
      p{
        font-size: 12px;
        line-height: 20px;
        margin-bottom: 25px;
      }
    }
    .dialog-footer{
      .dialog-close{
        margin:8px 0;
        color: #999;
      }
    }
  }
</style>
