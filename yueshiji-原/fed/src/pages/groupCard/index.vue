<template>
  <div class="m-card">
    <div class="imgWrap">
      <img slot="header" src="../../assets/card.png" style="width:100%;display:block;">
    </div>
    <div class="form">
      <div class="cardType">
        <radio :options="cardList" @on-change="changeCardType">
          <template scope="props" slot="each-item">
            <p class="info1">
              {{props.label.name}}
              <span class="price">{{props.label.price_unit}}</span>元/张
              <span v-for="item in props.label.restaurant_areas" class="tagCard">{{item.city}}</span>
            </p>
            <p class="info2">{{props.label.intro}}</p>
          </template>
        </radio>
      </div>
      <div class="ticket" @click="onChoosePayAction">
        <i style="color: #500050" class="iconfont icon-pay"></i><span class="name">支付方式</span>
        <span class="couponText">{{actionMenus[payway]}}</span>
      </div>
      <div class="ticket">
        <i style="color: #500050" class="iconfont icon-iconfontyiban"></i><span class="name">购买数量</span>
        <!-- <span class="couponText" @click="onShowCouponCode">{{couponText}}</span> -->
        <x-number @on-change='changeBuyAmount' v-model="buyAcount" :min='1' :max='100000' :step='1' style="display:inline-block;padding-top:0px;position:relative;top:18px;marginLeft: 5px"></x-number>
      </div>
      <p class="total"> 合计：¥ {{getPrice}}</p>

      <x-button type="primary" :show-loading="isLoading" @click.native="buy">立即购买</x-button>
      <div class="tips">购买即视为同意 <a href="javascript:;" @click="showNotice=true">玥食记免责申明</a></div>
    </div>
    <x-dialog v-model="showNotice" class="m-dialog m-dialog-notice" :scroll="true" :hide-on-blur="true">
      <p class="dialog-title">免责申明</p>
      <ol class="dialog-content">
        <li>1、玥享卡由北京玥食互动科技有限公司发行和管理（“发行方”），用户使用时须遵守本《玥享卡免责声明》及相关规定。</li>
        <li>2、购买、使用、持有本卡即视为用户同意并接受发行方的发行和管理。</li>
        <li>3、本卡不可挂失、不可兑换现金、不可再次销售。</li>
        <li>4、发行方对于本卡丢失、被盗或未经授权使用而导致的任何损失和损坏不承担任何责任。</li>
        <li> 5､用户因使用本卡已签约京、沪双城101家会员餐厅而产生的食品安全与责任、人身和财产安全均由消费餐厅负责，与发行方无关。</li>
        <li>6､会员餐厅的定制隐藏菜服务均以餐厅现场实际提供为准。</li>
        <li>7、用户因使用本卡已签约京、沪双城101家会员餐厅及菜品以外的服务或菜品由用户本人承担相关费用，用户须配合会员餐厅办理消费记录，因用户不提供配合义务而导致本卡无法使用或失效的责任由用户自行承担。</li>
        <li>8、本卡所载用户信息均为真实有效信息，如用户使用非本人信息进行注册或消费记录，造成他人信息泄露或损失，与发行方无关。</li>
        <li> 9、因用户保管、操作不当造成本卡失效或无法使用由本人承担。</li>
        <li> 10、因用户个人信息泄露导致他人持有、消费使用本卡与发行方及会员餐厅均无关。</li>
        <li> 11、本卡使用完毕相应的次数或服务，或者超出有效期，本卡即自动失效。</li>
        <li>12、发行方对异常卡片有权停止全部或部分服务内容。异常情况包括但不限于会员餐厅暂停、变更、调整，用户或会员餐厅申请或投诉卡片信息有非法信息内容等，具体以发行方微信公众号通知内容为准。</li>
        <li>13、发行方配合司法机关等工作需提供卡片用户信息时，不视为发行方侵权。</li>
        <li>14、用户使用本卡期间，反馈意见或建议的电话 <a href="tel:021-32035192">021-32035192</a>& 邮箱<a href="mailto:yueshijihudong@yueshiji.com.cn">yueshijihudong@yueshiji.com.cn</a></li>
        <li>15、版权所有©2017北京玥食互动科技有限公司。最终解释权归发行方所有。</li>
      </ol>
      <div @click="showNotice=false" class="dialog-footer">
        <x-icon type="ios-close-empty" size="30"></x-icon>
      </div>
    </x-dialog>
    <x-dialog v-model="showPayInfo" class="m-dialog m-dialog-notice" :scroll="true" :hide-on-blur="true">
      <p class="dialog-title">订单创建成功,请尽快付款!</p>
      <ol class="dialog-content">
        <li v-if="orderNo">订单号: {{orderNo}}</li>
        <li v-if="totalFee">总金额: {{totalFee}}元</li>
        <li>开户行:&nbsp&nbsp&nbsp&nbsp广发银行</li>
        <li>开户网点: 广发银行北京朝阳北路支行</li>
        <li>银行账号: 9550880200259600164</li>
        <li>公司名称: 北京玥食互动科技有限公司</li>
        <li>信用代码: 9111011MA003BP53C</li>
        <li>电话号码: <a href="tel:021-32035192">021-32035192</a></li>
        <li>邮箱: <a href="mailto:yueshijihudong@yueshiji.com.cn">yueshijihudong@yueshiji.com.cn</a></li>
      </ol>
      <x-button mini 
        v-clipboard:copy="message"
        v-clipboard:success="onCopy"
      >{{copyText}}</x-button>
      <div @click="showPayInfo=false" class="dialog-footer">
        <x-icon type="ios-close-empty" size="30"></x-icon>
      </div>
    </x-dialog>
    <actionsheet v-model="showPayAction" :menus="actionMenus" @on-click-menu="changePayAction"></actionsheet>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import wxconfig from '@/utils/wx';
  // import util from '@/utils/util';
  import api from '@/utils/api';
  import store from '@/vuex';
  import { CheckIcon, XButton, Cell, Radio, XDialog, Popup, Scroller, Actionsheet, XNumber } from 'vux';

  // const isFromShare = util.getSearchParam('inviter_id');

  export default {
    name: 'card',
    created() {
      this.initData();
    },
    computed: {
      ...mapGetters(['token', 'userInfo', 'vipInfo']),
      getPrice() {
        const price = this.cardPrice * this.buyAcount;
        return price >= 0 ? Number(price).toFixed(2) : 0.00;
      },
    },
    data() {
      return {
        orderNo: null,
        showPayInfo: false,
        showPayAction: false,
        showNotice: false,
        showGotCoupon: false,
        showActivationCode: false,
        showCouponCode: false,
        actCode: '',
        cardId: '',
        couponId: '',
        couponType: '',
        cardList: [],
        cardPrice: 0,
        couponPrice: 0,
        cardType: 1,
        isLoading: false,
        couponText: '请选择优惠券',
        showCoupon: false,
        couponList: [],
        actionMenus: {
          pay1: '微信支付',
          pay2: '对公打款',
        },
        payway: 'pay1',
        buyAcount: 1,
        price: 0,
        totalFee: 0,
        copyText: '点我复制',
        message: `
        开户行: 广发银行
        开户网点: 广发银行北京朝阳北路支行
        银行账号: 9550880200259600164
        公司名称: 北京玥食互动科技有限公司
        信用代码: 9111011MA003BP53C
        电话号码: 021-32035192
        邮箱: yueshijihudong@yueshiji.com.cn`,
      };
    },
    methods: {
      onCopy() {
        this.copyText = '已复制到剪切板';
      },
      onShowCouponCode() {
        if (this.couponList.length === 0) {
          this.showCoupon = false;
        } else {
          this.showCoupon = true;
        }
      },
      changeBuyAmount() {
        const price = (this.cardPrice * this.buyAcount) - this.couponPrice;
        this.price = Number(price).toFixed(2);
      },
      onChoosePayAction() {
        this.showPayAction = true;
      },
      changePayAction(val) {
        this.payway = val;
      },
      async checkUserType() {
        // todo 发起判断新老用户的请求和领券操作
        const success = await api.get(`/user/${this.token.user_id}`);
        if (success) {
          this.showGotCoupon = true;
        } else {
          this.$vux.toast.text('对不起，您是老用户，不能领券');
        }
      },
      openSao() {
        wxconfig.openSao((url) => {
          url.split('?')[1].split('&').forEach((q) => {
            if (q.startsWith('code=')) {
              this.code = q.split('=')[1];
            }
          });
        });
      },
      async doActivationCode() {
        if (!this.code) {
          this.$vux.toast.text('请输入激活码');
          return;
        }
        this.showActivationCode = false;
        try {
          const res = await api.post('/activation/use', { code: this.code });
          const { data } = res;
          this.code = '';
          this.$vux.toast.text('激活成功', 'middle');
          store.dispatch('setVIPInfo', data);
          setTimeout(() => {
            this.$router.push({ name: 'myCard' });
          }, 1000);
        } catch (e) {
          this.code = '';
          this.$vux.toast.text(' 激活码激活失败，请检查激活码或重试', 'middle');
        }
      },
      changeCardType(val) {
        this.cardList.forEach((item) => {
          if (item.key === val) {
            this.cardPrice = item.value.price_unit;
            this.cardId = item.value.id;
          }
        });
      },
      chooseCoupon(val) {
        this.couponList.forEach((item) => {
          if (item.value.id === val) {
            this.couponPrice = item.value.value || 0.00;
            this.couponText = item.value.name;
            this.couponId = item.value.id;
            this.couponType = item.value.couponType;
          }
        });
        this.showCouponCode = false;
      },
      parseCard(list) {
        return list.map(
          item => ({ key: item.id, value: item }),
        );
      },
      parseCoupon(list) {
        return list.filter(item => item.status.status === '1').map(
          item => ({ key: item.id, value: item }),
        );
      },
      addText(list, text, type) {
        list.forEach((item) => {
          item.couponText = text || '';
          item.couponType = type;
        });
        return list;
      },
      async buy() {
        if (!this.isLoading) {
          const param = {};
          if (!this.cardId) {
            this.$vux.toast.text('请选择会员卡类型', 'middle');
            return;
          }
          this.isLoading = true;
          param.card_id = this.cardId;
          const me = this;
          window.wx.openAddress({
            async success(address) {
              if (address.errMsg === 'openAddress:ok') {
                param.count = me.buyAcount;
                param.payway = me.payway;
                param.userName = address.userName;
                param.telNumber = address.telNumber;
                param.nationalCode = address.nationalCode;
                param.postalCode = address.postalCode;
                param.provinceName = address.provinceName;
                param.cityName = address.cityName;
                param.countryName = address.countryName;
                param.detailInfo = address.detailInfo;
                if (me.payway === 'pay1') {
                  const res = await api.post('/order/group', param);
                  window.wx.chooseWXPay({
                    ...res.data.payargs,
                    async success() {
                      me.isLoading = false;
                      const payRes = await api.post('/order/pay/group', res.data);
                      if (payRes.message === 'success') {
                        // window.location.href = `http://${location.host}/myCard`;
                        me.$vux.toast.text('购买成功,不日您将收到平台寄出的预售激活卡片,敬请期待!', 'middle');
                      }
                    },
                    cancel() {
                      me.isLoading = false;
                    },
                  });
                } else {
                  const res = await api.post('/order/group', param);
                  me.isLoading = false;
                  me.orderNo = res.data.order_num;
                  me.totalFee = res.data.total_fee;
                  me.message = `
                  订单号: ${me.orderNo}
                  总金额: ${me.totalFee}元
                  开户行: 广发银行
                  开户网点: 广发银行北京朝阳北路支行
                  银行账号: 9550880200259600164
                  公司名称: 北京玥食互动科技有限公司
                  信用代码: 9111011MA003BP53C
                  电话号码: 021-32035192
                  邮箱: yueshijihudong@yueshiji.com.cn
                  `;
                  me.showPayInfo = true;
                }
              } else {
                me.isLoading = false;
              }
            },
            cancel() {
              me.isLoading = false;
            },
            fail() {
              me.isLoading = false;
            },
          });
        } else {
          this.$vux.toast.text('请勿重复点击', 'middle');
        }
      },
      async initData() {
        // const query = this.$route.query;
        // const code = query.code;
        // const inviterId = query.inviter_id;
        // if (code) {
        //   const user = await api.post('/user/signin', { code, inviterId });
        //   store.dispatch('SET_USER', user.data);
        // }
        // const user = await api.get(`/user/${this.token.user_id}`);
        // store.dispatch('setUserInfo', user.data);
        // if (isFromShare) {
        //   this.checkUserType();
        // }
        const res = await api.get('/card');
        this.cardList = this.parseCard(res.data);
        const coupon = this.addText([], '玥享券', 1);
        const restaurantCoupon = this.addText([], '尊享券', 2);
        const list = coupon.concat(restaurantCoupon);
        this.couponList = this.parseCoupon(list);
        if (!this.couponList.length) {
          this.couponText = '没有可用玥享券';
        }
      },
    },
    components: {
      CheckIcon,
      XButton,
      Cell,
      Radio,
      XDialog,
      Popup,
      Scroller,
      Actionsheet,
      XNumber,
    },
  };
</script>
<style lang='less'>
  .weui-cell:before {
    border-top: none;
  }
  .vux-actionsheet-menu-default{
    padding:15px 0;
  }
  .tagCard{
    height: 22px;
    line-height: 22px;
    font-size: 8px;
    margin-left: 5px;
    color: #fff;
    background: #753775;
    padding: 2px;
  }
  .weui-toast__content{
    font-size: 12px;
  }
  .m-card {
    background: #fff;
    padding-top: 20px;
    .imgWrap {
      padding: 0 10px;
    }
    .weui-btn_primary {
      background: #000;
      width: 90%;
      &:active {
        background: #2b2b2b !important;
      }
    }
    .form {
      background: #eee;
      .cardType {
        background: #fff;
        padding: 0 14px;
        line-height: 32px;
        font-size: 15px;
        .info1 {
          color: #333;
        }
        .info2 {
          color: #666;
          font-size: 12px;;
        }
        .price {
          color: #500050;
        }
        .weui-check:checked + .weui-icon-checked:before {
          line-height: 30px;
          width: 30px;
          height: 30px;
          font-size: 18px;
          border-radius: 50%;
          background: #000;
          border: 1px solid #000;
          color: #fff;
          margin: 0;
          text-align: center;
        }
        .weui-icon-checked {
          width: 30px;
          height: 30px;
          border: 1px solid #cccccc;
          border-radius: 50%;
        }
      }
      .ticket {
        height: 65px;
        line-height: 65px;
        font-size: 15px;
        background: #fff;
        margin-top: 10px;
        padding-left: 24px;
        .icon-youhuiquan {
          color: #6b206b
        }
        .name {
          margin: 0 10px;
          font-size: 15px;
        }
        .couponText {
          margin-left: 20px;
          color: #c8c8c8;
        }
        .price {
          color: #6b206b;
          float: right;
          margin-right: 24px;
        }
      }
      .total {
        margin-left: 24px;
        font-size: 15px;
        height: 55px;
        line-height: 55px;
      }
      .activation {
        float: right;
        margin-right: 24px;
        font-size: 15px;
        height: 55px;
        line-height: 55px;
        color: #6b206b;
      }
      .tips {
        margin-top: 8px;
        text-align: center;
        color: #ccc;
        font-size: 12px;;
        margin-bottom: 20px;
        a {
          margin-left: 5px;
          color: #3caaf0;
        }
      }

    }
    .m-dialog {
      .dialog-title {
        padding: 25px 0;
        font-size: 16px;
        color: #333;
      }
      .dialog-content {
        height: 150px;
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
        margin-top: 10px;
        .dialog-close {
          margin: 8px 0;
          color: #999;
        }
      }
    }
    .m-dialog-notice{
      .dialog-content{
        li{
          line-height: 20px;
          word-break: break-all;
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
          img{
            float: right;
            height: 30px;
            padding: 5px 5px;
            border-left:1px solid #ddd;
            background-color: #eeeeee;
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
    .m-dialog-coupon {
      background: #fff;
      .content{
        height: 300px;
        overflow-y: auto;
        overflow-x:hidden ;
      }
      h2{
        width: 100%;
        background: #fff;
        padding:20px 0;
        text-align: center;
        font-size: 14px;
      }
      .couponList{
        background: #fff;
        padding: 0 14px;
        line-height: 32px;
        font-size: 15px;
        height:350px;
        .weui-check:checked + .weui-icon-checked:before {
          line-height: 20px;
          width: 20px;
          height: 20px;
          font-size: 14px;
          border-radius: 50%;
          background: #000;
          border: 1px solid #000;
          color: #fff;
          margin: 0;
          text-align: center;
        }
        .weui-icon-checked {
          width: 20px;
          height: 20px;
          border: 1px solid #cccccc;
          border-radius: 50%;
        }
        .cardType {
          background: #fff;
          padding: 0 14px;
          line-height: 32px;
          font-size: 15px;
          .info1 {
            color: #333;
          }
        }
        .price {
          margin-left: 35px;
        }
      }
      .couponOK{
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 14px;
        border-top:1px solid #eaeaea;
        letter-spacing: 5px;
      }
    }
    .m-gotCoupon{
      left: 0;
      top:0;
      right:0 ;
      bottom: 0;
      color: #ffffff;
      .weui-dialog{
        background: transparent;
      }
      .text{
        font-size: 20px;
        margin-top: 30px;
      }
      .closeBtn{
        margin-top:20px;
        svg{
          fill: #fff;
          border: 1px solid #fff;
          border-radius: 50%;
        }
      }
    }
  }
</style>
