<template>
  <div class="content-wrapper">
    <div class="content-cook-item" v-for='(item, index) in cookTop11' :key='index'>
      <div class="cover">
        <router-link :to="{ name:'productDetail', params:{id: item.id}}">
          <img :src="item.cook_avatar" :alt="item.restaurant.name">
        </router-link>
      </div>
      <div class="intro">
        <divider class='title'>No.{{index+1}}</divider>
        <span class="restaurant-name">{{item.restaurant.name}}</span><br/>
        <span class="cook-name">{{item.cook_name}}</span>
      </div>
    </div>
    <div v-if="!cookTop11.length">
      <h2 class='content-none'>~本月没有数据~</h2>
    </div>
  </div>  
</template>
<script type="text/javascript">
  import { Divider } from 'vux';
  import { mapGetters } from 'vuex';
  // import store from '@/vuex';

  export default {
    name: 'CookTop11',
    components: {
      Divider,
    },
    // props: {
    //   cooktop11: {
    //     type: Array,
    //     required: true,
    //   },
    // },
    computed: {
      ...mapGetters(['cookTop11']),
    },
    created() {
      console.log('=============================');
      console.log(this.cookTop11);
    },
  };
</script>
<style type="text/css" lang="stylus">
  .content-wrapper
    display: flex
    flex-wrap: wrap
    justify-content: space-around 
    padding-bottom: 30px; // sticky
    font-size: 0
    .content-cook-item
      position: relative
      margin-top: 10px
      padding: 0 10px 10px 10px
      width: 25%
      .cover
        a
          img
           width: 100%
           height: 100%
           min-height: 90px
           vertical-align: middle
      .intro
        margin-top: 5px 
        white-space: nowrap
        text-align: center
        font-size: 10px
        .title
          padding: 0
          font-weight: 700
          color: #a26ab1
        .restaurant-name
          display: inline-block
          max-width: 100px
          padding: 4px 0
          font-size: 12px
          font-weight: 900
          overflow: hidden
          text-overflow: ellipsis
        .cook-name
          display: inline-block
          overflow: hidden
          max-width: 80px
          text-overflow: ellipsis
      &:first-child
        width: 100%
        .title
          position: absolute
          top: 20px
          padding: 4px 10px 
          width: 90px
          border-top-right-radius: 4px
          border-bottom-right-radius: 4px
          font-size: 24px
          text-align: right
          color: #fff
          background-color: #480a4d
        .intro
          margin: 10px 10px 0 10px
          white-space: nowrap
          text-align: right
          font-size: 0px
          .cook-name
            float: left
            font-size: 12px
          .restaurant-name
            float: right
            display: inline
            max-width: 180px
            font-size: 12px
        .cover
          a
            img
             width: 100%
             height: 100%
             vertical-align: middle 
</style>
