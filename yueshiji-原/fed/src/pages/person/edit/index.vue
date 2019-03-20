<template>
  <div class="m-personEdit">
    <group label-width="4.0em" label-margin-right="1em" label-align="left">
      <x-number v-if="key === 'age'" title="年龄" v-model="age" :min="1" :max="100" button-style="round"  fillable   @on-change="changeAge"></x-number>
      <radio v-if="key === 'sex'" :options="sexList" v-model="userInfo.sex.sex" @on-change="changeSex"></radio>
      <x-input v-if="key === 'job'" title="职业" placeholder="请输入职业" v-model="userInfo.job" @on-change="changeJob"></x-input>
      <x-input v-if="key === 'phone'" title="手机号" placeholder="请输入手机号" v-model="userInfo.phone"  china-mobile='china-mobile' :min='11' :max='11'  @on-change="changePhone">
      </x-input>
      <x-input v-if="showCodeInput" title="验证码" placeholder="请输入验证码" v-model="code" :min='6' :max='6'>
      </x-input>
      <x-address v-if="key === 'location'" title="所在地" :raw-value='true'	 v-model="address"  :list="addressData"></x-address>
    </group>
    <x-button @click.native="getCode" v-if="key === 'phone' && showCodeBtn" type="primary">获取验证码</x-button>
    <x-button v-if="showCommitBtn" type="primary" @click.native="commit">提交</x-button>
  </div>
</template>
<script>
  import api from '@/utils/api';
  import store from '@/vuex';
  import { Group, XInput, PopupPicker, XNumber, ChinaAddressData, XAddress, Radio, XButton } from 'vux';
  import { mapGetters } from 'vuex';

  export default{
    computed: {
      ...mapGetters(['token', 'userInfo']),
    },
    created() {
      if (this.$route.params.key === 'location') {
//        this.address = [this.userInfo.province, this.userInfo.city];
        this.$watch('address', (val) => {
          this.showCommitBtn = !!val;
          this.province = val[0];
          this.city = val[1];
          this.country = val[2];
        });
      }
      console.log(ChinaAddressData);
    },
    data() {
      return {
        showCommitBtn: false,
        showCodeBtn: false,
        showVerifyBtn: false,
        showCodeInput: false,
        address: [],
        sexList: [{ key: '1', value: '男' }, { key: '2', value: '女' }],
        key: this.$route.params.key,
        addressData: ChinaAddressData,
        age: 18,
        phone: '',
        job: '',
        province: '',
        city: '',
        code: null,
        country: '',
      };
    },
    methods: {
      changeJob(val) {
        this.job = val;
        this.showCommitBtn = !!val;
      },
      changeAge(val) {
        this.age = val;
        this.showCommitBtn = !!val;
      },
      changePhone(val) {
        this.phone = val;
        const myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (myreg.test(this.phone)) {
          this.showCodeBtn = true;
        }
      },
      async changeSex(val) {
        const res = await api.put(`/user/${this.token.user_id}`, { sex: val });
        if (res.message === 'success') {
          store.dispatch('editUserInfo', {
            ...this.userInfo,
            sex: val,
          });
        }
        this.$router.go(-1);
      },

      async commit() {
        const param = {};
        if (this.key === 'location') {
          param.province = this.province;
          param.city = this.city;
          param.country = this.country;
        } else if (this.key === 'phone') {
          const myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
          if (!myreg.test(this.phone)) {
            this.$vux.toast.text('请输入正确的手机号!');
            return;
          }
          try {
            const result = await api.post(`/sms/${this.code}`, { phone: this.phone });
            if (result) {
              this.$vux.toast.text('绑定手机号成功!');
              param[this.key] = this[this.key];
            } else {
              this.$vux.toast.text('验证码无效!');
              return;
            }
          } catch (err) {
            this.$vux.toast.text(err.message);
            return;
          }
        } else {
          param[this.key] = this[this.key];
        }
        const res = await api.put(`/user/${this.token.user_id}`, param);
        if (res.message === 'success') {
          store.dispatch('editUserInfo', {
            ...this.userInfo,
            ...res.data,
          });
        }
        this.$router.go(-1);
      },
      async getCode() {
        try {
          const myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
          if (!myreg.test(this.phone)) {
            this.$vux.toast.text('请输入正确的手机号!');
            this.showCodeBtn = false;
            return;
          }
          await api.post('/sms', { phone: this.phone });
          this.$vux.toast.text('验证码发送成功');
          this.showCodeBtn = false;
          this.showCodeInput = true;
          this.showCommitBtn = true;
        } catch (err) {
          this.$vux.toast.text(err.message);
        }
      },
    },
    components: {
      Group,
      XInput,
      PopupPicker,
      XAddress,
      XNumber,
      Radio,
      XButton,
    },
  };
</script>
<style lang='less'>
  .m-personEdit{
    .weui-btn_primary {
      margin-top: 20px;
      background: #000;
      width: 90%;
      &:active {
        background: #2b2b2b !important;
      }
    }
    .vux-number-round .vux-number-selector-plus, .vux-number-round .vux-number-selector-sub{
      color: #000;
      border: 1px solid #000;
      svg{
        fill: #000;
      }
    }
  }
</style>
