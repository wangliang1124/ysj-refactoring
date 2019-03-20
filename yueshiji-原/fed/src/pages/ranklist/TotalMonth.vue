<template>
  <div class="content-wrapper">
    <h2 class="icon">排行榜</h2>
    <template v-if="!!rankList.length">
      <div class="content-item vux-1px-b" v-for='(item,index) in rankList' :key='index'>
        <div class="cover">
          <span class="num">No.{{index+1}}</span>
          <router-link :to="{name:'productDetail', params:{id: item.id}}">
            <img :src="item.specialty.restaurant.cover" width="126" height="84" :alt="item.specialty.restaurant.name">
          </router-link>
        </div>
        <div class="content-text">
          <span class="name">{{item.specialty.restaurant.name}}</span>
          <div class="intro">
            <Rating :score='item.specialty.restaurant.score || 3'/>
            <span class="average">￥{{item.specialty.restaurant.unit_average}}/人</span>
            <br/>
            <span>{{item.specialty.restaurant.restaurant_cuisine.cuisine}}</span>
          </div>
          <span class="distance">{{ getDistance(item.specialty.restaurant.location_x,item.specialty.restaurant.location_y) }}</span>
        </div>
      </div>
    </template>
    <div class='content-none' v-if="!rankList.length">
      <h2>~本月没有数据~</h2>
    </div>
  </div>
</template>
<script type="text/javascript">
  import Rating from '@/pages/rating/Rating';
  import { mapGetters } from 'vuex';
  import util from '@/utils/location';
  // import wxconfig from '@/utils/wx';

  export default {
    name: 'TotalMonth',
    // props: {
    //   ranklist: {
    //     type: Array,
    //     required: true,
    //   },
    // },
    components: {
      Rating,
    },
    data() {
      return {
        score: 4,
        rankList: [],
      };
    },
    computed: {
      ...mapGetters(['rankListMonth', 'rankListTotal', 'location']),
    },
    mounted() {
      const name = this.$route.name;
      if (name === 'month') {
        this.rankList = this.rankListMonth;
      } else if (name === 'total') {
        this.rankList = this.rankListTotal;
      }
      console.log(name + '=============================');
      console.log(this.rankList);
    },
    methods: {
      getDistance(locationX, locationY) {
        // console.log(locationX, locationY);
        const { locationX: loX, locationY: loY } = { locationX, locationY };
        console.log(loX, loY);
        const location = JSON.parse(window.localStorage.getItem('location'));
        console.log(location);
        if (location) {
          const { lat, lng } = location;
          console.log(lat, lng);
          if (!loY || !lat) {
            return '未知';
          }
          return `${(Number(util.getDistance(loY, loX, lat, lng)) / 1000).toFixed(2)}km`;
        }
        /**
        wxconfig.getLocation([], (res, location) => {
          const { latitude, longitude } = location;
          console.log(latitude, longitude);
          return `${(Number(util.getDistance(loY, loX, latitude, longitude)) / 1000).toFixed(2)}km`;
        });
        */
        return '';
      },
    },
  };
</script>
<style type="text/css" lang="stylus">
  .content-wrapper
    width: 100%
    min-height: 300px
    padding-bottom: 30px; // sticky
    font-size: 0
    .icon
      width: 100%
      padding-top: 16px
      font-size: 12px
      text-align: center
      color: #4a094d
    .icon:after
      content:' ▼'
      color: #88578e
    .content-none
      margin: 0 auto
      padding: 20px
      font-size: 14px
      text-align: center
      color: rgba(7, 17, 27, 0.4)
    .content-item
      position: relative
      width: 100%
      padding: 20px
      // background-color: #0f0
      .cover
        position: relative
        display: inline-block
        .num
          position: absolute
          top: 10px
          width: 40px
          padding: 2px
          border-top-right-radius: 2px
          border-bottom-right-radius: 2px
          border-radius: 4px
          font-size: 12px
          text-align: center
          color: #fff
          background-color: #480a4d 
      .content-text
        display: inline-block
        margin-left: 20px
        // width: 100px
        font-size: 12px
        vertical-align: top
        // background: #ff0
        .name
          display: inline-block
          padding: 6px
          max-width: 160px  // 屏幕宽度大于360px时，餐厅名的长度
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
          // margin-left:20px
          border: 1px solid rgba(7, 17, 27, 0.3)
          border-radius: 4px
          font-weight: 900
        .intro
          position: absolute
          bottom: 20px
          font-size: 10px
          color: rgba(7, 17, 27, 0.4)
          .average
            color: #000
        .distance
          position: absolute
          right: 20px
          bottom: 20px
          color: rgba(7, 17, 27, 0.2)
  @media screen and (max-width: 359px)
    .content-wrapper
      .content-item
        .content-text
          .name
            max-width: 120px  // 屏幕尺寸小于360时，餐厅名的长度
  @media screen and (min-width: 400px) 
    .content-wrapper
      .content-item
        .content-text
          .name
            max-width: 160px  // 屏幕尺寸小于360时，餐厅名的长度
</style>
