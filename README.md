# ysj-refactoring
# ysj公众号网页项目代码重构 
历时：2017.12.20--2018.1.18 

1. 引入flexible.js库
2. 引入postcss-px2rem,  用于自动把px单位转化为rem单位
  配置vue-loader.conf.js
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
3.关于垂直居中：
	+ 父元素的line-height是由子元素的line-height决定的
	+ 如果子元素line-height大于父元素line-height,设置vertical-align: text-top时，将会"撑开"父元素
	+ 对于inlin-block元素,设置height的话，line-height不起作用
4.图片预占位黑魔法
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
