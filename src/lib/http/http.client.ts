import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios'
import callAsync from '@/lib/utils/callAsync'

/**
 * 获取 axios 错误信息
 */
export function getAxiosError(error: AxiosError): string {
  if (error.response) {
    // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
    return `错误！ 状态码：${error.response.status} 数据：${error.response.data}`
  } else if (error.request) {
    // 请求已经成功发起，但没有收到响应
    // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
    // 而在 node.js 中是 http.ClientRequest 的实例
    return '服务器未响应！'
  } else {
    // 发送请求时出了点问题
    return error.message
  }
}

/**
 * 4500 ms 后自动取消
 */
export function getCancelToken(): CancelToken {
  const source = axios.CancelToken.source()
  setTimeout(() => {
    source.cancel()
  }, 4500)
  return source.token
}

/**
 * Axios HTTP客户端
 */
const Axios = {
  /**
   * 使用axios发送get请求。
   * @param url 请求地址
   * @param config 请求配置信息
   */
  async get<V>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<V>> {
    const [err, response] = await callAsync(axios.get(url, config))
    if (err) throw new Error(`使用axios发送get请求出现错误 => ${err}`)
    return response
  },

  /**
   * 使用axios发送post请求。
   * @param url 请求地址
   * @param data 请求载荷
   * @param config 请求配置信息
   */
  async post<D, V>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<V>> {
    const [err, response] = await callAsync(axios.post(url, data, config))
    if (err) throw new Error(`使用axios发送post请求出现错误 => ${err}`)
    return response
  },

  /**
   * 使用axios发送put请求。
   * @param url 请求地址
   * @param data 请求载荷
   * @param config 请求配置信息
   */
  async put<D, V>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<V>> {
    const [err, response] = await callAsync(axios.put(url, data, config))
    if (err) throw new Error(`使用axios发送put请求出现错误 => ${err}`)
    return response
  },

  /**
   * 使用axios发送delete请求。
   * @param url 请求地址
   * @param config 请求配置信息
   */
  async delete<V>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<V>> {
    const [err, response] = await callAsync(axios.delete(url, config))
    if (err) throw new Error(`使用axios发送delete请求出现错误 => ${err}`)
    return response
  }
}

export default Axios
