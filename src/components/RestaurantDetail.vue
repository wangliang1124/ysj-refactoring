<template>
  <div class="restaurant-detail">
    <h1>我是测试事实上</h1>
  </div>
</template>
<script>
import Swiper from 'components/Swiper'

export default {
  name: 'RestaurantList',
  props: {
    restaurantList: {
      type: Array,
    },
  },
  components: {
    Swiper,
  },
  data() {
    return {
      list: [],
    }
  },
}

</script>
<style lang="stylus" scoped>
  .restaurant-detail
    background-color: #ccc
</style>
