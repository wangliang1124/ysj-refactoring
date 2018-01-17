<template>
  <div class="ranklist">
    <ul class="tab">
      <li class="tab-item" 
          :class="{current: selected===index}" 
          v-for="(item, index) in ranklistTitle" 
          @click='select(index)'
      >
        <router-link :to="{name: item.name}">{{item.title}}</router-link> 
      </li>
    </ul>
    <div v-finger:swipe="swipe">
      <transition name="swipe">
        <router-view :key="selected"></router-view>
      </transition>  
    </div>
    <div class="footer">
      ~ E n d ~
    </div>
  </div>
</template>
<script type="text/javascript">
  /* eslint-disable */
  import api from 'utils/api'
  export default {
    name: 'ranklist',
    data() {
      return {
        ranklistTitle: [{
          title: '主厨排名',
          name: 'cook',
        }, {
          title: '餐厅月排名',
          name: 'month',
        }, {
          title: '餐厅总排名',
          name: 'total',
        }],
        ranklist: [],
        cooktop11: [],
        selected: 1,
      }
    },
    created() {
      this.init()
    },

    async mounted() {
      console.log(this.$route.name);
      const name = this.$route.name;
      if (name === 'cook') {
        this.select(0);
      } else if (name === 'month') {
        this.select(1);
      } else if (name === 'total') {
        this.select(2);
      }
    },
    methods: {
      async init() {
        const res = await api.get('/collect/ranklist')
        const res2 = await api.get('/specialty/getcooktop11')
        console.log('=================存储排行榜数据到store===================')
        this.$store.dispatch('setCookTop11', { cookTop11: res2.data })
        this.$store.dispatch('setRankListMonth', { rankListMonth: res.data[1] })
        this.$store.dispatch('setRankListTotal', { rankListTotal: res.data[0] })
      },
      select(index) {
        this.selected = index;
      },
      swipe(evt) {
        console.log('swipe:' + evt.direction);
        if (evt.direction === 'Left') {
          this.selected += 1;
          this.selected = this.selected >= 2 ? 2 : this.selected;
          this.$router.push({ name: this.ranklistTitle[this.selected].name });
        } else if (evt.direction === 'Right') {
          this.selected -= 1;
          this.selected = this.selected <= 0 ? 0 : this.selected;
          this.$router.push({ name: this.ranklistTitle[this.selected].name });
        }
      },
    },
  };
</script>
<style type="text/css" lang='stylus' rel='stylesheet/stylus' scoped>
  @import '../assets/stylus/mixin.styl'
  .ranklist
    position: relative
    width: 100%
    min-height:100%; 
    background-color:#fff
    .tab
      display: flex
      justify-content: center
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      .tab-item
        flex: auto
        text-align: center
        height: 80px
        line-height: 80px
        color: #550055
        .router-link-active
          text-decoration: none
      .current
        border-bottom: 1px solid #550055
        font-weight: bold
        color: #550055
    .swipe-enter-active,.swipe-leave-active
      transition: opacity .3s ease
    .swipe-leave-active
      transition: opacity .3s ease
      transform: translateX(x)
    .swipe-enter
    .swipe-leave-to
      opacity: 0.5
    .footer
      position: absolute
      bottom: 0
      left: 50%;
      transform: translate(-50%)
      height: 40px
      width: 80%
      text-align: center
      color: rgba(7, 17, 27, 0.4)
</style>
