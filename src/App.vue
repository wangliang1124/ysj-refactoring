<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script type="text/javascript">
  import wx from 'utils/wx'
  import api from 'utils/api'

  export default {
    name: 'app',
    data() {
      return {
        restaurantList: [],
      }
    },
    created() {
      console.log('===========App created================')
      // this.initData()
      wx.initWx()
      wx.getLocation()
    },
    methods: {
      async initData() {
        const specialty = await api.get('/specialty')
        console.log('================app-初始化餐厅数据===================')
        console.log(specialty)
      },
    },
  }
</script>

<style type="text/css" lang="stylus">
  #app 
    background-color: #fff
</style>
