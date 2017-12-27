import qs from 'qs'
import cookie from 'cookiejs'
// import store from '../vuex/index'
import api from './api'

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

const signIn = async (code) => {
  try {
    console.log(typeof code)
    const res = await api.post('/user/signin', {
      code,
    })
    console.log('=======login=========')
    console.log(res)
    // store.dispatch('setUser', res.data)
    cookie('token', res.data.token, { expires: 30, path: '/' })
  } catch (err) {
    console.log(err.message)
    oAuth()
  }
}

export { signIn, oAuth }

