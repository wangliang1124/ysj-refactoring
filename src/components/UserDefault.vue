<template>
  <div class="user-wrapper">
    <div class="header">
      <div class="person">
        <h1 class="name">{{userInfo.nickname}}</h1>
        <router-link to="/user/detail"><span class="edit">查看并编辑个人资料</span></router-link>
      </div>
      <div class="avatar"> <!-- src="../assets/img/avatar.jpg" -->
        <router-link to="/user/detail"><img :src="userInfo.avatar" width="128" height="128"></router-link>
      </div>
    </div>
    <!-- <split></split> -->
    <div class="content-wrapper">
      <ul class="content">
        <li class="item" v-for="item in list">
          <!-- <a href="">{item.title} </a> -->
          <router-link class="link" :to="item.path">{{item.title}}
            <i class="iconfont" :class="item.icon"></i>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  // import { mapGetters } from 'vuex'

  export default {
    name: 'UserDefault',
    data() {
      return {
        list: [
          { title: '购买会员', path: '/card', icon: 'icon-IKsuHWPb' },
          { title: '我的玥享卡', path: '/user/mycard', icon: 'icon-hsuEXGPzpb' },
          { title: '我的订单', path: '/user/order', icon: 'icon-WechatIMG' },
          { title: '玥享卷', path: '/user/coupon', icon: 'icon-XqwxLVIJhm' },
          { title: '邀请好友', path: '/user/share', icon: 'icon-dFgpwBF' },
          { title: '我的收藏', path: '/user/favorite', icon: 'icon-qXocbWDGu' },
          { title: '关于我们', path: '/aboutus', icon: 'icon-LPaRCxiMw' },
        ],
        test: '',
        // userInfo: {},
      }
    },
    computed: {
      // ...mapGetters(['userInfo', 'vipInfo']),
      userInfo() {
        return this.$store.getters.userInfo || {}
      },
    },
    created() {
      console.log('==========userDefault created============')
      // console.log(this.$store.getters.userInfo)
      // this.userInfo = this.$store.getters.userInfo
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../assets/stylus/mixin.styl'
  
  .user-wrapper
     padding: 36px
    .header
      display: flex
      padding: 36px 24px 80px 24px
      font-size: 0
      .person
        flex: 1
        .name
          margin-bottom: 12px
          font-dpr(28px)
          color: rgb(7, 17, 27)
        .edit
          font-dpr(12px)
      .avatar
        flex: 0 0 128px
        width: 128px
        height: 128px
    .content-wrapper
      .content
        .item
          padding: 36px 24px 36px 24px
          line-height: 32px
          border-bottom: 1px solid rgba(7,17,27,0.1)
          font-dpr(12px)
          &:last-child
            border: 0
          .link
            display: block
            color: rgba(7,17,27, 0.8)
            .iconfont
              float: right
              font-dpr(24px)          
</style>
