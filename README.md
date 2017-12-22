# ysj-refactoring
# ysj公众号网页项目代码重构


1. 引入flexible.js库
2. 引入postcss-px2rem, 配置vue-loader.conf.js
    `postcss: [
      require('postcss-px2rem')({ remUnit: 75 }),
    ],`
3.