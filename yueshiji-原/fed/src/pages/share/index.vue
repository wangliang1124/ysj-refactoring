<template>
  <div class="m-share">
    <div class="voucher voucher-1">
      <div class="font-1">{{voucherOfShare.action}}</div>
      <div class="high-light"><span class="font-2">{{voucherOfShare.voucherPrice}}</span><span class="font-3">元</span></div>
      <div><span class="font-1">{{voucherOfShare.voucherName}}</span></div>
    </div>
    <div class="voucher voucher-2">
      <!-- <div class="font-4 pb-15">{{voucherFromFriends.action}}</div> -->
      <!-- <div class="font-1">{{voucherFromFriends.voucherName}}</div> -->
      <div><img src="../../assets/share.png" style="width: 72px; margin: 5px 0;"></div>
      <button class="share-btn" @click="shareFriends">邀请好友</button>
      <div class="rule" @click="showNotice = true">使用规则<i class="iconfont icon-wenhao"></i></div>
    </div>
    <div class="records" v-if="records.length != 0">
      <span class="font-4">邀请记录</span>
      <div v-for="record in records" class="record">
        <span class="user">{{record.user.nickname}}</span>
        <span class="state">{{record.status.info}}</span>
      </div>
    </div>
    <x-dialog v-model="showNotice" class="m-dialog" :scroll="false"  :hide-on-blur="true">
      <p class="dialog-title">使用规则</p>
      <div class="dialog-content">
        <h3><span class="point">·</span>优惠券类型</h3>
        <p>玥食记礼券：本券不兑换现金、不找零、不与其他活动同时使用，使用本券不开票、不找零、不兑换现金；</p>
      </div>
      <div @click="showNotice=false" class="dialog-footer">
        <x-icon type="ios-close-empty" size="30"></x-icon>
      </div>
    </x-dialog>
    <x-dialog v-model="showNotice2" class="m-dialog" :scroll="false"  :hide-on-blur="true">
      <p class="dialog-title">邀请好友</p>
      <div class="dialog-content">
        <p>微信限制只允许从页面右上角进行分享</p>
        <p>1.点击页面右上角菜单栏</p>
        <p>2.选择发送给朋友或者分享到朋友圈</p>
        <p>3.坐等奖励</p>
      </div>
      <div @click="showNotice2=false" class="dialog-footer">
        <x-icon type="ios-close-empty" size="30"></x-icon>
      </div>
    </x-dialog>
  </div>
</template>

<script>
  // import { mapGetters } from 'vuex';
  import api from '@/utils/api';
  import { XDialog } from 'vux';
  import wxconfig from '@/utils/wx';

  export default{
    name: 'share',
    data() {
      return {
        showNotice2: false,
        showNotice: false,
        voucherOfShare: {
          action: '分享此页面给好友,您和好友将获得',
          voucherPrice: 0,
          voucherName: '玥享卡年卡抵用券',
        },
        voucherFromFriends: {
          action: '好友首次开通钥享卡会员',
          voucherName: '您将获玥享藏葡萄酒一瓶',
        },
        records: [],
        userInfo: {},
        // shareData: {},
      };
    },
    created() {
      this.initData();
    },
    // computed: {
    //   ...mapGetters(['userInfo']),
    // },
    methods: {
      async initData() {
        const res = await api.get('/invite');
        this.records = res.data.rows;
        const res2 = await api.get('/system');
        this.voucherOfShare.voucherPrice = res2.data.INVITE_money || 101;
        this.wxShare(); // 微信自定义分享功能，不知道为什么只有放在这里才生效
      },
      wxShare() {  // 微信分享功能
        wxconfig.initWx();
        const wx = window.wx;
        wx.ready(() => {
          // 初始化微信自定义分享参数；获取本地userInfo，防止刷新后无法从vuex store中取值
          this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
          const shareData = {
            title: `${this.userInfo.nickname}赠送了您一张${this.voucherOfShare.voucherPrice}元玥享代金券`,
            desc: '立即加入玥享会员,开启尊享美食之旅',
            imgUrl: 'http://ysj.tcfellow.com:3000/assets/uploads/0726_YUE_icons_FINAL_OUTLINE-30.png',
            link: `http://${location.host}/card?inviter_id=${this.userInfo.id}`,
          };
          // console.log('222222222222222222222222');
          // console.log(shareData);
          wx.onMenuShareTimeline(shareData);
          wx.onMenuShareAppMessage(shareData);
        });
      },
      shareFriends() {
        this.showNotice2 = true;
      },
    },
    components: {
      XDialog,
    },
  };
</script>

<style scoped lang='less'>
  .m-share{
    background: #eee;
    overflow: hidden;
    .font-1{
      font-size: 14px;
    }
    .font-2{
      font-size: 99px;
    }
    .font-3{
      font-size: 15px;
    }
    .font-4{
      font-size: 16px;
    }
    .high-light{
      color: #6a256a;
    }
    .pb-15{
      padding-bottom: 15px;
    }
    .voucher{
      background: #fff;
      text-align: center;
      margin: 0 10px;

      &.voucher-1{
        position: relative;
        padding: 35px 0 25px 0;
        border-bottom: 2px dotted #eee;
        &:before, &:after{
          content: '';
          position: absolute;
          bottom: -16px;
          right: -16px;
          width: 32px;
          height: 32px;
          border-radius: 64px;
          background-color: #eee;
        }
        &:after{
          left: -16px;
        }
      }
      &.voucher-2{
        padding: 40px 0 35px 0;
      }
    }
    .share-btn{
      margin-bottom: 15px;
      width: 250px;
      height: 41px;
      line-height: 41px;
      text-align: center;
      color: #9a9a9a;
      background: #000;
      border: none;
    }
    .rule{
      font-size: 12px;
      color: #999;
    }
    .records{
      margin-top: 10px;
      background: #fff;
      text-align: center;
      padding-bottom: 10px;
      .font-4{
        display: inline-block;
        margin: 25px 0 15px;
      }
      .record{
        padding: 0 24px;
        height: 33px;
        line-height: 33px;
        .user{
          float: left;
        }
        .state{
          float: right;
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

  }
</style>
