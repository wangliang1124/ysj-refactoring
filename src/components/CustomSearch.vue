<template>
  <div class="query">
    <div class="header">
      <span class="back" @click="showHome"><i class="iconfont icon-arrow-right"></i></span>
      <div class="search-wrapper">
        <i class="iconfont icon-search"></i>
        <input type="input" class="search-input" v-model="inputText" @focus="emptyText" placeholder="search">
      </div>
      <span class="search_btn"  @click="search">搜索</span>
    </div>
    <div class="warning">{{inputWarning}}</div>
    <div class="content-wrapper">
      <div class="content" v-for="list in queryList">
        <h2 class="filter-title">{{list.title}}</h2>
        <ul class="filter-list">
          <li class="filter-item" :class="{selected: list.selectedIndex===null}" @click="selectAll(list)">不限</li>
          <li class="filter-item" 
            :class="{selected: index===list.selectedIndex}" 
            @click="selectItem(list, item, index)"
            v-for="(item,index) in list.listItem"
          >{{item}}</li> 
<!--           <li class="filter-item">测试</li> <li class="filter-item">测试</li>
          <li class="filter-item">测试</li> <li class="filter-item">测试</li> <li class="filter-item">测试</li>
          <li class="filter-item">测试</li> <li class="filter-item">测试</li> <li class="filter-item">测试</li>
          <li class="filter-item">测试</li> <li class="filter-item">测试</li> <li class="filter-item">测试</li> -->
        </ul>
      </div>
      <!-- <div class="btn"><span class="cancel" @click="showHome">取消</span><span class="confirm">确认</span></div> -->
    </div>
    <div class="result-wrapper">
      <restaurant-list :restaurantList="result"></restaurant-list>
    </div>
  </div>
</template>
<script>
import api from 'utils/api'
import RestaurantList from 'components/RestaurantList'
import Split from 'components/Split'

export default {
  name: 'CustomSearch',
  components: {
    RestaurantList,
    Split,
  },
  data() {
    return {
      queryList: [],
      districtList: [],
      cuisineList: [],
      sceneList: [],
      otherList: [],
      inputText: '',
      inputWarning: '',
      searchRecord: [],
      hotSearch: ['测试1', '测试2', '测试3', '测试4', '测试5'],
      // filterTitle: ['人均', '商圈', '菜系', '场景', '其他'],
      restaurantList: [],
      filters: {
        price: '',
        district: '',
        cuisine: '',
        scene: '',
        other: '',
      },
      // result: [],
    }
  },
  computed: {
    // restaurantList() {
    //   console.log('ccccccccccccdddccccccc')
    //   console.log(this.$store.getters.restaurantList)
    //   return this.$store.getters.restaurantList
    // },
    result() {
      console.log('ccccccccccccccccccc')
      let rst = this.restaurantList
      // eslint-disable-next-line
      for (let i in this.filters) {
        if (this.filters[i]) {
          console.log(this.filters[i])
          rst = this.restaurantList.filter(item => item[i] === this.filters[i])
        }
      }
      return rst
    },
  },
  created() {
    this.initData()
    // console.log(this.restaurantList)
  },
  updated() {
    this.restaurantList = this.$store.getters.restaurantList
  },
  methods: {
    async initData() {
      const currentCity = window.localStorage.getItem('currentCity')
      const district = await api.get('/district?per_page=50')
      const cuisines = await api.get('/cuisine?per_page=50')
      const scenes = await api.get('/scene?per_page=50')
      const others = await api.get('/other?per_page=50')

      this.queryList = [
        {
          label: 'price',
          selectedIndex: null,
          title: '人均',
          listItem: ['200-500', '500-1000', '1000-2000'],
        },
        {
          label: 'district',
          selectedIndex: null,
          title: '商圈',
          listItem: district.data
            .filter(item => item.restaurant_area.city === currentCity)
            .map(item => item.district),
        },
        {
          label: 'cuisine',
          selectedIndex: null,
          title: '菜系',
          listItem: cuisines.data.map(item => item.cuisine),
        },
        {
          label: 'scene',
          selectedIndex: null,
          title: '场景',
          listItem: scenes.data.map(item => item.scene),
        },
        {
          label: 'other',
          selectedIndex: null,
          title: '其他',
          listItem: others.data.map(item => item.other),
        },
      ]
    },
    showHome() {
      this.$router.push({ path: '/' })
    },
    emptyText() {
      this.inputText = ''
    },
    search() {
      if (this.inputText) {
        this.inputWarning = ''
        this.searchRecord.push(this.inputText.trim())
        this.inputText = ''
      } else {
        this.inputWarning = '搜索内容不能为空！'
      }
    },
    emptyRecord() {
      this.searchRecord = []
    },
    selectAll(list) {
      this.$set(list, 'selectedIndex', null)
      this.filters[list.label] = null
    },
    selectItem(list, item, index) {
      console.log(list, item, index)
      this.filters[list.label] = item
      this.$set(list, 'selectedIndex', index)
      // this.result = this.restaurantList.filter(this.custom)
      // console.log(this.result)
    },
    // custom(restaurant) {
    //   console.log('ccccccccccccccccccc')
    //   return restaurant.district === this.filters.district ||
    //          restaurant.cuisine === this.filters.cuisine
    // },
  },
}

</script>
<style lang="stylus" scoped>
  @import '../assets/stylus/mixin.styl'
  .query
    // position: fixed
    // top: 0
    // left: 0
    // bottom: 0
    width: 100%
    background: #fff
    // overflow: hidden
    .header
      position: relative
      display: flex
      z-index: 5
      height: 96px
      line-height: 96px
      padding: 8px 16px
      font-size: 0
      text-align: center
      background: #fff
      .back
        position: relative
        flex: 0 0 48px
        width: 48px
        .icon-arrow-right
          display: inline-block
          // vertical-align: middle
          transform: rotate(180deg)
          font-dpr(16px)
          font-weigth: 700
          color: rgb(7, 17, 27)
      .search-wrapper
        position: relative
        display: flex
        flex: 1
        align-self: center
        margin-left: 12px
        height: 60px
        border: 1px solid rgba(7, 17, 27, 0.1)
        border-radius: 4px
        font-dpr(14px)
        .icon-search
          flex: 0 0 60px
          width: 60px
          align-self: center
          font-dpr(20px)
          color: rgba(7, 17, 27, 0.3)
        .search-input
          flex: 1
          align-self: center
          padding: 0 10px
          border: 0 
          font-dpr(12px)
          outline: 0
      .search_btn
        flex: 0 0 80px
        width: 80px
        align-self: center
        margin: 0 20px
        font-dpr(12px)
    .warning
      margin: 0 72px 12px 72px
      color: rgb(240, 20, 20)
    .content-wrapper
      padding: 24px
      .content
        // margin:0 24px 24px 24px
        .filter-title
          font-weight: 700
        .filter-list
          margin-top: 12px
          .filter-item
            display: inline-block
            padding: 8px 12px
            margin: 0px 8px 12px 0
            // border: 1px solid rgba(7, 17, 27, 0.1)
            // border-radius: 2px
            font-weight: 200
            background: #f3f3f3
            &.all
              background: rgba(7, 17, 27, 0.2)
            &.selected
              // border: 1px solid rgb(240, 20, 20)
              color: #fff
              background: rgb(0, 160, 220)
      .btn
        display: flex
        margin: 0 24px
        .cancel, .confirm
          flex: 1
          padding: 16px 0
          text-align: center
          border: 1px solid rgba(7, 17, 27, 0.3)
        .confirm
          margin-left: 48px
          background: #f3f5f7
    .result-wrapper
      padding: 24px
</style>
