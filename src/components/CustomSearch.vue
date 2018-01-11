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
      <div class="content" v-for="title in filterTitle">
        <h2 class="filter-title">{{title}}</h2>
        <ul class="filter-list">
          <li class="filter-item" :class="{selected: selected}" @click="selectItem">测试</li> <li class="filter-item">测试</li> <li class="filter-item">测试</li>
          <li class="filter-item">测试</li> <li class="filter-item">测试</li> <li class="filter-item">测试</li>
          <li class="filter-item">测试</li> <li class="filter-item">测试</li> <li class="filter-item">测试</li>
          <li class="filter-item">测试</li> <li class="filter-item">测试</li> <li class="filter-item">测试</li>
        </ul>
      </div>
      <div class="btn"><span class="cancel" @click="showHome">取消</span><span class="confirm">确认</span></div>
    </div>
  </div>
</template>
<script>
import Split from 'components/Split'

export default {
  name: 'CustomSearch',
  components: {
    Split,
  },
  data() {
    return {
      inputText: '',
      inputWarning: '',
      searchRecord: [],
      hotSearch: ['测试1', '测试2', '测试3', '测试4', '测试5'],
      filterTitle: ['人均', '商圈', '菜系', '场景', '其他'],
      selected: false,
    }
  },
  methods: {
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
    selectItem() {
      this.selected = true
    },
    confirm() {},
  },
}

</script>
<style lang="stylus" scoped>
  @import '../assets/stylus/mixin.styl'
  .query
    position: fixed
    top: 0
    left: 0
    bottom: 0
    z-index: 100
    width: 100%
    background: #fff
    overflow: hidden
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
      .content
        margin:0 24px 24px 24px
        .filter-title
          font-weight: 700
        .filter-list
          margin-top: 12px
          .filter-item
            display: inline-block
            padding: 8px 12px
            margin: 0px 8px 12px 0
            border: 1px solid rgba(7, 17, 27, 0.1)
            // border-radius: 2px
            background: #f3f3f3
            &.selected
              border: 1px solid rgb(240, 20, 20)
              color: #fff
              background: rgb(240, 20, 20)
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
</style>
