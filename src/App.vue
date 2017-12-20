<template>
  <div id="app">
    <div class="app-wrapper">
      <hello-world></hello-world>
      <div class="header">
        <span class="location"></span>
        <span class="search"></span>
        <span class="personal"></span>
      </div>
      <div class="slider">
        
      </div>
      <div class="content">
        <div class="tabs">
          <div class="tab-item-latest"></div>
          <div class="tab-item-distance"></div>
          <div class="tab-item-average"></div>
          <div class="tab-item-filter">
            <div class="filter-overlay"></div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="sticky"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import HelloWorld from '@/components/HelloWorld'

  export default {
    name: 'app',
    components: {
      HelloWorld,
    },
  }
</script>

<style type="text/css" lang="stylus">
  #app 
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50
    margin-top: 60px
  .app-wrapper
    margin: 0 auto;
    background-color: rgba(7, 17, 27, 0.2)
</style>
