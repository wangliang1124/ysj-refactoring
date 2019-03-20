<template>
  <div class="wrapper">
    <div class="active">
      <msg  title="已成功激活" description="感谢使用玥享卡！"></msg>
      <div class="follow">
        <div>为了方便您查看玥享卡，请关注玥食记公众号 (长按图片)</div>
        <img src="../../assets/follow.jpg" alt="玥食记二维码" width="100%" >
      </div>
      <x-button type="default" action-type="button" @click.native="confirmActive">返回</x-button>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { Msg, XButton } from 'vux';

  export default {
    name: 'GiftCard',
    components: {
      Msg,
      XButton,
    },
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
        this.$emit('confirm');
      },
    },
  };
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
</style>

