<template>
  <div class="m-myCard">
      <h1>会员身份验证</h1>
    <div class="card" v-for="card in cards" :key="card">
        <div class="header">
          <span style="color: #000" v-for="city in card.card.restaurant_areas" class="title">{{city.city}}</span>
          <div v-bind:class="{tag: true, 'tag-used': getStatus(card)}">{{getStatus(card)?'已使用' : '使用中'}}</div>
        </div>
      <div class="content">
          <div class="left">
            <div class="circle">
              <div class="circleInfo">
                <p class="price"><span class="rmb">¥</span>{{card.total_money}}</p>
              </div>
            </div>
          </div>
          <div class="right">
            <h2 style="font-size: 14px">{{card.name}}</h2>
            <p>购买日期：{{card.start_time | format('YYYY-MM-DD')}}</p>
            <p>赏味期限：{{card.expire_time | format('YYYY-MM-DD')}}</p>
          </div>
      </div>
    </div>
    <div class="showNoOffer" v-if='!cards || cards.length === 0'>您的会员卡验证失败,请先开通再享用平台美食 <router-link to="card"><span class="open">点击开通</span></router-link></div>
    <div style="color: #550055; font-size: 16px"v-if="cards && cards.length > 0"  class="showNoOfferSuccess" >您的会员卡验证成功<br/>
      请展示给餐厅服务员
      <!-- <x-button class="payBtn" @click.native="buyOrder">买单</x-button> -->
    </div>
  </div>
</template>
<script>
  import api from '@/utils/api';
  import { CheckIcon, XButton, Cell, Actionsheet, Radio } from 'vux';

  export default {
    name: 'myCard',
    data() {
      return {
        cards: [],
      };
    },
    created() {
      this.initData();
    },
    methods: {
      getStatus(item) {
        if (item.status) {
          return item.status.status === '0';
        }
        return false;
      },
      async initData() {
        const res = await api.get('/vip/verify');
        this.cards = res.data;
      },
      buyOrder() {
        this.$router.push({
          name: 'pay',
          query: { specialty_id: this.$route.query.specialty_id },
        });
      },
    },
    components: {
      CheckIcon,
      XButton,
      Cell,
      Actionsheet,
      Radio,
    },
  };
</script>
<style lang='less'>
  .payBtn {
    margin-top: 60px;
    height: 44px;
    line-height: 44px;
    width: 90%;
    background: #000;
    color: #fff;
  }
  .m-myCard{
    padding:0  10px;
    h1{
      text-align: center;
      color:#000;
      font-size: 18px;
      line-height: 65px;;
    }
    .showNoOffer{
      text-align: center;
      margin-top:20px;
    }
    .showNoOfferSuccess {
      text-align: center;
      margin-top:20px;
      color: green;
    }
    .open{
      color:#550055;
    }
    .openSuccess{
      color:white;
      display: block;
      margin-top: 20px;
    }
    .card{
      border-radius: 6px;
      margin-bottom:10px;
      overflow: hidden;
     box-shadow:  -1px 4px 5px 0 #999;
      .header{
        background: #cacaca;
        height: 48px;
        line-height: 48px;
        .title{
          color:#fff;
          font-size: 15px;
          margin-left:10px;
        }
        .tag{
          height: 20px;
          margin-top: 9px;
          color: #fff;
          line-height: 20px;
          float: right;
          padding:5px 10px;
          background: #753775;
        }
        .tag-used{
          background: #b5b5b5;
        }
      }
      .content{
        background: #fdfdfd;
        height: 160px;
          .left,.right{
            float: left;
          }
        .left{
          width: 45%;
          height: 100%;
          position: relative;
          .circle{
            position: absolute;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
            border:3px solid #000;
            width: 6rem;
            height: 6rem;
            border-radius: 50%;
            .circleInfo{
              height: 3rem;
              line-height: 3rem;
              margin: 1.5rem 0;
              color:#000;
              text-align: center;
              .price{
                line-height: 3rem;
                font-size:32px;
                .rmb{
                  font-size: 12px;
                }
              }
              .cardType{
                line-height: 1rem;
                font-size: 14px;
              }
            }
          }
        }
        .right{
          width: 55%;
          height: 100%;
          padding: 30px 0;
          box-sizing: border-box;
          h2{
            color:#333;
            font-size: 16px;
            padding:10px 0;
            margin-bottom:3px;
            border-bottom:1px solid #999;
            width: 80%;
          }
          p{
            font-size: 14px;
            padding:7px 0;
            color:#999;
          }
        }
      }
    }
  }
</style>
