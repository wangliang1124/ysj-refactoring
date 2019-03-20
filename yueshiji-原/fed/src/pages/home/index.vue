<template>
  <div class="m-homepage">
      <flexbox class='header' :gutter="0">
        <flexbox-item class="currentPlace" :span="1/6" ><span @click="showPlace=true">{{currentPlace}} <i class="iconfont icon-arrow-down"></i></span>
        </flexbox-item>
        <flexbox-item :span="2/3" class="searchBox">
          <input type="search" class="searchIpt" v-model="filter.q" placeholder="搜索首发玥享餐厅" @keyup.13="searchProduct" /><i class="iconfont icon-search" />
        </flexbox-item>
        <flexbox-item class="userBox">
          <router-link :to="{name: 'personCenter'}"><span class="userWrap"><i class="iconfont icon-user"></i></span></router-link>
        </flexbox-item>
      </flexbox>
      <Swiper dots-class="dots" :list="banners" :show-dots='banners.length > 1' :show-desc-mask='false' :loop='true' :auto='true' :aspect-ratio="9/16"/>
      <sticky>
        <div class="tab">
          <div class="tabWrap">
            <tab :line-width=2  active-color="#6a256a" custom-bar-width="60px" >
              <template v-for="(item, index) in tabList">
                <tab-item class="{ 'vux-center': true }" v-if="filter.orderby === item.key"
                          @on-item-click="tabChange(item)" :key="index">{{item.name}}</tab-item>
                <tab-item class="vux-center" v-else @on-item-click="tabChange(item)" :key="index">{{item.name}}</tab-item>
              </template>
              <tab-item class="vux-center" key="filter" @on-item-click="showFilter = true">筛选</tab-item>
            </tab>
          </div>
        </div>
      </sticky>
    <div class='list' v-infinite-scroll="loadingMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <Grid :rows="2">  <!-- <Grid :cols="2"> vux>2.6.0-->
        <template v-for="(item, index) in offerList">
          <grid-item v-for="(offer, index2) in item"  :key="offer.index">
            <router-link :to="{name:'productDetail',params:{id:offer.id}}">
              <offer :offer="offer" :key="offer.id" />
            </router-link>
          </grid-item>
        </template>
      </Grid>
      <div v-if="loading" class="loading">
        <!-- <img src="/static/loading.gif" width="100px" /> -->
        <span style="font-size:35px;color:#550055" class="iconfont icon-IKsuHWPb"></span>
        <p style="font-size:14px;color:#550055;margin-top:10px">加载中...</p>
      </div>
      <!-- <div v-if="showNoMore" class="showNoMore">没有更多了</div> -->
      <div v-if="showNoOffer" class="showNoOffer">
        <img src="/static/noOffer.png" width="50px" />
        <div class="text"> 数据被瞄星人偷走了~</div>
      </div>
    </div>
    <div class="shareText" v-if="showShare">
        <span class="iconfont icon-close"  @click="showShare=false"/>
        {{showXufei ? "您的玥享会员即将到期" : "加入玥享会员，开启轻奢美食之旅"}}
      <x-button mini link="card">{{(vipInfo && vipInfo.isVip) ? '立即续费':'立即开通'}}</x-button>
    </div>
    <actionsheet v-model="showPlace" :menus="locations" @on-click-menu="choosePlace"
                 :close-on-clicking-mask="true"></actionsheet>
    <x-dialog v-model="showFilter" class="filter-dialog"   :hide-on-blur="true" dialog-transition="">
      <div class="content">
        <div class="dialog-content">
          <h2><span class="iconfont icon-jSQeuJJX"></span>人均</h2>
          <div>
            <checker v-model="unit_average" default-item-class="area-item" selected-item-class="area-item-selected">
              <template  v-for="(item, index) in priceRangeList">
                <template v-if = 'index%4== 0 && index !== 0'><div class="whiteLine"></div></template>
                <checker-item :value="item.key" :key="index" :class="{ spacing: index%4!= 3 }">{{item.value}}</checker-item>
              </template>
            </checker>
          </div>
          <h2><span class="iconfont icon-oVysciLwD"></span>商圈</h2>
          <div>
            <checker v-model="filter.district_id" default-item-class="area-item" selected-item-class="area-item-selected">
              <template  v-for="(item, index) in areaList">
                <template v-if="showMoreArea || index <= maxFilterItem">
                  <template v-if = 'index%4== 0 && index !== 0'><div class="whiteLine"></div></template>
                  <checker-item :value="item.key" :key="index" :class="{ spacing: index%4!= 3 }">{{item.value}}</checker-item>
              </template>
              </template>
              <span class="filterMore" v-if=" areaList.length >maxFilterItem" @click="showMoreArea =!showMoreArea ">{{ !showMoreArea ? '更多':'收起'}}</span>
            </checker>
          </div>
          <h2><span class="iconfont icon-GIKjR"></span>菜系</h2>
          <div>
            <checker v-model="filter.cuisine_id" default-item-class="area-item" selected-item-class="area-item-selected">
              <template  v-for="(item, index) in cuisineList">
                <template v-if="showMoreCuisine || index <= maxFilterItem">
                  <template v-if = 'index%4== 0 && index !== 0'><div class="whiteLine"></div></template>
                  <checker-item :value="item.key" :key="index" :class="{ spacing: index%4!= 3 }">{{item.value}}</checker-item>
                </template>
              </template>
              <span class="filterMore" v-if=" cuisineList.length >maxFilterItem" @click="showMoreCuisine =!showMoreCuisine ">{{ !showMoreCuisine ? '更多':'收起'}}</span>
            </checker>
          </div>
          <h2><span class="iconfont icon-aUIbgI"></span>场景</h2>
          <div>
            <checker v-model="filter.scene_id" default-item-class="area-item" selected-item-class="area-item-selected">
              <template  v-for="(item, index) in sceneList">
                <template v-if="showMoreArea || index <= maxFilterItem">
                  <template v-if = 'index%4== 0 && index !== 0'><div class="whiteLine"></div></template>
                  <checker-item :value="item.key" :key="index" :class="{ spacing: index%4!= 3 }">{{item.value}}</checker-item>
              </template>
              </template>
              <span class="filterMore" v-if=" sceneList.length >maxFilterItem" @click="showMoreScene =!showMoreScene ">{{ !showMoreScene ? '更多':'收起'}}</span>
            </checker>
          </div>
          <h2><span class="iconfont icon-KpuupjrjIu"></span>其他</h2>
          <div>
            <checker v-model="filter.other_id" default-item-class="area-item" selected-item-class="area-item-selected">
              <template  v-for="(item, index) in otherList">
                <template v-if="showMoreArea || index <= maxFilterItem">
                  <template v-if = 'index%4== 0 && index !== 0'><div class="whiteLine"></div></template>
                  <checker-item :value="item.key" :key="index" :class="{ spacing: index%4!= 3 }">{{item.value}}</checker-item>
              </template>
              </template>
              <span class="filterMore" v-if=" otherList.length >maxFilterItem" @click="showMoreOther =!showMoreOther ">{{ !showMoreOther ? '更多':'收起'}}</span>
            </checker>
          </div>
        </div>
      </div>
    </x-dialog>
    <div  class="dialog-footer" v-if="showFilter">
      <span class="btn btn-grey" v-if="!couldFilter" @click="clearFilter">重置</span><span v-else class="btn btn-grey disabled">重置</span><template><span class="btn btn-red" @click="searchProduct">确定</span></template>
    </div>
  </div>
</template>

<script>
  import api from '@/utils/api';
  import wxConfig from '@/utils/wx';
  import store from '@/vuex';
  import { mapGetters } from 'vuex';
  import { Swiper, XHeader, Search, Flexbox, Scroller, FlexboxItem, Checker, CheckerItem, Grid, GridItem, Sticky, Tab, TabItem, Masker, XButton, Actionsheet, XDialog } from 'vux';
  import Offer from './components/offer';

  export default {
    name: 'home',
    components: {
      Swiper,
      Scroller,
      Actionsheet,
      XHeader,
      Search,
      Flexbox,
      FlexboxItem,
      Checker,
      CheckerItem,
      Grid,
      GridItem,
      Sticky,
      Tab,
      TabItem,
      Offer,
      Masker,
      XButton,
      XDialog,
    },
    data() {
      return {
        showPlace: false,
        showShare: false,
        showFilter: false,
        loading: false,
        showNoMore: false,
        showNoOffer: false,
        showXufei: false,
        offerListOfCache: [],
        areaList: [],
        sceneList: [],
        otherList: [],
        cuisineList: [],
        showMoreCuisine: false,
        showMoreArea: false,
        showMoreScene: false,
        showMoreOther: false,
        maxFilterItem: 10,
        priceRangeList: [
          {
            key: '200-500',
            value: '200-500元',
          },
          {
            key: '500-1000',
            value: '500-1000元',
          },
          {
            key: '1000-3000',
            value: '1000元以上',
          },
        ],
        unit_average: '',
        filter: {
          scene_id: '',
          other_id: '',
          cuisine_id: '',
          district_id: '',
          city_id: '',
          orderby: 'updated_at',  // orderby: 'created_at',
          page: 1,
          per_page: 30,  // 10->30 一次请求30个，然后多次加载
          order: 'desc',  //  order: 'asc',
          q: '',
          location: '', // 用户定位信息
          filter: '',
        },
        tabList: [{ name: '最新', key: 'created_at', order: 'desc' }, { name: '距离', key: 'location', order: 'ASC' }, { name: '人均', key: 'unit_average', order: 'ASC' }],
        currentPlace: '上海',
        locations: [],
        banners: [],
        offerList: [],
        specialtyData: [], // 存放请求到的数据
        loadingNum: 4, // 每次加载数量
      };
    },
    computed: {
      ...mapGetters(['token', 'userInfo', 'vipInfo']),
      couldFilter() {
        const { cuisine_id: cuisine = '', district_id: district = '', unit_average: price = '', scene_id: scene = '', other_id: other = '' } = this.filter;
        return cuisine === '' && district === '' && price === '' && scene === '' && other === '';
      },
    },
    created() {
      this.initData();
      //
      this.$watch('unit_average', (val) => {
        if (!val) {
          this.filter.filter = '';
        } else {
          const arr = val.split('-');
          this.filter.filter = `{"unit_average":{"$between":[${arr[0]},${arr[1]}]}}`;
        }
      });
    },
    mounted() {
      // window.onscroll = () => {
      //   if (this.$route.name === 'home') {
      //     if (document.body.scrollHeight - (window.innerHeight + document.body.scrollTop) < 1000) {
      //       if (!this.loading && !this.showNoOffer && !this.loading) {
      //         this.loadingMore();
      //       }
      //     }
      //   }
      // };
    },
    methods: {
      async initData() {
        const locations = await api.get('/area');
        this.parseLocations(locations.data);

        const res = await api.get(`/user/${this.token.user_id}`);
        const vip = res.data.user_vip;
        store.dispatch('setUserInfo', res.data);
        if (!vip.isVip) {
          this.showShare = true;
        } else {
          const timeDiff = vip.expire_time - Date.now() <= 60 * 60 * 24 * 90 * 1000;
          if (timeDiff) {
            this.showShare = true;
            this.showXufei = true;
          }
        }

        //
        const banners = await api.get(`/banner?intro=${this.currentPlace}`);
        this.banners = this.parseBanners(banners.data.rows);

        const cuisines = await api.get('/cuisine?per_page=50');
        this.cuisineList = this.parseFilterData(cuisines.data, 'cuisine');

        const scenes = await api.get('/scene?per_page=50');
        this.sceneList = this.parseFilterData(scenes.data, 'scene');

        const others = await api.get('/other?per_page=50');
        this.otherList = this.parseFilterData(others.data, 'other');

        // 调用微信分享功能
        this.wxShare();
      },
      parseLocations(list) {
        const newList = list.map(
          item => ({ value: item.id, label: item.city }),
        );
        this.locations = newList;
        // 读取缓存地址，先刷一版页面出来
        let locationId = localStorage.getItem('current_location');
        if (newList && newList.length) {
          if (!locationId) {
            locationId = newList[0].value;
          }
          this.choosePlace(locationId);
        }
        // 看定位是否和缓存的地址相近，如果有更近的弹窗询问
        this.adjustCurrentPlace(list, locationId);
      },
      /**
       *  看定位是否和换缓存的地址相近，如果有更近的弹窗询问
       * @param list 开通城市列表
       * @param locationId 缓存城市id
       */
      adjustCurrentPlace(list, locationId) {
        const me = this;
        wxConfig.getLocation(list, (res, currentPlace) => {
          const minPlace = res;
          this.filter.location = `${currentPlace.longitude},${currentPlace.latitude}`;
          if (!locationId || `${minPlace.id}` !== `${locationId}`) {
            const { id, city } = minPlace;
            this.$vux.confirm.show({
              title: `定位您在${city}附近`,
              content: '是否切换到该城市进行搜索',
              onConfirm() {
                localStorage.setItem('current_location', id);
                me.choosePlace(id);
              },
            });
          }
        });
      },
      parseBanners(list) {
        return list.map(
          item => ({ url: item.link, img: item.url }),
        );
      },
      parseFilterData(list, key) {
        return list.map(
          item => ({ value: item[key], key: item.id }),
        );
      },
      tabChange(tab) {
        this.filter.orderby = tab.key;
        if (this.filter.orderby === tab.key) {
          tab.order = tab.order === 'desc' ? 'asc' : 'desc';
        }
        this.filter.order = tab.order || 'desc';
        this.searchProduct();
      },
      choosePlace(val) {
        let currentPlace = '';
        let currentPlaceId = '';
        this.locations.forEach((item) => {
          if (`${item.value}` === `${val}`) {
            currentPlace = item.label;
            currentPlaceId = item.value;
          }
        });
        this.currentPlace = currentPlace;
        this.filter.city_id = currentPlaceId;
        this.initDataByChangePlace();
      },
      async initDataByChangePlace() {
        const districts = await api.get('/district?per_page=50', { params: { restaurant_area_id: this.filter.city_id } });
        this.areaList = this.parseFilterData(districts.data, 'district');
        this.searchProduct();
        const banners = await api.get(`/banner?intro=${this.currentPlace}`);
        this.banners = this.parseBanners(banners.data.rows);
      },
      clearFilter() {
        this.unit_average = '';
        this.filter = {
          ...this.filter,
          scene_id: '',
          other_id: '',
          cuisine_id: '',
          district_id: '',
          filter: '',
        };
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
      async searchProduct() {
        this.offerList = [];
        this.offerListOfCache = [];
        this.loading = true;
        this.showNoOffer = false;
        this.showFilter = false;
        this.filter.page = 1;
        const res = await api.get('/specialty', { params: this.filter });
        this.specialtyData = res.data.rows;  // const nList
        this.loading = false;
        if (this.specialtyData && this.specialtyData.length) {
          this.offerListOfCache = res.data.rows.slice(0, this.loadingNum); // 把获取到的数据，截取为子数组
          this.offerList = this.parseOffers(this.offerListOfCache);
          this.showNoMore = false;
          this.showNoOffer = false;
        } else {
          this.showNoMore = false;
          this.showNoOffer = true;
        }
        console.log('首页-初始化餐厅列表');
        console.log(this.offerListOfCache);
      },
      async loadingMore() {
        if (this.showNoOffer || this.showNoMore || this.loading) return;
        console.log('==============>>>>loadingMore');
        console.log(this.showNoOffer, this.showNoMore, this.loading);
        // this.loading = true;
        // const res = await api.get('/specialty', { params: this.filter });
        // const nList = res.data.rows;
        // this.loading = false;
        const start = this.loadingNum * this.filter.page;
        this.filter.page += 1;
        const end = this.loadingNum * this.filter.page;
        const len = this.specialtyData.length;
        if (len > end) {
          const nList = this.specialtyData.slice(start, end);
          this.offerListOfCache = [...this.offerListOfCache, ...nList];
          this.offerList = this.parseOffers(this.offerListOfCache);
          // console.log('=========more');
          // console.log(this.specialtyData.length, start, end, this.offerListOfCache);
          this.showNoMore = false;
        } else {
          const nList = this.specialtyData.slice(start, len);
          this.offerListOfCache = [...this.offerListOfCache, ...nList];
          this.offerList = this.parseOffers(this.offerListOfCache);
          this.showNoMore = true;
          console.log('加载完毕！');
        }


        // if (nList && nList.length) {
        //   this.offerListOfCache = [...this.offerListOfCache, ...nList];
        //   this.offerList = this.parseOffers(this.offerListOfCache);
        //   this.loading = false;
        // } else {
        //   this.showNoMore = true;
        // }
      },
      wxShare() {  // 微信自定义分享
        wxConfig.initWx();
        const wx = window.wx;
        wx.ready(() => {
          // 初始化微信自定义分享参数
          const shareData = {
            desc: '私享京沪101道主厨定制隐藏菜',
            title: '立即加入玥享会员,开启尊享美食之旅 ',
            imgUrl: 'http://ysj.tcfellow.com:3000/assets/uploads/0726_YUE_icons_FINAL_OUTLINE-30.png',
            link: `http://${location.host}/`,
          };
          console.log('wx ready============');
          console.log(shareData);
          wx.onMenuShareTimeline(shareData);
          wx.onMenuShareAppMessage(shareData);
        });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
  ::-webkit-input-placeholder { /* WebKit browsers */
    color: #550055 !important;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #550055 !important;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #550055 !important;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #550055 !important;
  }
  .vux-icon-dot.active{
    color:#550055 !important;
    background-color: #550055 !important;
  }
  .m-homepage {
    background: #fff;
    color: white;
    .weui-grids:before, .weui-grid:before,.weui-grid:after{
      border:0;
    }
    .currentPlace {
      padding-left: 20px;
      line-height: 4em;
      font-size: 14px;
      color: #550055;
      .icon-arrow-down {
        font-size: 14px;
      }
    }
    .userBox {
      text-align: right;
      margin-right: 20px;
      .userWrap {
        display: inline-block;
        width: 2em;
        height: 2em;
        border-radius: 50%;
        /*background: #000;*/
        text-align: center;
        margin-left: 5px;
        line-height: 2em;
        .icon-user {
          color: #550055;
        }
      }
    }

    .searchBox {
      position: relative;
      left: -6px;
      .searchIpt {
        background: transparent;
        border: solid 1px #550055;
        padding: 9px 10px 9px 32px;
        -webkit-border-radius: 10em;
        -moz-border-radius: 10em;
        border-radius: 10em;
        -webkit-transition: all .5s;
        -moz-transition: all .5s;
        transition: all .5s;
        width: 100%;
        color:#550055;
      }
      .icon-search {
        position: absolute;
        left: 12px;
        top: 8px;
      }
    }
    .header {
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
      height: 4em;
      background: transparent;
      color: #550055;
    }
    .shareText{
      position: fixed;
      bottom: 0;
      left: 0;
      right:0;
      height: 49px;
      line-height: 49px;
      font-size: 14px;
      color:#ccc;
      background-image: url('../../../static/条.jpg');
      /*width: 100%;*/
      z-index:2;
      padding-left:20px;
      .weui-btn_default{
        margin-left:20px;
        background: #000;
        color:#ccc;
        position: absolute;
        top: 10px;
        right: 10px;
      }
      .icon-close{
        font-size: 14px;
        margin-right: 5px;
      }
    }
    .tab{
      background: #fff;
      border-bottom: 1px solid #eaeaea;
      .tabWrap{
        padding:0 20px;
        width: 240px;
      }
      .vux-tab-item{
        font-size: 13px;
        background: none;
      }
    }
    .list{
      min-height: 600px;
      padding: 0 10px;
      .weui-grid{
        // height: 319px;
        // height: 312px;
        padding:10px 10px 0px 10px;
        // width:45%;
      }
      .weui-grids:after{
        content:none;
      }
    }
    .filter-dialog{
      .weui-dialog{
        top:0;
        left:0;
        width: 100%;
        height: 80%;
        overflow: auto;
        max-width: none;
        transform: initial;
        .dialog-content{
          color:#000;
          padding:0 2%;
          height: 100%;
          margin-bottom:10px;
          overflow-y: auto;
          h2{
            padding:25px 0;
            font-size:14px ;
            color:#000;
            text-align: left;
            .iconfont{
              margin-right: 10px;
              color:#999;
            }
          }
          .filterMore{
            display: inline-block;
            width: 20%;
            padding: 8px 0;
            text-align: center;
            box-sizing: border-box;
            color:#550055;
          }
          .vux-checker-box{
            text-align: left;
            .area-item{
              width: 20%;
              border: 1px solid #999;
              padding: 8px 0;
              box-sizing: border-box;
            }
            .whiteLine{
              height: 15px;
            }
            .spacing{
              margin-right:5%;
            }
            .area-item-selected{
              background: #550055;
              color:#fff;
            }
            .vux-checker-item{
              text-align: center;
            }
          }
        }
      }
    }
    .dialog-footer{
      position: fixed;
      top: 80%;
      left: 0;
      width: 100%;
      z-index:1000;
      text-align: center;
      .btn{
        width: 50%;
        padding:10px 0;
        color:#fff;
        display: inline-block;
        font-size: 14px;
      }
      .btn-grey{
        background: #ccc;
        &.disabled{
          background: #000;
          color:#fff;
        }
      }
      .btn-red{
        background: #550055;
      }
    }
    .showNoMore{
      padding: 10px 0;
      margin-bottom: 50px;
      text-align: center;
      color: #222;
    }
    .showNoOffer{
      margin-top: 80px;
      text-align: center;
      .text{
        margin-top:10px;
        color: #ccc;
      }
    }
    .loading{
      margin-top: 20px;
      text-align: center;
      margin-bottom: 50px;
    }
    .weui-dialog__btn_primary{
        color:#550055;
    }
    .vux-actionsheet-menu-default{
      padding:15px 0;
    }

    ::-webkit-input-placeholder { /* WebKit browsers */
      color: #fff;
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: #fff;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #fff;
    }
  }
</style>
