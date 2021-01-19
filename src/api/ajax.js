/**
 * 对axio进行2次封装一个能发ajax请求的函数
 * 1. 统一处理请求异常
 * 2. 异步请求成功的数据不是response, 而是response.data
 * 3. 对请求体参数进行urlencode处理, 而不使用默认的json方式(后台接口不支持)
 * 4. 配置请求超时的时间
 * 5. 通过请求头携带token数据
 */

import axios from 'axios'
import qs from 'qs'
import { Indicator, Toast, MessageBox } from 'mint-ui' // 按需引入mint-ui
import store from '@/vuex/store'
import router from '@/router'

const instance = axios.create({
  baseURL: '/api', // 让代理服务器请求4000
  timeout: 20000 // 4. 配置请求超时的时间
})

// 添加请求拦截器
instance.interceptors.request.use((config) => {
  // 显示请求loading
  Indicator.open('加载中...')

  // 3. 对请求体参数进行urlencode处理, 而不使用默认的json方式(后台接口不支持)
  const data = config.data
  if (data instanceof Object) {
    config.data = qs.stringify(data)
  }

  // 5. 通过请求头携带token数据
  const token = store.state.token
  //  有token就携带添加到请求头
  if (token) {
    config.headers.Authorization = token
  } else {
    // 如果当前接口需要token校验,但没有token, 不发请求,进入错误流程
    const needCheck = config.headers.needCheck
    // 如果没有token,但又需要token校验,不能发请求
    if (needCheck) {
      throw new Error('没有登录, 不能请求!')
    }
  }
  return config
})

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    // 隐藏请求loading
    Indicator.close()

    // 2. 异步请求成功的数据不是response, 而是response.data
    return response.data
  },
  error => {
    // 隐藏请求loading
    Indicator.close()

    const responce = error.responce
    // 没发请求的错误
    if (!responce) {
      const path = router.currentRoute.path
      if (path !== '/login') {
        // router.replace('/login')
        Toast(error.message)
      }
    } else { // 发了请求的错误
      //  如果响应状态码是404,且当前没在登录界面,退出登录(清除数据) 跳转到登录页面
      if (error.responce.status === 401) {
        const path = router.currentRoute.path
        if (path !== '/login') {
          store.dispatch('logout')
          router.replace('/login')
          Toast(error.responce.data.message || '登录失效, 请重新登录')
        }
      } else if (error.responce.status === 404) { // status为: 404: 提示访问的资源不存在
        MessageBox('提示', '访问的资源不存在')
      } else {
        // 1. 统一处理请求异常
        // alert(`请求出错${error.message}`)
        MessageBox('提示', '请求出错:' + error.message)
      }
    }

    return new Promise(() => {
      // 返回一个pending状态的promise=> 中断promie链
    })
  }
)

export default instance
