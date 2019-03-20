<template>
  <div class="m-myCard">
      <h1>我的玥享卡</h1>
    <div class="card" v-for="item in cardList">
        <div class="header">
          <span style="color: #000" v-for="city in item.card.restaurant_areas" class="title">{{city.city}}</span>
          <div v-bind:class="{tag: true, 'tag-used': getStatus(item)}">{{getStatus(item)?'已使用' : '使用中'}}</div>
        </div>
      <div class="content">
          <div class="left">
            <div class="circle">
              <div class="circleInfo">
                <p class="price"><span class="rmb">¥</span>{{item.total_money}}</p>
                <!-- <p class="cardType">玥享卡</p> -->
              </div>
            </div>
          </div>
          <div class="right">
            <h2 style="font-size: 14px">{{item.name}}</h2>
            <p>购买日期：{{item.start_time | format('YYYY-MM-DD')}}</p>
            <p>赏味期限：{{item.expire_time | format('YYYY-MM-DD')}}</p>
          </div>
      </div>
    </div>
    <div class="showNoOffer" v-if='!cardList.length'>您还不是会员，所以没有会员卡， <router-link to="card"><span class="open">点击开通</span></router-link></div>
  </div>
</template>
<script>
  import api from '@/utils/api';
  import { CheckIcon, XButton, Cell, Actionsheet, Radio } from 'vux';

  export default {
    name: 'myCard',
    data() {
      return {
        cardList: [],
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
        const res = await api.get('/vip');
        this.cardList = res.data.rows;
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
    .open{
      color:#550055;
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
        height: 180px;
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
              margin: 1.5rem 0;
              color:#000;
              text-align: center;
              .price{
                line-height: 2rem;
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
          padding: 40px 0;
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
