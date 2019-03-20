<template>
  <div class="m-productDetail">
    <Swiper auto :list="banners" :aspect-ratio="9/16"/>
    <div class="header_title"> 
      <h1>{{restaurant.name}}</h1 >
      <!-- <div class="sub_title">本餐厅被收藏数{{detail.collected}}</div> -->
    </div>
    <flexbox class='detail' :gutter="0" justify="space-between">
      <flexbox-item class="border f-fl"  :span='50/200' >
        人均：{{restaurant.unit_average}}元
      </flexbox-item>
      <flexbox-item class="border"  >
        {{restaurant.restaurant_cuisine.cuisine}}
      </flexbox-item>
      <flexbox-item class="border"  >
        {{restaurant.restaurant_district.district}}
      </flexbox-item>
       <flexbox-item v-if="restaurant.restaurant_scene" class="border"  >
        {{restaurant.restaurant_scene.scene}}
      </flexbox-item>
      <flexbox-item class="f-f" :span='1/5'>
        {{getDistance || distance}}
      </flexbox-item>
    </flexbox>
    <div class="location">
      <div style="width:80%;display: inline-block" class="location-info" @click='openMap'>{{restaurant.address}}</div>
      <a :href="`tel:${restaurant.tel?restaurant.tel:restaurant.phone}`"><span style="font-size: 28px;position: absolute;right:26px" class="iconfont icon-MIVhacUud"></span></a>
    </div>
    <div class="pay">
      <div class="pay-info">
        <span class="info">价值{{detail.value}}元主厨{{detail.type}}</span>
        <!-- <span class="discountTag">{{detail.rebate}}折</span> -->
        <span class="buyBtn" @click='openSaoYiSao'>享用</span>
     </div>
    </div>
    <ul class="advantages" @click="showMoreIcon = true">
      <li v-for="icon in iconsBefore" :key="icon"><span :class='icon.icon'></span><p>{{icon.title}}</p></li>
      <span v-if="iconsAfter.length > 0" class="arrowIcon" @click="showMoreIcon = true">
        <x-icon type="ios-arrow-right" size="14"></x-icon>
      </span>
    </ul>
    <div class="u-bar-img">
      <img :src="detail.cook_avatar">
      <div class="title">主厨: {{detail.cook_name}}</div>
    </div>
    <div class="like">
      <i class="iconfont icon-thumbup" :class="{liked: liked}" @click="likeChef"></i><br/>
      <span class="num">{{detail.cook_liked + 9}}赞</span>
    </div>
    <div class="ranking">
      <span class="item"><a href="/ranklist/cook">主厨排名&nbsp;&nbsp; {{this.chefIndex + 1}}</a></span>
      <span class="item"><a href="/ranklist/month">餐厅月排名&nbsp;&nbsp; {{this.monthIndex + 1}}</a></span>
      <span class="item"><a href="/ranklist/total">餐厅总排名&nbsp;&nbsp; {{this.totalIndex + 10}}</a></span>
    </div>
    <div class="about-chef">
      <div class="title">主厨介绍</div>
      <div class="about">{{detail.cook_intro}}</div>
      <!-- <div class="title" v-if="detail.cook_super">恭喜{{detail.cook_name}}成为本月玥享超赞主厨<span class="iconfont icon-AiKfgflG"></span></div> -->
    </div>
    <!-- <div class="">测试{{}}</div> -->
    <div class="u-bar" @click="showNotice = true">
      <div class="title">使用须知</div>
      <span class="iconfont icon-arrow-right" />
    </div>
    <a :href="detail.shitan_markdown_url" v-if="!!detail.shitan_markdown_url && detail.shitan_markdown_url !== ' '">
      <div class="u-bar">
          <div class="title">《超级食探》</div>
          <span class="iconfont icon-arrow-right" />
      </div>
    </a>
    <a :href="detail.shika_markdown_url" v-if="!!detail.shika_markdown_url && detail.shika_markdown_url !== ' '">
      <div class="u-bar">
        <div class="title">Chef Talk</div>
        <span class="iconfont icon-arrow-right" />
      </div>
    </a>
    <div class="detailHtml ql-editor" v-html='detail.content_markdown_url'></div>
    <div class="commendation">
      <div class="title" v-if='recommendRestaurants.length'>同类推荐</div>
        <Grid :rows="2">
          <grid-item  v-for="item in recommendRestaurants"  :key="item.index">
            <router-link :to="{ name:'productDetail',params:{ id:item.specialties[0].id } }">
              <offer :offer="item" :key="item.specialties[0].id" /> 
            </router-link>
          </grid-item>
      </Grid>
    </div>
    <!-- <div v-if='recommendRestaurants.length' class="end"><span>E n d</span></div> -->

    <!-- <div id="allMap" class="map"></div> -->
    <x-dialog v-model="showNotice" class="m-dialog" :scroll="true"  :hide-on-blur="true">
      <p class="dialog-title">使用须知</p>
      <div class="dialog-content" v-html="detail.rule_markdown_url"></div>
      <div @click="showNotice=false" class="dialog-footer">
        <x-icon type="ios-close-empty" size="30"></x-icon>
      </div>
    </x-dialog>
    <div v-show="showMoreIcon && iconsAfter.length !== 0" class="m-dialog-icons">
      <div class="dialog-content">
        <div class="content" >
          <!-- <div class="closeBtn" @click="showMoreIcon = false"><x-icon type="ios-close-empty" size="40"></x-icon></div> -->
          <div class="header">
            <div class="closeBtn" @click="showMoreIcon = false"><x-icon type="ios-close-empty" size="40"></x-icon></div>
            <h1>其他设施</h1>
          </div>
          <cell  v-for="(item,index) in iconsAfter" :title="item.title"   :key="index" >
            <span style="color: #550055"  :class="`iconfont ${item.icon}`"></span>
          </cell>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import wxconfig from '@/utils/wx';
  import api from '@/utils/api';
  import { mapGetters } from 'vuex';
  import { XButton, Swiper, Flexbox, FlexboxItem, XDialog, Cell, Grid, GridItem } from 'vux';
  import util from '@/utils/location';
  import Offer from './components/offer';

  // const BMap = window.BMap;
  export default {
    name: 'productDetail',
    components: {
      XButton,
      Swiper,
      Flexbox,
      FlexboxItem,
      XDialog,
      Cell,
      Grid,
      Offer,
      GridItem,
    },
    data() {
      return {
        showMoreIcon: false,
        iconsBefore: [
        ],
        iconsAfter: [
        ],
        icons: [],
        detail: {},  // 餐厅详情
        restaurant: {
          restaurant_cuisine: {},
          restaurant_district: {},
        },
        banners: [],
        showNotice: false,
        distance: null,
        recommendRestaurants: [],
        chefIndex: 0, // 厨师排行
        monthIndex: 0, // 餐厅月总排行
        totalIndex: 0,
        liked: false,
      };
    },
    computed: {
      ...mapGetters(['location', 'vipInfo']),
      getDistance() {
        const { location_y: loY, location_x: loX, distance } = this.restaurant;
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
          this.distance = `${(Number(util.getDistance(loY, loX, latitude, longitude)) / 1000).toFixed(2)}km`;
        });
        return '';
      },
    },
    created() {
      this.initData();   // 页面挂载前初始化数据
      this.initRankData(); // 初始化排行数据
    },
    beforeRouteUpdate(to, from, next) {
      location.replace(to.path);
      next();
    },
    methods: {
      async initData() {
        const res = await api.get(`/specialty/${this.$route.params.id}`);
        this.detail = res.data;
        console.log('=========初始化数据=======');
        console.log(res.data);
        this.restaurant = res.data.restaurant || {};

        const icons = JSON.parse(this.restaurant.icons);
        this.icons = icons.map((i) => {
          switch (i) {
            case '待客泊车':
              return { title: i, icon: 'iconfont icon-oVysciLwD' };
            case '可带宠物':
              return { title: i, icon: 'iconfont icon-vPCHseaFi' };
            case '地铁附近':
              return { title: i, icon: 'iconfont icon-zFOmztGDo' };
            case '调酒吧台':
              return { title: i, icon: 'iconfont icon-xvFpiJrWX' };
            case '无线网络':
              return { title: i, icon: 'iconfont icon-shWTwrAEe' };
            case '有宝宝座':
              return { title: i, icon: 'iconfont icon-jSQeuJJX' };
            case '家庭聚会':
              return { title: i, icon: 'iconfont icon-RikPEBC' };
            case '升级包厢':
              return { title: i, icon: 'iconfont icon-iCAgknQ' };
            case '残疾人设施':
              return { title: i, icon: 'iconfont icon-IDdBCGitF' };
            case '观景露台':
              return { title: i, icon: 'iconfont icon-hhVBdtvF' };
            case '情侣约会':
              return { title: i, icon: 'iconfont icon-dFgpwBF' };
            case '停泊车位':
              return { title: i, icon: 'iconfont icon-UXeeuJPSuc' };
            case '商务宴席':
              return { title: i, icon: 'iconfont icon-LPaRCxiMw' };
            case '周末Brunch':
              return { title: i, icon: 'iconfont icon-DgrxzcJgS' };
            case '免费隐藏菜':
              return { title: i, icon: 'iconfont icon-GIKjR' };
            case '朋友聚会':
              return { title: i, icon: 'iconfont icon-aUIbgI' };
            case '玥享推荐':
              return { title: i, icon: 'iconfont icon-IKsuHWPb' };
            case '西式餐饮':
              return { title: i, icon: 'iconfont icon-UnBIjqLcy' };
            case '日本料理':
              return { title: i, icon: 'iconfont icon-wcfNVkazu' };
            case '中式餐饮':
              return { title: i, icon: 'iconfont icon-lqiLwkFL' };
            case '下午茶':
              return { title: i, icon: 'iconfont icon-wWzUEGHJu' };
            default:
              break;
          }
          return i;
        });
        this.iconsBefore = this.icons.slice(0, 5);
        this.iconsAfter = this.icons.slice(5, (this.icons.length));
        this.banners = this.parseBanners(this.restaurant.restaurant_imgs || []);
        // 推荐餐厅初始化
        if (res.data.recommend_id) {
          const recommendRestaurantsData = await api.get(`/restaurant/recommend/
            ${this.detail.recommend_id}`);
          this.recommendRestaurants = recommendRestaurantsData.data;
          console.log('=========初始化推荐餐厅数据=======');
          console.log(this.recommendRestaurants);
        }
        // 调用微信分享功能
        this.wxShare();
        // ======================================================
        // const { location_x, location_y } = this.restaurant;
        // const map = new BMap.Map('allMap');    // 创建Map实例
        // const marker = new BMap.Marker(new BMap.Point(location_x, location_y));
        // map.centerAndZoom(new BMap.Point(location_x, location_y), 15);  // 初始化地图,设置中心点坐标和地图级别
        // map.enableScrollWheelZoom(true);     // 开启鼠标滚轮缩放
        // map.addOverlay(marker);
        // const that = this;
        // map.addEventListener('click', () => {
        //   wxconfig.openMap(
        //     that.restaurant.location_x,
        //     that.restaurant.location_y,
        //     that.restaurant.name,
        //     that.restaurant.address,
        //   );
        // });
      },
      async initRankData() {
        const res = await api.get('/collect/ranklist');
        const res2 = await api.get('/specialty/getcooktop11');
        const total = res.data[0];
        const month = res.data[1];
        const cooktop11 = res2.data;
        const id = parseInt(this.$route.params.id, 10);
        function getIndex(element) {  // findIndex callback
          return element.id === id;
        }
        this.chefIndex = cooktop11.findIndex(getIndex);
        this.totalIndex = total.findIndex(getIndex);
        this.monthIndex = month.findIndex(getIndex);
        console.log('=========初始化数据2=======' + this.chefIndex);
      },
      parseBanners(list) {
        return list.map(item => ({ img: item.url }));
      },
      openSaoYiSao() {
        if (this.vipInfo.isVip) {
          wxconfig.openSao((url) => {
            window.location.href = url;
          });
        } else {
          this.$vux.alert.show({ title: '',
            content: '您不是会员，点击开通会员卡',
            onHide: () => {
              this.$router.push({ name: 'card' });
            } });
        }
      },
      openMap() {
        wxconfig.openMap(
            this.restaurant.location_x,
            this.restaurant.location_y,
            this.restaurant.name,
            this.restaurant.address,
          );
      },
      wxShare() {  // 微信分享功能
        wxconfig.initWx(); // 请求签名认证
        const wx = window.wx;
        wx.ready(() => {
          const shareData = {   // 初始化微信自定义分享参数, 这个数据放在ready里面初始化，放在外面无效
            title: '立即加入玥享会员,开启尊享美食之旅 ',
            desc: `品尝「${this.restaurant.name}」${this.detail.name},价值${this.detail.value}元`,
            // imgUrl: `${this.detail.cover}`,  // 用这个图片不显示，据说需300*300以上图片
            imgUrl: 'http://ysj.tcfellow.com:3000/assets/uploads/0726_YUE_icons_FINAL_OUTLINE-30.png',
            link: `http://${location.host}/productDetail/${this.detail.id}`,
          };
          console.log('wx ready' + this.restaurant.name + shareData);
          console.log(shareData);
          wx.onMenuShareTimeline(shareData);
          wx.onMenuShareAppMessage(shareData);
        });
      },
      async likeChef() {
        if (!this.liked) {
          this.detail.cook_liked += 1;
          this.liked = true;
          console.log(this.detail.cook_liked);
          await api.put('/specialty/like', { id: this.$route.params.id, liked: this.detail.cook_liked });
        }
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
  .vux-icon-dot.active{
    color:#550055 !important;
    background-color: #550055 !important;
  }
  .m-productDetail {
    background: #fff;
    overflow-x: hidden;
    .header_title{
      padding:24px;
      padding-bottom: 0px;  //底部内边距修改为0
      text-align: center;
      h1{
        font-size: 18px;
        color: #000;   
      }
      // .sub_title {
      //     margin-top: 5px;
      //     color:rgba(17, 27, 37, 0.5)
      // }
    }
    .detail{
      color:#333;
      padding:24px 0;
      margin: 0 24px;
      width: auto;
      box-sizing: content-box;
      text-align: center;
      overflow: hidden;
      .border{
        border-right: 1px solid #999;
      }
      .f-fl{
        text-align: left;
      }
      .f-fr{
        text-align: right;
      }
    }
    .location{
      font-size: 12px;
      color:#333;
      height: 74px;
      line-height: 74px;
      padding: 0 24px;
      .location-info{
        .icon-MIVhacUud{
          float: right;
          color: #550055;
          font-size: 28px;
        }
      }
    }
    .pay {
      font-size: 12px;
      color: #333;
      height: 74px;
      line-height: 74px;
      padding: 0 24px;
      margin-bottom:2px;
      .pay-info {
        border-bottom: 1px solid #eeeeee;
        .info{
          display: inline-block;
          max-width: 50%;
          white-space: nowrap;
          overflow: hidden;
          float:left;
        }
        .discountTag {
          margin-left: 5px;
          padding: 2px 6px;
          font-size: 12px;
          color: #550055;
          border: 1px solid #550055;
          border-radius: 3px;
        }
        .buyBtn {
          float: right;
          line-height: 20px;
          margin-top:22px;
          padding:5px 20px;
          color: #eee;
          background: #000;
        }
      }
    }
    .advantages{
      position: relative;
      padding: 25px 0 30px;
      margin: 0 24px;
      height: 40px;
      font-size: 12px;
      .arrowIcon{
        position: absolute;
        right:-5px;
        top:0;
        height:40px;
        padding: 25px 0;
        line-height: 50px
      }
      li{
        width: 20%;
        float: left;
        text-align: center;
        .iconfont{
          font-size: 26px;
          color: #550055;
        }
        p{
          line-height: 20px;
        }
      }
    }
    .map{
      margin: 0 24px;
      height: 250px;
      background: #333;
      img{
        height: 250px;
        width: 100%;
      }
    }
    .u-bar{
      margin: 0 24px;
      height: 74px;
      line-height: 74px;
      border-bottom: 1px solid #eeeeee;
      img{
        height: 48px;
        width: 48px;
        border-radius: 24px;
        margin: 13px 0;
      }
      .title{
        font-size: 15px;
        float: left;
      }
      span{
        height: 74px;
        float: right;
      }
    }
    .u-bar-img{
      text-align: center;
      margin: 0 24px;
      img{
        height: 120px;
        width: 120px;
        border-radius: 50%;
        margin-bottom:16px;
      }
      .title{
        font-size: 15px;
      }
    }
    .like {
      position: relative;
      text-align: center;
      margin: 10px 0;
      line-height: 16px;
    }
    .like .icon-thumbup {
      position: relative;
      text-align: center;
      line-height: 20px;
      // padding-right: 20px;
      font-size: 30px;
      vertical-align: top;
      color: #4a094d
    }
    .like .liked {
      font-weight: 900
    }
    // .like .icon-thumbup .num{
    //   position: absolute;
    //   right: 2px;
    //   top: -4px;
    //   font-size: 10px;
    //   font-weight: bold;
    //   color: red;
    // }
    .ranking {
      display: flex;
      margin: 0 24px;
      border-top: 1px solid #eeeeee;
      border-bottom: 1px solid #eeeeee;
    }
    .ranking .item {
      flex: 1;
      margin: 10px 0;
      text-align: left;
      font-weight: bold;
      color: #480a4d;
      border-right: 2px solid #480a4d;
    }
    .ranking .item:nth-child(2) {
      text-align: center
    }
    .ranking .item:last-child{
      border-right: 0;
      text-align: right;
    }
    .detailHtml{
      margin: 0 24px;
      padding: 20px 0;
      border-bottom: 1px solid #eeeeee;
      line-height: 26px;
      font-size: 12px;
      overflow: hidden;
      img{
        width: 100% !important;
        height: 100% !important;
      }
    }
    .about-chef{
      margin: 0 24px;
      border-bottom: 1px solid #eeeeee;
      .title{
        padding: 20px 0;
        font-size: 15px;
        height: 26px;
        line-height: 26px;
        span{
          float: right;
          color: #550055;
          font-size: 26px;
        }
      }
      .about{
        line-height: 25px;
      }
    }
    .commendation{
      padding-top: 10px;
      margin: 0 24px;
      font-size: 15px;
      .weui-grids:before, .weui-grid:before,.weui-grid:after{
        border:0;
      }
      .weui-grid{
        // margin:10px 10px 0px 0px;
        // width:50%;
      }
      .weui-grids:after{
        content:none;
      }
      .weui-grid:first-child{
        padding-left: 0px
      }
      .weui-grid:last-child{
        padding-right: 0px
      }
      .weui-grids:after{
        content:none;
      }
    }
    .end{
      text-align: center;
      color:#ccc;
      padding-bottom: 10px;
    }
    .m-dialog {
      .dialog-title {
        padding: 25px 0;
        font-size: 16px;
        color: #333;
      }
      .dialog-content {
        height: 200px;
        padding: 10px 24px;
        overflow: scroll;
        text-align: left;
        color: #333;
        font-family: initial;
        h3 {
          font-size: 14px;
          margin-bottom: 15px;
          font-weight: normal;
          .point {
            font-size: 20px;
            font-weight: bold;
            margin-right: 5px;
          }
        }
        p {
          font-size: 12px;
          line-height: 20px;
          margin-bottom: 25px;
        }
      }
      .dialog-footer {
        .dialog-close {
          margin: 8px 0;
          color: #999;
        }
      }
    }
    .m-dialog-icons{
      position: fixed;
      z-index: 1001;
      background: #fff;
      top:0;
      left:0;
      height: 100%;
      width: 100%;
      overflow: auto;
      .closeBtn{
        float: left;
        top:10px;
        left:0;
        right: 0;
        text-align: left;
        background: #fff;
      }
      .header{
        margin-top:10px;
        h1{
          font-size: 18px;
          margin-bottom:10px;
          padding-left:12px;
          text-align: center;
        }
      }
        .dialog-content{
          color:#000;
          padding:0 2%;
          display: block;
          position: relative;
          overflow: scroll;
          .content{
            overflow: auto;
          }
          .weui-cell{
            padding: 10px 10px;
            font-size: 12px;
            .vux-label{
              text-align: left;
              line-height: 20px;
            }
            .iconfont{
              font-size: 24px;
              line-height: 24px;
            }
            &:before{
              bottom:0;
              top:auto;
            }
        }
      }
    }

  }
</style>
