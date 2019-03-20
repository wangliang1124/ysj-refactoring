export default [{
  name: '新增特色菜',
  path: '/specialty/add/:id',
  component: require('../views/specialty/SpecialtyAdd.vue')
}, {
  name: '编辑特色菜',
  path: '/specialty/edit/:id',
  component: require('../views/specialty/SpecialtyEdit.vue')
}]
