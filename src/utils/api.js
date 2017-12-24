import axios from 'axios'
// import qs from 'qs'

const api = axios.create({
  baseURL: 'http://ysj.tcfellow.com:3000/api/v1',
  timeout: 1000,
})

api.interceptors.request.use((cfg) => {
  // 在发送请求之前添加验证
  const config = cfg
  // config.headers.authorization = 'tests'
  console.log(config)
  return config
}, (error) => {
  // 请求错误时...
  console.log('=============发送api请求错误================')
  return Promise.reject(error)
})
api.interceptors.response.use(
  response => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('=============授权错误！================')
    }
  },
)
export default api
