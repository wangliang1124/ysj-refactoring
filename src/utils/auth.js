import qs from 'qs'
import store from '../vuex/index'
import api from './api'

const signIn = async (to, code) => {
  if (code) {
    const res = await api.post('/user/signin', {
      code,
    })
    console.log('=======login=========')
    store.dispatch('setUser', res.data)
  }
}
const oAuth = () => {
  const path = 'https://open.weixin.qq.com/connect/oauth2/authorize'
  const query = {
    appid: 'wxfc34b0cedd6ce73f',
    redirect_uri: window.location.href,
    response_type: 'code',
    scope: 'snsapi_userinfo',
    state: Date.now(),
  }
  const hash = '#wechat_redirect'
  const url = `${path}?${qs.stringify(query)}${hash}`
  window.location.replace(url)
  console.log('=======auth=========')
}

export { signIn, oAuth }

