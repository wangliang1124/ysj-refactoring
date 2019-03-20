<template >
  <div>
    <ul v-for="item in list">
      <li>{{item.info}} {{item.time_range.split(',')[0] | timeFilterTime}}-{{item.time_range.split(',')[1] | timeFilterTime}}</li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: ['list']
  }
</script>
<style>
</style>
