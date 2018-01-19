<template>
  <div class="flexible-test">
    <div class="item-section" v-for="section in sections">
      <div class="item-section_header">
        <h2><img :src="section.brannerImag"></h2>
      </div>
      <ul>
        <li v-for="item in section.items" class="flag" role="link" :href="item.itemLink"> <a class="figure flag-item" :href="item.itemLink"> 
          <img :src="item.imgSrc" alt=""></a>
          <div class="figcaption flag-item">
            <div class="flag-title"><a :href="item.itemLink" title="">{{item.poductName}}</a></div>
            <div class="flag-price">
              <span>双11价</span><strong>¥{{item.price}}</strong><small>({{item.preferential}})</small>
            </div>
            <div class="flag-type">{{item.activityType}}</div>
            <a class="flag-btn" :href="item.shopLink">{{item.activeName}}</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {

  name: 'Home',

  data() {
    /* eslint-disable */
    return {
      sections: [{
        "brannerImag": "http://gw.alicdn.com/mt/TB1PNLZKXXXXXaTXXXXXXXXXXXX-750-481.jpg",
        items: [{
          "itemLink": "##",
          "imgSrc": "https://placeimg.com/350/350/people/grayscale",
          "poductName": "Carter's1年式灰色长袖连体衣包脚爬服全棉鲸鱼男婴儿童装115G093",
          "price": "299.06",
          "preferential": "满400减100",
          "activityType": "1小时内热卖5885件",
          "shopLink": "##",
          "activeName": "马上抢！"
        }, {
          "itemLink": "##",
          "imgSrc": "https://placeimg.com/350/350/people/grayscale",
          "poductName": "Nike耐克官方ZOOM KOBE VENOMENON 5 EP 科比男子篮球鞋815757",
          "price": "699.50",
          "preferential": "满300减150",
          "activityType": "6744人正在疯抢",
          "shopLink": "##",
          "activeName": "马上抢！"
        }, {
          "itemLink": "##",
          "imgSrc": "https://placeimg.com/350/350/people/grayscale",
          "poductName": "现货【送皮套+钢膜+耳机】Xiaomi/小米 红米Note2手机note2",
          "price": "799.00",
          "preferential": "满300减150",
          "activityType": "7833人正在疯抢",
          "shopLink": "##",
          "activeName": "马上抢！"
        }, {
          "itemLink": "##",
          "imgSrc": "https://placeimg.com/350/350/people/grayscale",
          "poductName": "ONLY2015秋装新品七分袖弹力修身针织衫女",
          "price": "299.00",
          "preferential": "满300减100",
          "activityType": "2379人想买",
          "shopLink": "##",
          "activeName": "马上抢！"
        }, {
          "itemLink": "##",
          "imgSrc": "https://placeimg.com/350/350/people/grayscale",
          "poductName": "Levi's李维斯513春季男士修身直筒牛仔裤长裤",
          "price": "399.00",
          "preferential": "满300减100",
          "activityType": "预热期加购TOP1",
          "shopLink": "##",
          "activeName": "马上抢！"
        }, {
          "itemLink": "##",
          "imgSrc": "https://placeimg.com/350/350/people/grayscale",
          "poductName": "Levi's李维斯513春季男士修身直筒牛仔裤长裤",
          "price": "399.00",
          "preferential": "满300减100",
          "activityType": "预热期加购TOP1",
          "shopLink": "##",
          "activeName": "马上抢！"
        }]
      }]
    }
  },
}

</script>
<style lang="stylus" scoped>
 @import '../assets/stylus/mixin.styl'
 
 .selector { 
   width: 150px; 
   height: 64px; /*px*/ 
   font-size: 28px; /*px*/ 
   border: 1px solid #ddd; /*no*/ 
}

.flexible-test .item-section {
  min-height: 100%
  // background-color: #ee0a3b
  position: relative;
  font-dpr(12px)
}

.item-section_header {
  text-align: center
}

.item-section_header img {
  // width: 10rem
  width: 750px
}

.item-section ul {
  padding: .133333rem
}

.flag {
  display: table;
  width: 100%;
  margin-bottom: 1px;
  background-color: #fff
}

.flag .flag-item {
  display: table-cell;
  padding: .16rem 0;
  vertical-align: top;
  background-color: #fff
}

.flag .flag-item.figcaption {
  width: 133.333333rem;
  padding-left: .2rem;
  padding-right: .2rem;
  position: relative
}

.flag .flag-item.figure {
  width: 2.4rem;
  height: 2.4rem
}

.flag .flag-item img {
  width: 2.4rem;
  height: 2.4rem;
  vertical-align: top
}

.flag .flag-title a {
  color: #333;
  line-height: 1.25;
  overflow: hidden;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  display: -webkit-box;
  display: box
}

.flag .flag-price {
  padding: .15rem 0 .2rem
}

.flag .flag-price span {
  display: inline-block;
  background-color: #ee0a3b;
  vertical-align: middle;
  border-radius: .026667rem;
  padding: .026667rem .08rem .013333rem;
  color: #fff;
  font-weight: 700;
  margin-right: .066667rem;
  // font-size: 11px
  font-dpr(11px);
}


.flag .flag-price strong {
  display: inline-block;
  vertical-align: middle;
  font-weight: 700;
  color: #ee0a3b;
  // font-size: 16px;
  font-dpr(16px);
  margin-right: .16rem
}

.flag .flag-price small {
  display: inline-block;
  vertical-align: middle;
  font-weight: 700;
  color: #ee0a3b;
  // font-size: 12px
  font-dpr(12px)
}

.flag .flag-type {
  color: #ff3600
}

.flag .flag-btn {
  position: absolute;
  width: 2.133333rem;
  height: .64rem;
  line-height: .64rem;
  background-color: #ee0a3b;
  text-align: center;
  color: #fff;
  font-weight: 700;
  // font-size: 14px;
  font-dpr(14px)
  bottom: .133333rem;
  right: .2rem;
  border-radius: .026667rem
}

</style>
