<template>
  <div class="search">
    <div class="header">
      <span class="back" @click="showHome"><i class="iconfont icon-arrow-right"></i></span>
      <div class="search-wrapper">
        <i class="iconfont icon-search"></i>
        <input type="input" class="search-input" v-model="inputText" @focus="emptyText" placeholder="search">
      </div>
      <span class="search_btn"  @click="search">搜索</span>
    </div>
    <div class="warning">{{inputWarning}}</div>
    <div class="content">
      <div class="search-record" v-if="searchRecord.length">
        <div class="title-wrapper"><h2 class="title">历史记录</h2><span class="empty" @click="emptyRecord">清空</span></div>
        <ul class="list">
          <li class="item" v-for="item in searchRecord">{{item}}</li>
        </ul>
      </div>
      <div class="hot-search">
        <div class="title-wrapper"><h2 class="title">热门搜索</h2></div>
        <ul class="list">
          <li class="item colorful" v-for="item in hotSearch">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Search',
  data() {
    return {
      inputText: '',
      inputWarning: '',
      searchRecord: [],
      hotSearch: ['测试1', '测试2', '测试3', '测试4', '测试5'],
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
  },
}

</script>
<style lang="stylus" scoped>
  @import '../assets/stylus/mixin.styl'
  .search
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
      margin: 0 72px
      color: rgb(240, 20, 20)
    .content
      .search-record, .hot-search
        margin:24px
        .title-wrapper
          display: flex
          justify-conent: space-between
          .title
            flex: 1
            align-self: center
            font-weight: 700
            // color: rgb(0, 160, 220)
          .empty
            flex: 0 0 96px
            padding: 8px
            align-self: center
            width: 96px
            text-align: right
            color: rgb(0, 160, 220)
        .list
          margin-top: 24px
          .item
            display: inline-block
            padding: 8px 12px
            margin: 0 12px 12px 0
            border: 1px solid rgba(7, 17, 27, 0.1)
            border-radius: 4px
            background: #f3f3f3
            &.colorful
              background: #f3f0f9
      .hot-search
        margin-top: 48px
</style>
