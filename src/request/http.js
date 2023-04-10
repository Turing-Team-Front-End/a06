import axios from "axios"
import { message } from "antd"

function myAxios(axiosConfig) {
  const service = axios.create({
    baseURL: "/api", // 设置统一的请求前缀
    timeout: 300000 // 设置统一的超时时长
  })

  // 添加请求拦截器
  service.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // 添加响应拦截器
  service.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (
        error.code === "ECONNABORTED" &&
        error.message.indexOf("timeout") !== -1
      ) {
        message.error("请求超时！")
      }
      return Promise.reject(error)
    }
  )

  return service(axiosConfig)
}

export function myAxios2(axiosConfig) {
  const service = axios.create({
    baseURL: "/api", // 设置统一的请求前缀
    timeout: 300000, // 设置统一的超时时长
    headers: {
      token: window.sessionStorage.getItem("token")
    }
  })

  // 添加请求拦截器
  service.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // 添加响应拦截器
  service.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (
        error.code === "ECONNABORTED" &&
        error.message.indexOf("timeout") !== -1
      ) {
        message.error("请求超时！")
      }
      return Promise.reject(error)
    }
  )

  return service(axiosConfig)
}
export default myAxios
