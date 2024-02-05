import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
export const request = axios.create({
  baseURL: '/api'
})

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    response = response.data
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (axios.isCancel(error)) {
      ElMessage.error('请求超时')
    } else {
      console.error('error', error)
      if (error.response.data && error.response.data.message) {
        ElMessage.error(error.response.data.message)
      } else {
        ElMessage.error('接口请求异常，请检查网络或服务器是否异常')
      }
    }
    return Promise.reject(error)
  }
)
