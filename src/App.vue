<template>
  <div id="app">
    <div class="app-wrapper">
      <div class="header">
        <span class="location">北京</span>
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
    .app-wrapper
      width: 100%
      .header
        padding: 4px 8px
        font-size: 0
        .location
          line-height: 1rem
          font-size: 12px
</style>
