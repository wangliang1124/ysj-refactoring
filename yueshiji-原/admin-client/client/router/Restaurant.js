export default [{
  name: '新增入住商户',
  path: '/restaurant/add',
  component: require('../views/restatrant/RestaurantAdd.vue')
}, {
  name: '编辑商户信息',
  path: '/restaurant/edit/:id',
  component: require('../views/restatrant/RestaurantEdit.vue')
}, {
  name: '查看商户详细信息',
  path: '/restaurant/detail/:id',
  component: require('../views/restatrant/RestaurantDetail.vue')
}]
