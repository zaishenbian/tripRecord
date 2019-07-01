import axios from 'axios'
import { Toast } from 'mand-mobile'

// 设置请求baseUrl
const baseURL = {
  'dev': '/tripRecordApi',
  'prd': '/tripRecordApi'
}[process.env.NODE_ENV]
const timeout = 10000
const instance = axios.create({
  baseURL: baseURL,
  timeout: timeout,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded;application/json'
  }
})

// 请求拦截器
instance.interceptors.request.use(config => {
  return config
}, error => {
  Toast('请求过程出错')
  console.log(error.message)
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
  if (response.data.status && response.data.status !== 'success') {
    Toast(response.data.message)
    throw new Error(response.data.message)
  } else if (!response.data.status) {
    return response.data
  } else {
    return response.data.data
  }
}, error => {
  Toast('响应过程出错')
  console.log(error.message)
  return Promise.reject(error)
})

// 封装request请求
const request = (options) => {
  return instance.request({
    url: options.url,
    method: options.method,
    data: options.data,
    params: options.params
  })
}

const methods = ['get', 'post', 'put', 'delete']
const http = {}
methods.forEach(method => {
  http[method] = (url, params = {}) => {
    if (method === 'get') {
      return request({ url: url, params: params, method })
    } else {
      return request({ url: url, data: JSON.stringify(params), method })
    }
  }
})

export default function plugin (Vue) {
  if (plugin.installed) return
  plugin.installed = true
  Object.defineProperties(Vue.prototype, {
    $http: {
      get () {
        const obj = { ...http }
        return obj
      }
    }
  })
}
