import axios from 'axios'
import { Message, Loading } from 'element-ui';
import router from '../path/routes'

let loading        //定义loading变量

function startLoading() {    //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
function endLoading() {    //使用Element loading-close 方法
  loading.close()
}
// 请求拦截  设置统一header

axios.interceptors.request.use(config => {
  // 加载
  startLoading()
  if (localStorage.token) {
    config.baseURL = '/api'
    config.timeout = 10000
    config.headers.Authorization = localStorage.token
    config.headers['content-type'] = 'application/json';
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截  1006 token过期处理
axios.interceptors.response.use(response => {
  console.log(response)
  endLoading()
  return response
}, error => {
  console.log(error)
  // 错误提醒
  endLoading()
  Message.error(error.response.data)

  const { status } = error.response
  if (status == 401) {
    Message.error('token值无效，请重新登录')
    // 清除token
    localStorage.removeItem('token')

    // 页面跳转
    router.push('/login')
  }

  return Promise.reject(error)
})
export default axios
