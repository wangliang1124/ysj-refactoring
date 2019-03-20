<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="less" type="text/css">
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
  #app {
    height: 100%
  }
// body {
//   background-color: #fbf9fe;
// }
</style>
