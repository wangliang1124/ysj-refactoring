<template>
  <div class="home">
    测试
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
        "brannerImag":"http://gw.alicdn.com/mt/TB1PNLZKXXXXXaTXXXXXXXXXXXX-750-481.jpg",
        items:[{
            "itemLink": "##",
            "imgSrc": "https://placeimg.com/350/350/people/grayscale",
            "poductName":"Carter's1年式灰色长袖连体衣包脚爬服全棉鲸鱼男婴儿童装115G093",
            "price": "299.06",
            "preferential": "满400减100",
            "activityType": "1小时内热卖5885件",
            "shopLink":"##",
            "activeName": "马上抢！"
        },{
            "itemLink": "##",
            "imgSrc": "https://placeimg.com/350/350/people/grayscale",
            "poductName":"Nike耐克官方ZOOM KOBE VENOMENON 5 EP 科比男子篮球鞋815757",
            "price": "699.50",
            "preferential": "满300减150",
            "activityType": "6744人正在疯抢",
            "shopLink":"##",
            "activeName": "马上抢！"
        },{
            "itemLink": "##",
            "imgSrc": "https://placeimg.com/350/350/people/grayscale",
            "poductName":"现货【送皮套+钢膜+耳机】Xiaomi/小米 红米Note2手机note2",
            "price": "799.00",
            "preferential": "满300减150",
            "activityType": "7833人正在疯抢",
            "shopLink":"##",
            "activeName": "马上抢！"
        },{
            "itemLink": "##",
            "imgSrc": "https://placeimg.com/350/350/people/grayscale",
            "poductName":"ONLY2015秋装新品七分袖弹力修身针织衫女",
            "price": "299.00",
            "preferential": "满300减100",
            "activityType": "2379人想买",
            "shopLink":"##",
            "activeName": "马上抢！"
        },{
            "itemLink": "##",
            "imgSrc": "https://placeimg.com/350/350/people/grayscale",
            "poductName":"Levi's李维斯513春季男士修身直筒牛仔裤长裤",
            "price": "399.00",
            "preferential": "满300减100",
            "activityType": "预热期加购TOP1",
            "shopLink":"##",
            "activeName": "马上抢！"
        },{
            "itemLink": "##",
            "imgSrc": "https://placeimg.com/350/350/people/grayscale",
            "poductName":"Levi's李维斯513春季男士修身直筒牛仔裤长裤",
            "price": "399.00",
            "preferential": "满300减100",
            "activityType": "预热期加购TOP1",
            "shopLink":"##",
            "activeName": "马上抢！"
        }]
      }]
    }
  },
}

</script>
<style lang="stylus" scoped>


</style>
