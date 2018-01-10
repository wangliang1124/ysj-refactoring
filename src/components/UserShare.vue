<template>
  <div class="share">
    <div class="share-wrapper">
      <div class="content">
        <span>分享此页面给好友，您和好友将获得</span>
        <div><span>￥</span><span class="value">{{value}}</span><span></span></div>
        <span>玥享卡年卡抵用券</span>
      </div>
      <div class="cover">
        <img src="../assets/img/share.png">
        <div class="btn_share">点击页面右上角分享给好友</div>
        <p class="desc">
          使用规则：本券不兑换现金、不找零、不与其他活动同时使用，使用本券不开票、不找零、不兑换现金；
        </p>
      </div>
      <div class="record">
        <h2 class="title">邀请记录</h2>
        <div v-for="record in records" class="record-item">
          <span class="user">{{record.user.nickname}}</span>
          <span class="state">{{record.status.info}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/utils/api'
import wxAPI from '@/utils/wx'

export default {
  name: 'UserShare',
  data() {
    return {
      value: 0,
      records: [],
      userInfo: {},
    }
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      const res = await api.get('/invite')
      this.records = res.data.rows
      const res2 = await api.get('/system')
      console.log(res2)
      this.value = res2.data.INVITE_money || 101
    },
    wxShare() { // 微信分享功能
      window.wx.ready(() => {
        // 初始化微信自定义分享参数；获取本地userInfo，防止刷新后无法从vuex store中取值
        this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
        const shareData = {
          title: `${this.userInfo.nickname}赠送了您一张${this.value}元玥享代金券`,
          desc: '立即加入玥享会员,开启尊享美食之旅',
          imgUrl: 'http://ysj.tcfellow.com:3000/assets/uploads/0726_YUE_icons_FINAL_OUTLINE-30.png',
          link: `http://${window.location.host}/card?inviter_id=${this.userInfo.id}`,
        }
        wxAPI.onMenuShareTimeline(shareData)
        wxAPI.onMenuShareAppMessage(shareData)
      })
    },
  },
}

</script>
<style lang="stylus" scoped>
  @import '../assets/stylus/mixin.styl' 
  
  .share
    background: rgb(238, 238, 238)
    .share-wrapper
      .content
        position: relative
        margin: 0 24px
        padding: 48px 0
        border-bottom: 1px dashed rgba(7, 17, 27, 0.1)
        text-align: center
        line-height: 2
        color: rgb(7, 17, 27)
        background: #fff
        .value
          font-dpr(48px)
          color: rgb(240, 20, 20)
        &:before, &:after
          content: ''
          position: absolute
          bottom: -16px
          width: 32px
          height: 32px
          border-radius: 50%
          background-color: rgb(238, 238, 238)
        &:before
          left: -16px
        &:after
          right: -16px
      .cover
        margin: 0 24px
        padding: 48px 24px
        text-align: center
        background: #fff
        .btn_share
          margin: 0 auto
          width: 80%
          line-height: 96px
          color: #fff
          border-radius: 4px
          background: #000
        .desc
          margin-top: 24px
          line-height: 1.5
          text-align: left
          color: rgb(147, 153, 159)
      .record
        margin-top: 24px
        padding: 24px  
        background: #fff
        .title
          text-align: center
        .record-item
          padding: 8px 24px
          .state
            float: right
</style>
