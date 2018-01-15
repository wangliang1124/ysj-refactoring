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
          <li class="filter-item" :class="{selected: list.selectedIndex===0}" @click="selectItem(list, 0)">不限</li>
          <li class="filter-item" 
            :class="{selected: index + 1 ===list.selectedIndex}" 
            @click="selectItem(list, index + 1)"
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
      // hotSearch: ['测试1', '测试2', '测试3', '测试4', '测试5'],
      // filterTitle: ['人均', '商圈', '菜系', '场景', '其他'],
      restaurantList: [],
      price: [100, 200, 500, 1000, 2000],
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
    priceRange() {
      const arr = []
      for (let i = 0; i < this.price.length - 1; i += 1) {
        const price1 = this.price[i]
        const price2 = this.price[i + 1]
        arr.push(price1 + '-' + price2)
      }
      console.log(arr)
      return arr
    },
    result() {
      let rst = this.restaurantList
      rst = rst.filter(item =>
        item.title.toLowerCase().indexOf(this.inputText.trim().toLowerCase()) !== -1)
      const keys = Object.keys(this.filters)
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i]
        if (this.filters[key]) {
          if (key === 'price') {
            rst = rst.filter((item) => {
              const v = item.price
              console.log(v)
              const j = this.priceRange.findIndex(price => price === this.filters[key])
              console.log(j)
              if (v > this.price[j] && v < this.price[j + 1]) {
                return true
              }
              return false
            })
            console.log(rst)
          } else {
            rst = rst.filter(item => item[key] === this.filters[key])
          }
          // console.log(this.filters[key])
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
          selectedIndex: 0,
          title: '人均',
          listItem: this.priceRange,
        },
        {
          label: 'district',
          selectedIndex: 0,
          title: '商圈',
          listItem: district.data
            .filter(item => item.restaurant_area.city === currentCity)
            .map(item => item.district),
        },
        {
          label: 'cuisine',
          selectedIndex: 0,
          title: '菜系',
          listItem: cuisines.data.map(item => item.cuisine),
        },
        {
          label: 'scene',
          selectedIndex: 0,
          title: '场景',
          listItem: scenes.data.map(item => item.scene),
        },
        {
          label: 'other',
          selectedIndex: 0,
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
    selectItem(list, index) {
      console.log(list, index)
      this.filters[list.label] = list.listItem[index - 1]
      console.log(list.listItem[index - 1])
      this.$set(list, 'selectedIndex', index)
      // this.result = this.restaurantList.filter(this.custom)
      // console.log(this.result)
    },
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
