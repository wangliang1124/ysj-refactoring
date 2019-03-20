<template>
  <div class="m-records">
    <Grid :rows="2" class='list' v-if="records.length === 0">
      <div class="showNoOffer">
        <div class="content">
          <img src="/static/noOffer.png" width="50px" />
          <div class="text"> 数据被瞄星人偷走了~</div>
        </div>
      </div>
    </Grid>
    <div v-else v-for="record in records" class="record">
      <div class="icon">
        <img :src='record.specialty.restaurant.cover'>
      </div>
      <div class="left">
        <p class="title">{{record.specialty.restaurant.name}}</p>
        <p class="time">消费花费：{{record.money}}</p>
        <!--<p class="time">{{record.created_at | format('YYYY-MM-DD')}}</p>-->
      </div>
      <div class="right">
        <span class="price"><span class="text">{{record.specialty.type}}：</span>{{record.specialty.value || 0}}元</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { Grid } from 'vux';
  import api from '@/utils/api';

  export default{
    name: 'purchases',
    data() {
      return {
        records: [],
      };
    },
    created() {
      this.initData();
    },
    methods: {
      async initData() {
        const res = await api.get('/record');
        this.records = res.data.rows || [];
        console.log(this.records);
      },
    },
    components: {
      Grid,
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
      height: 50px;
      margin: 0 25px;
      padding: 15px 0;
      border-bottom: 1px solid #eeeeee;
      .icon{
        width: 20%;
        float: left;
        img{
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      .left{
        width: 50%;
        float: left;
        line-height: 22px;
        .title{
          font-size: 16px;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #333;
        }
        .time{
          font-size: 14px;
          color: #333;
        }
      }
      .right{
        /*width: 40%;*/
        float: right;
        height: 45px;
        line-height: 45px;
        color: #000;
        font-size: 12px;
        border-left:1px solid #eaeaea;
        padding-left:15px;
      }
    }
  }
</style>
