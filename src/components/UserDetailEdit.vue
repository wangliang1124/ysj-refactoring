<template>
  <div class="user-detail">
    <div class="detail-wrapper">
      <div class="avatar-wrapper">
        <img :src="userInfo.avatar" class="avatar">
        <div class="nickname">{{userInfo.nickname}}</div>
      </div>
      <ul class="detail-list">
        <h2 class="list-title">编辑基本信息</h2>
        <li class="detail-item">
          <span class="title">性别</span>
          <div class="sex">
            <label for="male">
              <input type="radio" name="sex" id="male" value="1" checked style="display:none;" v-model="sex">
              <span>男</span>
            </label>
            <label for="female">
              <input type="radio" name="sex" id="female" value="2" style="display:none;" v-model="sex">
              <span>女</span>
            </label>
          </div>
        </li>
        <li class="detail-item">
          <label for="age">
            <span class="title">年龄</span>
            <input type="number" name="age" min="12" max="9999" step="1" id="age" placeholder="输入年龄" v-model.number="age">
          </label>
        <li class="detail-item">
          <label for="job">
            <span class="title">职业</span> 
            <input type="text" placeholder="输入职业" id='job' v-model="job">
          </label>
        <li class="detail-item">
          <span class="title">所在地</span>
          <input type="text" placeholder="国家" id="country"  size="4" v-model="country">
          <input type="text" placeholder="省" id="province" size="4" v-model="province">
          <input type="text" placeholder="市" id="city" size="4" v-model="city">
        </li>
        <li class="detail-item">
          <label for="tel">
            <span class="title">绑定手机</span> 
            <input type="number" name="tel" placeholder="请输入手机号码" id="tel" min="0000" max="9999999999" v-model.number="phone" @input="checkMobile">
            <button class="btn_verify" @click="getVerifyCode">获取验证码</button>
          </label>
          <div class="verify" v-if="verifyShow">
            <span class="title">验证手机</span> 
            <input type="number" placeholder="请输入验证码" min="0000" max="99999999" v-model.number="verifyCode">
            <button class="btn_verify" @click="verify" placeholder="请输入验证码">绑定手机</button>
          </div>
        </li>
      </ul>
      <div class="warning">{{warningText}}</div>
      <div class="success">{{successText}}</div>
      <div class="btn">
        <span class="cancel" @click="showHome">取消</span><span class="confirm" @click="confirm">确认</span>
      </div>
    </div>
  </div>
</template>
<script>
  import api from 'utils/api'
  import cookie from 'cookiejs'
  import { mapGetters } from 'vuex'

  export default {
    name: 'UserDetail',
    data() {
      return {
        // title: ['性别', '年龄', '职业', '所在地', '绑定手机', '用户注册时间'],
        editable: true,
        sex: '1', // '1' 男， '2' 女
        age: '',
        job: '',
        province: '',
        city: '',
        country: '中国',
        phone: '',
        verifyCode: '',
        verifyShow: false,
        warningText: '',
        successText: '',
      }
    },
    computed: {
      ...mapGetters(['userInfo', 'vipInfo']),
    },
    created() {
      console.log('UserDetailEdit created===========')
    },
    updated() {
      console.log(this.userInfo.sex)
    },
    methods: {
      showHome() {
        this.$router.push({ path: '/user/detail' })
      },
      async confirm() {
        const userInfo = {
          sex: this.sex,
          age: this.age,
          job: this.job,
          province: this.province,
          city: this.city,
          country: this.country,
        }
        const res = await api.put(`/user/${cookie('userId')}`, userInfo)
        if (res.message === 'success') {
          this.$store.dispatch('setUserInfo', userInfo)
          this.$router.push({ path: '/user/detail' })
        }
      },
      checkMobile() {
        if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.phone))) {
          this.warningText = '不是完整的11位手机号或者正确的手机号前七位!'
          return false
        }
        this.warningText = ''
        return true
      },
      async getVerifyCode() {
        await api.post('/sms', { phone: this.phone })
        this.verifyShow = true
      },
      async verify() {
        try {
          const result = await api.post(`/sms/${this.verifyCode}`, { phone: this.phone })
          if (result) {
            this.successText = '绑定手机号成功!'
            this.verifyShow = false
          } else {
            this.warningText = '验证码无效!'
            return
          }
        } catch (err) {
          console.log(err.message)
        }
      },
    },
  }
</script>

<style lang="stylus" scoped>
  @import '../assets/stylus/mixin.styl' 
  
  .user-detail
    padding: 24px
    // background: #ccc
    .avatar-wrapper
      text-align: center
      .avatar
        width: 128px
        height: 128px
        border-radius: 50%
      .nickname
        margin-top: 24px
    .detail-list
      .list-title
        font-dpr(14px)
        font-weight: 700
      .detail-item, .list-title
        padding: 24px 24px
        line-height: 2
        border-bottom: 1px solid rgba(7,17,27,0.1)
        &:last-child
          border-bottom: 0
        .title
          // margin-right: 24px
        .sex
          float: right
          font-size: 0
          input[type="radio"]+span
            display: inline-block
            line-height: 48px
            width: 80px
            text-align: center
            font-dpr(12px)
            color: rgb(147, 153, 159)
            border-radius: 2px
            background-color: rgba(7,17,27,0.1) 
          input[type="radio"]:checked+span 
            color: #fff
            background-color: rgb(147, 153, 159)
        input[type="text"],input[type="number"]
          padding: 12px
          background-color: rgba(7,17,27,0.1)
        input[type="text"]:focus, input[type="number"]:focus
          background-color: rgba(7,17,27,0.1)
        .verify
          margin-top: 12px
        .btn_verify
          padding: 8px
          font-dpr(12px)
    .warning, .success
      padding: 0 24px
      color: rgb(240,20,20)
    .btn
      display: flex
      margin: 24px
      .cancel, .confirm
        flex: 1
        padding: 16px 0
        text-align: center
        border: 1px solid rgba(7, 17, 27, 0.3)
      .confirm
        margin-left: 48px
        background: #f3f5f7       
</style>
