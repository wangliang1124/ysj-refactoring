<template>
  <ul class="restaurant-list">
    <template v-for="(item,index) in list">
      <li class="restaurant-item">
        <restaurant-cover :restaurant="item"></restaurant-cover>
      </li>
      <div class="split" v-if="index%2===0"></div>
    </template>
  </ul>
</template>
<script>
import RestaurantCover from 'components/RestaurantCover'

export default {
  name: 'RestaurantList',
  props: {
    restaurantList: {
      type: Array,
    },
  },
  components: {
    RestaurantCover,
  },
  data() {
    return {
      list: [],
    }
  },
  // computed: {
  //   // 按价格排序
  //   listOrderByPrice() {
  //     const list = this.list.concat() // 复制array，避免引用
  //     return list.sort((a, b) => b.price - a.price)
  //   },
  //   // 距离
  //   listOrderByDistance() {
  //     const list = this.list.concat()
  //     return list.sort((a, b) => a.distance - b.distance)
  //   },
  // },
  // beforeRouteUpdate(to, from, next) {
  //   console.log(to, from)
  //   const id = parseInt(to.params.id, 10)
  //   console.log('=====mounted=====' + id)
  //   console.log(to.params)
  //   switch (id) {
  //     case 1:
  //       this.list = this.restaurantList
  //       console.log(this.list)
  //       break
  //     case 2:
  //       this.list = this.listOrderByPrice
  //       console.log(this.listOrderByPrice)
  //       break
  //     case 3:
  //       this.list = this.listOrderByDistance
  //       console.log(this.list)
  //       break
  //     case 4:
  //     default:
  //       this.list = this.restaurantList
  //   }
  //   next()
  // },
  watch: {
    restaurantList() {
      this.list = this.restaurantList
    },
  },
}

</script>
<style lang="stylus" scoped>
  .restaurant-list
    display: flex
    flex-flow: row wrap
    font-size: 0
    .restaurant-item
      flex: 0 0 49%
      width: 49%
      margin-bottom: 20px
    .split
      flex: 0 0 2%
</style>
