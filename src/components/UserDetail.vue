<template>
  <div class="user-detail">
    <div class="detail-wrapper">
      <div class="avatar-wrapper">
        <img :src="userInfo.avatar" class="avatar">
        <div class="nickname">{{userInfo.nickname}}</div>
      </div>
      <ul class="detail-list">
        <h2 class="list-title">基本信息<span class="edit" @click="editInfo">编辑</span></h2>
        <li class="detail-item">
          <span class="title">性别</span><span class="info" v-if="userInfo.sex">{{userInfo.sex.info}}</span>
        </li>
        <li class="detail-item">
          <span class="title">年龄</span><span class="info">{{userInfo.age}}</span>
        </li>
        <li class="detail-item">
          <span class="title">职业</span><span class="info">{{userInfo.job}}</span>
        </li>
        <li class="detail-item">
          <span class="title">所在地</span><span class="info">{{userInfo.province}},{{userInfo.city}},{{userInfo.country}}</span>
        </li>
        <li class="detail-item">
          <span class="title">手机</span><span class="info">{{userInfo.phone}}</span>
        </li>
        <li class="detail-item">
          <span class="title">注册时间</span><span class="info">{{userInfo.created_at | formatDate}}</span>
        </li>
      </ul>
      <div class="btn">
        <span class="back" @click="showHome">返回</span>
      </div>
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
      editInfo() {
        this.$router.push('/user/edit')
      },
      showHome() {
        this.$router.push({ path: '/user' })
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
        position: relative
        // display: inline-block
        font-dpr(14px)
        font-weight: 700
        .edit
          position: absolute
          float: right
          right: 0
          top: 50%
          transform: translateY(-50%)
          padding: 4px 20px
          color: rgb(160, 20, 20)
      .detail-item, .list-title
        padding: 36px 24px
        line-height: 32px
        border-bottom: 1px solid rgba(7,17,27,0.1)
        .info
          float: right
    .btn
      display: flex
      margin: 24px
      .back
        flex: 1
        padding: 16px 0
        text-align: center
        border: 1px solid rgba(7, 17, 27, 0.3)
</style>
