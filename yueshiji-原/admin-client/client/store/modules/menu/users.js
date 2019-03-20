import lazyLoading from './lazyLoading'

export default {
  name: '用户列表',
  path: '/users',
  meta: {
    label: '用户管理',
    link: 'users/Users.vue',
    icon: 'fa-users'
  },
  component: lazyLoading('users/Users')
}
