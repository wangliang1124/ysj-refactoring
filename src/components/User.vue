<template>
  <div class="user">
    <div class="main-wrapper">
      <router-view></router-view>
    </div>
    <div class="footer">
      <span>购买即视为同意&nbsp;&nbsp;</span><span>@玥食记</span><span><router-link to="/aboutus">免责声明</router-link></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'User',
  }
</script>

<style lang="stylus" scoped>
  // @import '../assets/stylus/mixin.styl' 
  .user
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    overflow: auto
    // padding: 36px
    box-sizing: border-box
    // background: #ccc
    .main-wrapper
      min-height: 100%
      // background: #cc0
      box-sizing: border-box
      padding-bottom: 36px
    .footer
      position: relative
      margin: -36px auto 0 auto
      text-align: center 
      color: rgb(147,153,159)
</style>
