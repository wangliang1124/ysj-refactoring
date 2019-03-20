<template>
  <div class="m-records">
    <Grid :rows="2" class='list'>
      <div v-if="showNoOffer" class="showNoOffer">
        <img src="/static/noOffer.png" width="50px" />
        <div class="text"> 数据被瞄星人偷走了~</div>
      </div>
      <div v-if="loading" class="loading">
        <img src="/static/loading.gif" width="100px" />
      </div>
      <template v-for="(item, index) in offerList">
        <grid-item v-for="(offer, index2) in item"  :key="offer.index">
          <router-link :to="{name:'productDetail',params:{id:offer.id}}">
            <offer :offer="offer.specialty" :key="offer.id" :refreshList="initData" />
          </router-link>
        </grid-item>
      </template>
    </Grid>
  </div>
</template>

<script>
  import { Grid, GridItem } from 'vux';
  import api from '@/utils/api';
  import Offer from '@/pages/home/components/offer';

  export default{
    name: 'collect',
    data() {
      return {
        showNoOffer: false,
        loading: false,
        offerList: [],
        offerListOfCache: [],
      };
    },
    created() {
      this.initData();
    },
    methods: {
      async initData() {
        this.loading = true;
        this.showNoOffer = false;
        const res = await api.get('/collect');
        this.offerListOfCache = res.data.rows;
        this.loading = false;
        if (this.offerListOfCache && this.offerListOfCache.length) {
          this.offerList = this.parseOffers(this.offerListOfCache);
        } else {
          this.offerList = [];
          this.showNoOffer = true;
        }
      },
      parseOffers(list) {
        const retList = [];

        for (let i = 0; i < list.length; i += 2) {
          const cacheList = [];
          if (i < list.length) {
            cacheList.push(list[i]);
          }
          if (i + 1 < list.length) {
            cacheList.push(list[i + 1]);
          }
          retList.push(cacheList);
        }
        return retList;
      },
    },
    components: {
      Grid,
      GridItem,
      Offer,
    },
  };
</script>
<style scoped lang='less'>
  .m-records{
    background: #fff;
    .showNoOffer{
      margin-top: 200px;
      text-align: center;
      .text{
        margin-top:10px;
        color: #ccc;
      }
    }
    .record{
      height: 45px;
      margin: 0 25px;
      padding: 15px 0;
      border-bottom: 1px solid #eeeeee;
      .left{
        width: 75%;
        float: left;
        .title{
          font-size: 12px;
          color: #666;
        }
        .time{
          font-size: 14px;
          color: #333;
          padding-top: 15px;
        }
      }
      .right{
        width: 25%;
        float: right;
        height: 45px;
        line-height: 45px;
        font-size: 9px;
        color: #000;
        text-align: right;
        .price{
          font-size: 14px;
        }
      }
    }
  }
</style>
