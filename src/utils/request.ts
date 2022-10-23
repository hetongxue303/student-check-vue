import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useRouter } from 'vue-router'
import NProgress from '../plugins/nProgress'
import { ElNotification } from 'element-plus'
import { getToken } from './auth'

axios.create({
  baseURL: import.meta.env.VITE_GLOB_BASE_URL,
  timeout: 60 * 1000,
  withCredentials: true,
  timeoutErrorMessage: '请求超时',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

axios.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    NProgress.start()
    // 让每个请求携带自定义token
    if (getToken() && config.headers) {
      config.headers.Authorization = getToken()
    }
    return config
  },
  (error: any) => {
    ElNotification.error('未知错误')
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (response.status !== 200 || response.data.code !== 200) {
      switch (response.status as number) {
        case 401:
          ElNotification.warning('您未登录，请先登录')
          const router = useRouter()
          await router.replace('/login')
          break
        case 403:
          ElNotification.warning('您无权访问，请联系管理员')
          break
        // 50008:非法令牌    50012:其他客户端登录    50014:令牌过期
        case 50008 | 50012 | 50014:
          ElNotification.warning('您的登录信息已失效，请您再次登录')
          break
      }
    }
    NProgress.done()
    return response
  },
  (error: any) => {
    ElNotification.error('服务器异常')
    return Promise.reject(error)
  }
)

export default axios
