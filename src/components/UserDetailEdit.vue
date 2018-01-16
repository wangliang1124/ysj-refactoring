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
          <input type="radio" name="sex" value="male" checked>男
          <input type="radio" name="sex" value="female">女
        </li>
        <li class="detail-item">
          <span class="title">年龄</span>
          <input type="date" name="user_date" />
          <input type="range" name="age" min="12" max="60" step="1" value="18" />
        <li class="detail-item">
          <span class="title">职业</span> 
          <input type="text" placeholder="输入职业">
        <li class="detail-item">
          <span class="title">所在地</span>
          <input type="text" placeholder="输入所在地">
        </li>
        <li class="detail-item">
          <span class="title">绑定手机</span> 
          <input type="number" name="tel" min="10000000000" max="19999999999" placeholder="请输入手机号码" />
        </li>
        <li class="detail-item">
          <span class="title">注册时间</span><span class="info">{{userInfo.created_at | formatDate}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import api from 'utils/api'
  import cookie from 'cookiejs'
  import FormatDate from 'utils/date'
  // import { mapGetters } from 'vuex'

  export default {
    name: 'UserDetail',
    data() {
      return {
        // title: ['性别', '年龄', '职业', '所在地', '绑定手机', '用户注册时间'],
        userInfo: {},
        editable: true,
      }
    },
    // comupted: {
    //   ...mapGetters(['userInfo', 'vipInfo']),
    // },
    created() {
      console.log('UserDetail created===========')
      this.init()
    },
    filters: {
      formatDate(time) {
        const date = new Date(time)
        return FormatDate(date, 'yyyy-MM-dd')
      },
    },
    methods: {
      async init() {
        const res = await api.get(`/user/${cookie('userId')}`)
        this.userInfo = res.data.user_info
        this.$store.dispatch('setUserInfo', res.data)
        // const vip = res.data.user_vip
        // if (!vip.isVip) {
        //   this.showShare = true
        // } else {
        //   const timeDiff = vip.expire_time - Date.now() <= 60 * 60 * 24 * 90 * 1000
        //   if (timeDiff) {
        //     this.showShare = true
        //     this.showXufei = true
        //   }
        // }
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
        border-radius: 50%
      .nickname
        margin-top: 24px
    .detail-list
      .list-title
        font-dpr(14px)
        font-weight: 700
      .detail-item, .list-title
        padding: 36px 24px
        line-height: 32px
        border-bottom: 1px solid rgba(7,17,27,0.1)
        .info
          float: right
          &.editable
            padding: 4px 20px
            background: #ccc
</style>
