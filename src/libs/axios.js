import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import {getToken, getYhxtm} from "./util";
// import { Spin } from 'iview'
axios.defaults.headers = {
  "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
}
axios.defaults.transformRequest = [function (data) {
  var newData = "";
  for (let k in data) {
    if(data[k]){
      newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
    }
  }
  return newData.substring( 0 , newData.lastIndexOf('&'));
}]
const addErrorLog = errorInfo => {
  const { statusText, status, request: { responseURL } } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor (baseUrl = baseUrl) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {

        //
      },
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      config.headers['token'] = getToken()
      config.headers['yhxtm'] = getYhxtm()
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url);
      return  res.data
    }, error => {
      this.destroy(url)
      // addErrorLog(error.response)
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    if(options.method === 'get'){
      options['params'] = options['data']
      options['data'] = null;
    }
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
