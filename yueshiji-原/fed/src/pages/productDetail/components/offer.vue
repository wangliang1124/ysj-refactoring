<template>
  <div class="m-offer">
    <div >
      <XImg :src="offer.specialties[0].cover" class="img"/>
    </div>
    <div class="content">
      <p class="desc">
        <span  class="title">{{offer.name}}</span><br/>
        <span class="service">享受价值 <em class="service-price">¥{{offer.specialties[0].value}}元</em>{{offer.specialties[0].type}}服务</span><br/>
        <!-- <span class="price">人均¥{{offer.restaurant.unit_average}}元</span><br/> -->
        <span class="info">
           <span>人均 ¥{{offer.unit_average}}元 | </span>
           <span>{{offer.restaurant_cuisine.cuisine}}</span>
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
    props: ['offer', 'refreshList'],
    computed: {
      ...mapGetters(['location']),
      getDistance() {
        if (this.offer.distance) {
          return `${Number(this.offer.distance / 1000).toFixed(2)}km`;
        }
        const { location_y: loY, location_x: loX, distance } = this.offer.restaurant_area;
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
    components: {
      XImg,
    },
    methods: {
      async collectOffer(e) {
        e.preventDefault();
        const { isCollected, id } = this.offer;
        let res;
        if (isCollected) {
          res = await api.delete(`/collect/${id}`);
        } else {
          res = await api.post('/collect', { specialty_id: id });
        }
        if (this.refreshList) {
          this.refreshList();
          return;
        }
        if (res.message === 'success') {
          this.offer.isCollected = !isCollected;
        }
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .m-offer{
    background: #fff;
    .img{
      position: relative;
      width: 100%;
      overflow:hidden;
    }
    .desc{  
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
      .info{
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
