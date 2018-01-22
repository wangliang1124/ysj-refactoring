# ysj公众号网页代码重构
> 历时：2017.12.20--2018.1.18 

## 项目简介

  这个项目是我所在公司的网站，这个网站是委托第三方开发的，包括：
  * 服务端：基于node的koa + sequelize等中间件，主要负责提供restful api接口
  * 后台：基于vue + vue-router + vuex + iview，用与餐厅的设置及其他设置
  * 网站，基于vue + vue-router + vuex + vux, 用于页面展示

  之后由我接手开发一些新功能，经过几个月的熟悉之后，我愈发觉得，这个网站做的太差劲了，首先，网站首屏加载速度慢。其次，界面丑陋，功能也不完善。最重要的是，我不能忍受乱七八糟的代码，方法逻辑混乱，变量命名奇怪，代码冗余、到处是复制粘贴的痕迹，基本没有可扩展性。
  因此我在工作之余开始着手重构网站。
  通过重构：
  1. 优化了代码，源代码的大小是原来的1/2
  2. 减少了网络请求次数，优化了首页加载
  3. 重新梳理了网站的逻辑，减少冗余、减少耦合，使扩展更灵活
  4. 提高自己对vue的理解，尤其是vue的计算属性和vue-router，用处真的很大

## 技术栈
  vue + vue-router + vuex，没有使用原来的vux

## 关于图片高清方案
  经过大量的查询资料，最终使用了一套成熟的解决方案，那就淘宝的flexible布局
原理就是通过获取手机的屏幕大小，动态的设置html的字体大小，然后使用rem单位来设置图片的大小。
  比如：在dpr=2的手机上,font-size: 75px设置图片大小为10rem，显示出来的就是750px，然后缩放一半，实际显示出来就是375px；
而在dpr=1的手机上,font-size: 37.5px, 图片显示出来就是375px，最终是一样的大小，但苹果的就是高清的图片(当然原图就是750px)

> 关于设备像素，css像素，dpr，viewport等概念参考了以下文章
> 移动端高清、多屏适配方案 http://div.io/topic/1092
> 移动端适配方案(上)(下) https://github.com/riskers/blog/issues/17
> ppk剖析viewport https://www.w3cplus.com/css/viewports.html
> 使用Flexible实现手淘H5页面的终端适配 https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html

## 引入flexible.js库
  为了自动把px单位转化为rem单位，引入postcss-px2rem，这样不用自己去计算px和rem的值，还按原来的方式去写。
  * 配置vue-loader.conf.js
    `postcss: [
      require('postcss-px2rem')({ remUnit: 75 }),
    ],`
    注：对于字体为了在不同dpr下大小一致可以使用 font-size: 24px /*px*/, 或者使用mixin,如：
    `
      font-dpr($font-size)
        font-size: $font-size; /*no*/
        [data-dpr="2"] &
          font-size: $font-size * 2;  /*no*/
        [data-dpr="3"] &
          font-size: $font-size * 3; /*no*/
      /*或者利用postcss-px2rem插件*/
      fontDpr($font-size)
        font-size: $font-size * 2 /*px*/
    `

## flex布局
  我在重构过程中多次使用flex，flex布局非常好用，适用于：需要自适应的地方；垂直居中
  > [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

## 关于垂直居中：
  千言万语都在张鑫旭大神的这几篇文章中：
  > [css行高line-height的一些深入理解及应用](http://www.zhangxinxu.com/wordpress/2009/11/css%E8%A1%8C%E9%AB%98line-height%E7%9A%84%E4%B8%80%E4%BA%9B%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%E5%8F%8A%E5%BA%94%E7%94%A8/)
  > [我对CSS vertical-align的一些理解与认识一](http://www.zhangxinxu.com/wordpress/2010/05/%E6%88%91%E5%AF%B9css-vertical-align%E7%9A%84%E4%B8%80%E4%BA%9B%E7%90%86%E8%A7%A3%E4%B8%8E%E8%AE%A4%E8%AF%86%EF%BC%88%E4%B8%80%EF%BC%89/)
  > [CSS vertical-align的深入理解(二)之text-top篇](http://www.zhangxinxu.com/wordpress/2010/06/css-vertical-align%E7%9A%84%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%EF%BC%88%E4%BA%8C%EF%BC%89%E4%B9%8Btext-top%E7%AF%87/)
  > [CSS深入理解vertical-align和line-height的基友关系](http://www.zhangxinxu.com/wordpress/2015/08/css-deep-understand-vertical-align-and-line-height/)

## 图片预占位黑魔法
  div
    padding-top: 134%
    width: 100%
    height: 0
    img
      positon: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%

## 引入的库

基础： vue + vue-router + vuex
alloyfinger： 腾讯的手势库
axios： Promise based HTTP client for the browser and node.js，用户异步请求数据
better-scroll： 是一款重点解决移动端各种滚动场景需求的插件
cookiejs：操作cookie
fastclick： 解决移动端click事件300ms延迟 https://www.jianshu.com/p/16d3e4f9b2a9
qs： 用于序列化url参数
