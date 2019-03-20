<template >
  <div>
    <ul v-for="item in list">
      <li><Tag>{{item.tag}}</Tag></li>
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
