<template>
  <div class="wrapper">
    <div class="active">
      <div  title="已成功激活" description="感谢使用玥享卡！"></div>
      <div class="follow">
        <div>为了方便您查看玥享卡，请关注玥食记公众号 (长按图片)</div>
        <img src="../assets/img/follow.jpg" alt="玥食记二维码" width="100%" >
      </div>
      <div class="btn" @click="confirmActive">返回</div>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'UserBuyCardActive',
    props: {
      isShow: false,
    },
    // data() {
    //   return {
    //     isShow: true,
    //   };
    // },
    methods: {
      confirmActive() {
        this.$emit('confirm')
      },
    },
  }
</script>
<style type="text/css" lang="stylus" scoped>
  .wrapper
    position: fixed
    top: 0
    left: 0
    z-index: 99
    width: 100%
    min-height: 100%
    background-color: #fff
    .active
      width: 80%
      margin: 0 auto
      background-color: rgba(255, 255, 255, 1)
      .follow
        margin: 0 auto
        text-align: center
      .btn
        display: inline-block
        margin-right: 40px
        padding: 16px
        width: 30%
        text-align: center
        color: rgba(7, 17, 27, 0.4)
        border: 1px solid rgba(7, 17, 27, 0.2)
</style>

