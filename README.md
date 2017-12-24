# ysj-refactoring
# ysj公众号网页项目代码重构


1. 引入flexible.js库
2. 引入postcss-px2rem, 配置vue-loader.conf.js
    `postcss: [
      require('postcss-px2rem')({ remUnit: 75 }),
    ],`
3.关于垂直居中：
	+ 父元素的line-height是由子元素的line-height决定的
	+ 如果子元素line-height大于父元素line-height,设置vertical-align: text-top时，将会"撑开"父元素
	+ 对于inlin-block元素,设置height的话，line-height不起作用
