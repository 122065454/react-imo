import axios from 'axios'
import { jwtHandle } from './jwt'
import { defaultAddress } from '@/assets/utils/comStatic'

const TIME_OUT = 30000 // 超时时间30秒
// 返回数据拦截处理
axios.interceptors.response.use(response => {
  return response.data
}, error => Promise.reject(error.response))

// 封装请求方法
const $_request = (method, url, data) => {
  const configData = {
    withCredentials: false, // 跨域带cookie
    url, // 请求的地址
    timeout: TIME_OUT, // 超时时间, 单位毫秒
    headers: { }
  }
  if (method === 'get') {
    configData.method = 'get'
    configData.params = Object.assign({'user_addr': defaultAddress}, data)
    configData.headers = { 'authorization': jwtHandle({ ...data })}
  }
  return axios(configData)
}

class Ajax {
  get = (url, data = {}, headers = {}) => {
    return $_request('get', url, data, headers)
  }
}

export default new Ajax()
