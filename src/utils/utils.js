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

const handleOldCode = (oldCode) => {
  if (oldCode && oldCode.startsWith('xxxxx') && oldCode.length <= 17) { // 把老二维码url查询参数中的code字符串替换为actCode
    const url = window.location.href.replace('code=xxxxx', 'actCode=')
    window.location.replace(url)
  }
}

export { signIn, oAuth, handleOldCode }
