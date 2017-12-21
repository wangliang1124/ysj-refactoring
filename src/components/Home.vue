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
            <div class="flag-type">{{activityType}}</div>
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
    return {
      sections: [{
        brannerImag: 'http://xxx.cdn.com/B1PNLZKXXXXXaTXXXXXXXXXXXX-750-481.jpg',
        items: [{
          itemLink: '##',
          imgSrc: 'https://placeimg.com/350/350/people/grayscale',
          poductName: 'Carter\'s1年式灰色长袖连体衣包脚爬服全棉鲸鱼男婴儿童装115G093',
          price: '299.06',
          preferential: '满400减100',
          activityType: '1小时内热卖5885件',
          shopLink: '##',
          activeName: '马上抢！',
        }],
      }],
    }
  },
}

</script>
<style lang="stylus" scoped>


</style>
