import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import callAsync from '@/lib/utils/callAsync'

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
