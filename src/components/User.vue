<template>
  <div class="user">
    <div class="user-wrapper">
      <div class="header">
        <div class="person">
          <h1 class="name">
            姓名
          </h1>
          <span class="edit">编辑个人资料</span>
        </div>
        <div class="avatar">
          <img src="" alt="">
        </div>
      </div>
      <div class="content-wrapper">
        <ul class="content">
          <li class="item" v-for="item in list">
            <!-- <a href="">{item.title} </a> -->
            <router-link :to="item.path">{{item.title}}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      list: [
        { title: '购买会员', path: '/buy' },
        { title: '我的玥享卡', path: '/card' },
        { title: '我的订单', path: '/order' },
        { title: '玥享卷', path: '/coupon' },
        { title: '邀请好友', path: '/share' },
        { title: '我的收藏', path: '/favorite' },
      ],
      test: '',
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  .user
    h1
      font-size: 30px
      color: red
</style>
