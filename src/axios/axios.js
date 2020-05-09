
import axios from 'axios'

const instance = axios.create({
  baseURL: "/api",
  timeout: 1000 * 12, // 创建axios实例,设定超时时间是12s
  withCredentials: false, // 允许携带cookie


})
export default instance