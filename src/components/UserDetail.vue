<template>
  <div class="user-detail">
    <div class="detail-wrapper">
      <div class="img">
        <img src="" class="avatar">
      </div>
      
      <ul class="detail-list">
        <div class="list-title">我的基本信息</div>
        <li class="detail-item" v-for="item in title">
          <span class="title">{{item}}</span><span>{{userInfo.sex}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import api from 'utils/api'
  import cookie from 'cookiejs'
  // import { mapGetters } from 'vuex'

  export default {
    name: 'UserDetail',
    data() {
      return {
        title: ['性别', '年龄', '职业', '所在地', '绑定手机', '用户注册时间'],
        userInfo: {},
      }
    },
    // comupted: {
    //   ...mapGetters(['userInfo', 'vipInfo']),
    // },
    created() {
      console.log('UserDetail created===========')
      this.init()
    },
    methods: {
      async init() {
        const res = await api.get(`/user/${cookie('userId')}`)
        console.log(res)
        const vip = res.data.user_vip
        this.$store.dispatch('setUserInfo', res.data)
        this.userInfo = this.$store.getters.userInfo
        if (!vip.isVip) {
          this.showShare = true
        } else {
          const timeDiff = vip.expire_time - Date.now() <= 60 * 60 * 24 * 90 * 1000
          if (timeDiff) {
            this.showShare = true
            this.showXufei = true
          }
        }
      },
    },
  }
</script>

<style lang="stylus" scoped>
  // @import '../assets/stylus/mixin.styl' 
  .user-detail
    padding: 24px
    // background: #ccc
    .detail-list
      .detail-item, .list-title
        padding: 36px 24px
        line-height: 32px
        border-bottom: 1px solid rgba(7,17,27,0.1)
</style>
