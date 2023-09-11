import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

/**
 * HTTP客户端
 * @description 基于Axios实现。
 */
class HttpClient {
  /**
   * 使用axios发送get请求。
   * @param url 请求地址
   * @param config 请求配置信息
   */
  public async get<V>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<V>> {
    return axios.get(url, config)
  }

  /**
   * 使用axios发送post请求。
   * @param url 请求地址
   * @param data 请求载荷
   * @param config 请求配置信息
   */
  public async post<D, V>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<V>> {
    return axios.post(url, data, config)
  }

  /**
   * 使用axios发送put请求。
   * @param url 请求地址
   * @param data 请求载荷
   * @param config 请求配置信息
   */
  public async put<D, V>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<V>> {
    return axios.put(url, data, config)
  }

  /**
   * 使用axios发送delete请求。
   * @param url 请求地址
   * @param config 请求配置信息
   */
  public async delete<V>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<V>> {
    return axios.delete(url, config)
  }
}

export { HttpClient }
