import axios from 'axios'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// ----- 请求拦截器 -----
service.interceptors.request.use(
  (config) => {
    // 从 localStorage 获取 token 并注入请求头
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// ----- 响应拦截器 -----
service.interceptors.response.use(
  (response) => {
    const res = response.data
    // 如果后端返回业务状态码非 0（约定 0 为成功），按错误处理
    if (res.code !== undefined && res.code !== 0) {
      console.error(`业务错误 [${res.code}]: ${res.message || '未知错误'}`)
      return Promise.reject(new Error(res.message || '请求失败'))
    }
    return res
  },
  (error) => {
    if (error.response) {
      const { status } = error.response
      const statusMessages = {
        400: '请求参数错误',
        401: '登录已过期，请重新登录',
        403: '没有访问权限',
        404: '请求的资源不存在',
        500: '服务器内部错误'
      }
      console.error(`HTTP ${status}: ${statusMessages[status] || '网络错误'}`)
    } else if (error.code === 'ECONNABORTED') {
      console.error('请求超时，请检查网络连接')
    } else {
      console.error('网络异常，请检查网络连接')
    }
    return Promise.reject(error)
  }
)

export default service
