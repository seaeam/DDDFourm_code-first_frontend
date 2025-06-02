import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',
  timeout: 6000,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  (config) => {
    // 这儿可以请求 token，现在不需要
    // 开发环境下也可以打印请求信息

    return config
  },
  (error) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    // 开发环境下也可以打印响应信息
    return response
  },
  (error) => {
    // 统一错误处理
    if (error.response) {
      const { status, data } = error.response

      switch (status) {
        case 401:
          // 未授权，清除 token 并跳转到登录页
          localStorage.removeItem('token')
          window.location.href = '/login'
          break
        case 403:
          console.error('❌ 403: 没有权限访问')
          break
        case 404:
          console.error('❌ 404: 请求的资源不存在')
          break
        case 500:
          console.error('❌ 500: 服务器内部错误')
          break
        default:
          console.error(`❌ ${status}: ${data.message || '请求失败'}`)
      }
    }
    else if (error.request) {
      console.error('❌ 网络错误，请检查网络连接')
    }
    else {
      console.error('❌ 请求配置错误:', error.message)
    }

    return Promise.reject(error)
  },
)

export default instance
