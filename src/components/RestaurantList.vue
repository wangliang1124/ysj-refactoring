<template>
  <div class="restaurant-list-wrapper">
    <ul class="restaurant-list">
      <template v-for="(item,index) in lazyList">
        <li class="restaurant-item" :key="index">
          <restaurant-cover :restaurant="item"></restaurant-cover>
        </li>
        <div class="split" v-if="index%2===0"></div>
      </template>
    </ul>
    <div class="footer" v-if="isEnd">
      ~ 我已经到底了 ~
      <!-- <div class="sticky"></div> -->
    </div>
  </div>
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
  data() {
    return {
      lazyList: [],
      isBottom: false,
      loadIndex: 0,
      loadNum: 2, // 每次加载数量
      isEnd: false,
    }
  },
  components: {
    RestaurantCover,
  },
  watch: {
    isBottom() {
      if (this.isBottom) {
        console.log('测试')
        this.loadMore()
      }
    },
    restaurantList() {
      console.log('========list watch===========')
      // 由于组件复用，lazyList，loadIndex的初始值都是上一页list的，因此当restaurantList的值变化时，需要重置
      this.lazyList = []
      this.loadIndex = 0
      this.isBottom = false
      this.isEnd = false
      this.loadMore() // 先加载一屏数据
    },
  },
  created() {
    console.log('========list created===========')
    // 添加滚动事件监听
    window.addEventListener('scroll', () => {
      this.isBottom = this.bottomVisible()
    })
    this.loadMore()
  },
  methods: {
    bottomVisible() {
      const { scrollY } = window
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight < visible
    },
    loadMore() {
      const len = this.restaurantList.length
      const start = this.loadIndex
      let end = this.loadIndex + this.loadNum
      if (start === len) { console.log('加载完毕！'); this.isEnd = true; return }
      if (end > len) { end = len }
      this.lazyList = this.lazyList.concat(this.restaurantList.slice(start, end))
      this.loadIndex = end
      console.log(this.lazyList)
    },
  },
}

</script>
<style lang="stylus" scoped>
  .restaurant-list-wrapper
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
    .footer
      margin: 0 24px
      padding: 24px 0
      border-top: 1px solid rgba(7, 17, 27, 0.1)
      text-align: center
      color: rgba(7, 17, 27, 0.3)
</style>
