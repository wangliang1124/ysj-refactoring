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
  <!--  组件方式  
      <div class="content" v-finger:swipe="swipe">
        <div class="content-item" :class="{active: selected===0}">
          <CookTop11 :cooktop11="cooktop11"></CookTop11>
          }
        </div>
        <div class="content-item" :class="{active: selected===1}">
          <TotalMonth :ranklist="ranklist[1] || []" ></TotalMonth>
        </div>
        <div class="content-item" :class="{active: selected===2}">
          <TotalMonth :ranklist="ranklist[0] || []" ></TotalMonth>
      </div>
    </div> -->
    <div v-finger:swipe="swipe">
      <transition name="swipe">
        <!-- <router-view v-bind='routerViewData[selected]'></router-view> -->
        <router-view :key="selected"></router-view>
      </transition>  
    </div>
    <div class="footer">
      ~ E n d ~
    </div>
  </div>
</template>
<script type="text/javascript">
  // import api from '@/utils/api';
  // import store from '@/vuex';
  // import TotalMonth from './TotalMonth';
  // import CookTop11 from './CookTop11';

  export default {
    name: 'ranklist',
    // components: {
    //   TotalMonth,
    //   CookTop11,
    // },
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
        // ranklist: [],
        // cooktop11: [],
        selected: 1,
        // routerViewData: [],
        // selected: 'total',
      };
    },
    /**
    computed: {
      getDistance() {
        if (this.offer.distance) {
          return `${Number(this.offer.distance / 1000).toFixed(2)}km`;
        }
        const { location_y: loY, location_x: loX, distance } = this.offer.restaurant;
        if (distance) return `${Number(distance / 1000).toFixed(2)}km`;
        if (this.location) {
          const { lat, lng } = this.location;
          if (!loY || !lat) {
            return '未知';
          }
          return `${(Number(util.getDistance(loY, loX, lat, lng)) / 1000).toFixed(2)}km`;
        }
        wxconfig.getLocation([], (res, location) => {
          const { latitude, longitude } = location;
          return `${(Number(util.getDistance(loY, loX, latitude, longitude)) / 1000).toFixed(2)}km`;
        });
        return '';
      },
    },
    */
    async mounted() {
      // const res = await api.get('/collect/ranklist');
      // const res2 = await api.get('/specialty/getcooktop11');
      // this.ranklist = res.data;
      // this.cooktop11 = res2.data;
      // console.log('=================初始化排行榜数据=================');
      // store.dispatch('setCookTop11', { cookTop11: this.cooktop11 });
      // store.dispatch('setRankListMonth', { rankListMonth: this.ranklist[1] });
      // store.dispatch('setRankListTotal', { rankListTotal: this.ranklist[0] });
      // this.$router.push({ name: 'month' });
      // 初始化排行榜组件props数据
      // this.routerViewData = [{
      //   cooktop11: this.cooktop11,
      // }, {
      //   ranklist: this.ranklist[1] || [],
      // }, {
      //   ranklist: this.ranklist[0] || [],
      // }];
      // console.log(this.routerViewData);
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
  .ranklist
    position: relative
    width: 100%
    min-height:100%; 
    background-color:#fff
    .tab
      display: flex
      justify-content: center
      border-bottom: 1px solid rgba(7, 17, 27, 0.3)
      .tab-item
        flex: auto
        text-align: center
        height: 30px
        line-height: 30px
        color: #4a094d
      .current
        border-bottom: 1px solid #4a094d
        font-weight: bold
        color: #4a094d
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
      height: 20px
      width: 80%
      text-align: center
      color: rgba(7, 17, 27, 0.4)
</style>
