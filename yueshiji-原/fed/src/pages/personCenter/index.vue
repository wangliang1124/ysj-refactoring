<template>
  <div class="m-personCenter">
    <div class="header">
      <div class="userInfo">
        <h1>{{userInfo.nickname}}</h1>
        <router-link to="person"> <p  >查看并编辑个人资料</p></router-link>
      </div>
      <router-link to="person"><img class="avatar" :src="userInfo.avatar" /></router-link>
    </div>
      <cell  v-for="(item,index) in personCenterItems" :title="item.title" :link="item.to"  :key="index" >
        <span class="tips">{{item.tip}}</span><span  :class="`iconfont ${item.icon}`"></span>
      </cell>
  </div>
</template>
<script>
  import api from '@/utils/api';
  import { mapGetters } from 'vuex';
  import store from '@/vuex';
  import { CheckIcon, XButton, Cell, Group, Card } from 'vux';

  export default {
    name: 'person',
    data() {
      return {
        personCenterItems: [],
      };
    },
    computed: {
      ...mapGetters(['token', 'userInfo', 'vipInfo']),
    },
    created() {
      this.initData();
    },
    mounted() {
      if (this.vipInfo.isVip) {
        this.personCenterItems = [
          { title: '续费会员', to: 'card', icon: 'icon-IKsuHWPb', tip: '' },
          { title: '我的玥享卡', to: 'myCard', icon: 'icon-hsuEXGPzpb', tip: '' },
          { title: '我的订单', to: 'order', icon: 'icon-WechatIMG', tip: '' },
          { title: '玥享券', to: 'coupon', icon: 'icon-XqwxLVIJhm', tip: '' },
          // { title: '消费记录', to: 'purchases', icon: 'icon-MOppgEUos', tip: '' },
          { title: '邀请好友', to: 'share', icon: 'icon-dFgpwBF', tip: '推荐有礼' },
          { title: '我的收藏', to: 'collect', icon: 'icon-qXocbWDGu' },
          { title: '关于我们', to: 'introduction', icon: 'icon-LPaRCxiMw', tip: '' },
        ];
      } else {
        this.personCenterItems = [
          { title: '购买会员', to: 'card', icon: 'icon-IKsuHWPb', tip: '' },
          { title: '我的玥享卡', to: 'myCard', icon: 'icon-hsuEXGPzpb', tip: '' },
          { title: '我的订单', to: 'order', icon: 'icon-WechatIMG', tip: '' },
          { title: '玥享券', to: 'coupon', icon: 'icon-XqwxLVIJhm', tip: '' },
          // { title: '消费记录', to: 'purchases', icon: 'icon-MOppgEUos', tip: '' },
          { title: '邀请好友', to: 'share', icon: 'icon-dFgpwBF', tip: '推荐有礼' },
          { title: '我的收藏', to: 'collect', icon: 'icon-qXocbWDGu' },
          { title: '关于我们', to: 'introduction', icon: 'icon-LPaRCxiMw', tip: '' },
        ];
      }
    },
    methods: {
      async initData() {
        const res = await api.get(`/user/${this.token.user_id}`);
        store.dispatch('setUserInfo', res.data);
      },
    },
    components: {
      CheckIcon,
      XButton,
      Cell,
      Group,
      Card,
    },
  };
</script>
<style lang='less' scoped>
  .m-personCenter{
    background: #fff;
    min-height: 637px;
    .header{
      height: 52px;
      padding:30px 24px;
      .userInfo{
        float: left;
        color:#333;
        h1{
          font-size: 30px;
          margin-bottom:10px;
          font-weight: normal;
        }
        p{
          color:#666;
          font-size: 14px;
        }
      }
        .avatar{
          width: 65px;
          height: 65px;
          border-radius: 50%;
          float: right;
        }
    }
    .weui-cell{
      line-height: 25px;
      font-size: 15px;
      color:#333;
      padding:24px 25px;
      &:before{
       top:auto;bottom:0;
      }
      .tips{
        font-size: 12px;
        color:#333;
        margin-right:10px;
        display: inline-block;
        vertical-align: top;
        margin-top: 1px;
      }
      .weui-cell__ft{
        line-height: 25px;
        height: 25px;
        .iconfont{
          font-size: 30px;
          color:#000;
          vertical-align: middle;
        }
      }
    }
  }
</style>
