<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script type="text/javascript">
  import HelloWorld from 'components/HelloWorld'

  export default {
    name: 'app',
    components: {
      HelloWorld,
    },
  }
</script>

<style type="text/css" lang="stylus">
  #app 
    background-color: #fff
</style>
