<template>
  <div class="m-offer">
    <div class="img-wrapper" v-finger:long-tap="longTap" v-finger:swipe="swipe">  <!-- <div class="img" @click="toggleCover">   ../../../assets/pixel.gif -->
      <!-- <XImg slot="header" ref="img" :src="offer.cover"  style="width:100%; display:block;"/> -->
      <transition name="fade" v-on:before-enter="beforeEnter" v-on:enter="enter">
        <img class="img" ref="img"  v-if="cover.isShow" :src="cover.url" :key="Date.now()">
      </transition>
      <div @click="collectOffer" :class="{ collect : true, 'collect-1': offer.isCollected}">
        <i v-if="offer.isCollected"  class="iconfont icon-shoucang">
          <span class='position'>{{collectedCount}}</span></i>
        <i v-else class="iconfont icon-shoucang1"></i></div>
      </div>
      <div class="content">
        <p class="desc">
          <span  class="title">{{offer.restaurant.name}}</span><br/>
          <span class="service">享受价值 <em class="service-price">¥{{offer.value}}元</em>{{offer.type}}服务</span><br/>
          <!-- <span class="price">人均¥{{offer.restaurant.unit_average}}元</span><br/> -->
          <span class="info">
             <span>人均 ¥{{offer.restaurant.unit_average}}元 | </span>
             <span>{{offer.restaurant.restaurant_cuisine.cuisine}}</span>
             <span  v-if="getDistance != '未知'"> | {{getDistance}}</span> 
          </span>          
        </p>
      </div>
  </div>
</template>

<script>
  import api from '@/utils/api';
  import wxconfig from '@/utils/wx';
  import { mapGetters } from 'vuex';
  import { XImg } from 'vux';
  import util from '@/utils/location';

  export default {
    name: 'offer',
    components: {
      XImg,
    },
    props: ['offer', 'refreshList'],
    data() {
      return {
        cover: {// 初始化
          index: 0,
          url: this.offer.cover,
          isShow: true,
        },
        // imgStyle: {},
      };
    },
    computed: {
      ...mapGetters(['location']),
      collectedCount() {   // 数字等于1位拼接一个空格
        return this.offer.collected.toString().length === 1 ? ` ${this.offer.collected}` : this.offer.collected;
      },
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
    mounted() {
      this.$refs.img.onload = () => { // 图片加载完毕后执行
      // 高度向上取整，避免图片高度不一致引起错位排列
        this.$refs.img.style.height = Math.ceil(this.$refs.img.getBoundingClientRect().height) + 'px';
      };
    },
    methods: {
      async collectOffer(e) {
        e.preventDefault();
        const { isCollected, id } = this.offer;
        let res;
        if (isCollected) {
          res = await api.delete(`/collect/${id}`);
          this.offer.collected -= 1;
        } else {
          res = await api.post('/collect', { specialty_id: id });
          this.offer.collected += 1;
        }
        if (this.refreshList) {
          this.refreshList();
          return;
        }
        if (res.message === 'success') {
          this.offer.isCollected = !isCollected;
        }
      },
      // click(e) {
      //   e.preventDefault();
      // },
      toggleCover() {
        if (!this.offer.specialty_imgs.length) return;
        this.cover.isShow = false;
        console.log(this.offer.specialty_imgs);
        if (this.cover.index === 0 && this.offer.specialty_imgs[1]) {
          this.cover.url = this.offer.specialty_imgs[1].url;
          console.log('===========:' + this.cover.url);
          this.$refs.img.style.height = Math.ceil(this.$refs.img.getBoundingClientRect().height) + 'px';
          this.cover.isShow = true;
          this.cover.index = 1;
        } else if (this.cover.index === 1 && this.offer.specialty_imgs[0]) {
          this.cover.url = this.offer.specialty_imgs[0].url;
          console.log('===========:' + this.cover.url);
          this.$refs.img.style.height = Math.ceil(this.$refs.img.getBoundingClientRect().height) + 'px';
          this.cover.isShow = true;
          this.cover.index = 0;
        } else {
          this.cover.index = 0;
          this.cover.url = this.offer.cover;
          this.cover.isShow = true;
        }
      },
      swipe() {
        console.log('swipe');
        this.toggleCover();
      },
      longTap(e) {
        if (e) {
          e.preventDefault();
          this.toggleCover(e);
          console.log('longTap');
        }
      },
      beforeEnter() {
        console.log('beforeEnter');
      },
      enter() {
        console.log('enter');
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .m-offer{
    background: #fff;
    .img-wrapper{
      position: relative;
      width: 100%;
      .collect{
        position: absolute;
        z-index: 2;
        right: 10px;
        top: 10px;
        color:#fff;    
        &.collect-1{
          color:#ff5962;
        }
        i{
           position: relative;
           font-size: 26px;
           .position{
            position: absolute;
            left: 7px;
            top:6px;
            font-size: 11px;
            white-space:pre; // 显示空格
            color:#fff;
           }
        }
      }
      .img {width:100%;}
      .fade-enter, .fade-leave-to{
        opacity: 0.5;
        filter: blur(10px);
      }
      .fade-enter-active, .fade-leave-enter{
        transition: all .5s ease-in-out;
      }
    }
    .desc{  
      // display: -webkit-box;
      // -webkit-box-orient: vertical;
      // //-webkit-line-clamp: 1; // 2017.10.10 超出两行出现...
      height: 54px;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size:9px;
      line-height: 16px;
      text-decoration: none;
      outline: none;
      font-family:'微软雅黑';
      .title{
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow:hidden;
        font-size:13.5px;
        font-weight:bold;
        color:#500050
      }
      .price{
        font-size:12px;
        font-weight: bold;
        color: #550055;
      }
      // .tag{
      //   // display: inline-block;
      //   // padding: 2px;
      //   margin-left:5px;
      //   background: rgba(255,255,255,0.7);
      //   border: 1px solid #550055;
      //   border-radius: 3px;
      //   font-size: 4px;
      //   color: #550055;
      //   line-height: 4px;
      //   white-space: nowrap;
      //   // vertical-align: middle;
      // }
      .info{
          // display:inline-block;
          padding: 2px 8px;
          border-radius: 20px;
          text-align: center;
          font-size: 9px;
          line-height: 9px;
          color:#fff;
          background: #550055;
      }
      .service{
        display:inline-block;
        font-size: 9px;
        // padding-top: 8px;
        font-weight:bold;
        .service-price{
          font-size: 13.5px;
          color:#ab66b5;
        }
      }
    }
    .content{
      padding-top: 5px;
      position: relative;
    }
  }
</style>
