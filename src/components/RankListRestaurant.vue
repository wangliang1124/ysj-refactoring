<template>
  <div class="content-wrapper">
    <h2 class="icon-rank">排行榜</h2>
    <template v-if="!!rankList.length">
      <div class="content-item" v-for='(item,index) in rankList' :key='index'>
        <div class="cover">
          <router-link :to="{name:'detail', params:{id: item.id}}">
            <span class="num">No.{{index+1}}</span>
            <img :src="item.specialty.restaurant.cover" :alt="item.specialty.restaurant.name">
          </router-link>
        </div>
        <div class="content-text">
          <span class="name">{{item.specialty.restaurant.name}}</span>
          <div class="intro">
            <Rating :score='item.specialty.restaurant.score || 3'/>
            <span class="average">￥{{item.specialty.restaurant.unit_average}}/人</span>
            <div class="cuisine">{{item.specialty.restaurant.restaurant_cuisine.cuisine}}</div>
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
  /* eslint-disable */
  import Rating from 'components/Rating'
  import { mapGetters } from 'vuex'
  import util from 'utils/location'

  export default {
    name: 'TotalMonth',
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
        return '';
      },
    },
  };
</script>
<style type="text/css" lang="stylus" scoped>
   @import '../assets/stylus/mixin.styl'
  .content-wrapper
    width: 100%
    min-height: 100%
    padding-bottom: 60px; // sticky
    font-size: 0
    overflow: hidden
    .icon-rank
      width: 100%
      padding-top: 32px
      font-dpr(12px)
      text-align: center
    .icon-rank:after
      content:'▼'
      margin-left: 8px
      color: #550055
    .content-none
      margin: 0 auto
      padding: 20px
      font-dpr(14px)
      text-align: center
      color: rgba(7, 17, 27, 0.4)
    .content-item
      position: relative
      display: flex
      margin: 0 24px
      padding: 24px 0
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      .cover
        flex: 0 0 240px
        width: 100%
        a
          position: relative
          display: inline-block
          width: 100%
          height: 0
          padding-top: 66% /*黑魔法*/
          img
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
            // border: 1px solid rgba(7, 17, 27, 0.1)
            object-fit: cover
          .num
            position: absolute
            top: 12px
            width: 80px
            padding: 4px
            border-top-right-radius: 4px
            border-bottom-right-radius: 4px
            font-dpr(12px)
            text-align: center
            color: #fff
            background-color: #480a4d 
      .content-text
        flex: 1
        margin-left: 24px
        font-dpr(12px)
        vertical-align: top
        .name
          display: inline-block
          padding: 8px
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
          border: 1px solid rgba(7, 17, 27, 0.2)
          border-radius: 4px
          font-weight: 200
        .intro
          position: absolute
          bottom: 24px
          font-dpr(10px)
          color: rgb(147,153,159)
          .average
            margin-bottom: 12px
            font-weight: 700
            color: rgb(240,20,20)
          .cuisine
            margin-top: 12px
            font-weight: 200
        .distance
          position: absolute
          right: 20px
          bottom: 20px
          color: rgb(147,153,159)
</style>
