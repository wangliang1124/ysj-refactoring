import axios from 'axios'
// import cookie from 'cookiejs'
// import qs from 'qs';
import store from '../vuex/index'

const api = axios.create({
  baseURL: 'http://ysj.tcfellow.com:3000/api/v1',
  timeout: 1000,
})

api.interceptors.request.use(
  (config) => {
    // 在发送请求之前添加验证
    // const config = cfg
    // eslint-disable-next-line
    config.headers.authorization = store.getters.token.id
    return config
  },
  (error) => {
    // 请求错误时...
    console.log('=============发送api请求错误================')
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  response => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('=============没有授权！================')
      // auth()
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  },
)
export default api
