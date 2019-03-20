<template>
    <div class="m-person">
      <div class="imgWrap" >
        <img src="/static/背景.jpg" style="width:100%;display:block;" />
        <div class="avatarInfo">
        <img class="avatar" :src="userInfo.avatar"   @click="chooseImage" />
        <p class="tips">{{userInfo.nickname}}<img class="isVip" src="../../assets/huiyuan.png" v-if="vipInfo.isVip"/></p>
          <template>
            <router-link  v-if='!vipInfo.isVip'  to="card"><p class="tips">即刻成为玥享会员,开启轻奢美食之旅</p></router-link>
            <p class="tips" v-else>会员有效期：{{vipInfo.expire_time | format('YYYY-MM-DD')}}</p>
          </template>
        </div>
      </div>
      <cell title="我的基本信息"  />
      <cell title="性别" :value="getSex" :link="{name:'personDetailEdit',params:{key:'sex'}}"  />
      <cell title="年龄" :value="userInfo.age" :link="{name:'personDetailEdit',params:{key:'age'}}"  />
      <cell title="职业" :value="userInfo.job" :link="{name:'personDetailEdit',params:{key:'job'}}"  />
      <cell title="所在地" :value="getLocation" :link="{name:'personDetailEdit',params:{key:'location'}}" />
      <cell title="绑定手机号" :value="userInfo.phone" @click.native='bindPhone'  />
      <cell>
        <span slot='title' >账户注册时间：{{userInfo.created_at | format('YYYY-MM-DD')}}</span>
      </cell>
    </div>
</template>
<script>
  import api from '@/utils/api';
  import { mapGetters } from 'vuex';
  import { Cell, Card } from 'vux';
  import wxconfig from '@/utils/wx';
  import store from '@/vuex';


  export default {
    name: 'person',
    computed: {
      ...mapGetters(['token', 'userInfo', 'vipInfo']),
      getSex() {
        if (this.userInfo.sex) return this.userInfo.sex.info;
        return '未知';
      },
      getLocation() {
        let provinceText = '';
        let cityText = '';
        let countryText = '';
        provinceText = this.userInfo.province;
        cityText = this.userInfo.city;
        countryText = this.userInfo.country;
        return provinceText + cityText + countryText;
      },
    },
    data() {
      return {
        localIds: '',
      };
    },
    methods: {
      async chooseImage() {
        wxconfig.chooseImage(
          (res) => {
            store.dispatch('editUserInfo', {
              ...this.userInfo,
              avatar: res,
            });
          }, async (val) => {
          const res = await api.post('/upload/wx', { media_id: val });
          store.dispatch('editUserInfo', {
            ...this.userInfo,
            avatar: res.data.url,
          });
        },
        );
      },
      bindPhone() {
        if (this.userInfo.phone) {
          this.$vux.toast.text('手机号已绑定!');
        } else {
          this.$router.push({
            name: 'personDetailEdit',
            params: {
              key: 'phone',
            },
          });
        }
      },
    },
    components: {
      Cell,
      Card,
    },
  };
</script>
<style lang='less'>
  .m-person{
    background: #fff;
    .imgWrap{
      position: relative;
      .avatarInfo{
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        text-align: center;
        .avatar{
          width: 114px;
          height: 114px;
          border-radius: 50%;
        }
        .tips{
          margin-top:15px;
          font-size: 12px;
          color:#fff;
          white-space: nowrap;
          .isVip{
            height:12px;
            margin-left:10px;
          }
        }
      }

    }
    .weui-cell{
      height:30px;
      font-size: 14px;
      color:#333;

    }
    .createTime{
      font-size: 15px;
    }
  }
</style>
