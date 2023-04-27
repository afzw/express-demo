/** 应用程序错误 - 错误体 */
interface AppErrorBody {
  /** 错误信息 */
  message: string
  /** http状态码 */
  httpCode?: number
  /** 业务码 */
  serviceCode?: string
}

/** 应用程序错误 */
class AppError extends Error {
  private _message: string
  private _httpCode: number
  private _serviceCode: string

  constructor(body: AppErrorBody) {
    super()
    this._message = body.message || '未知错误信息'
    this._httpCode = body.httpCode || 500
    this._serviceCode = body.serviceCode || '00000'
  }

  /** 错误信息 */
  get message() {
    return this._message
  }

  /** http状态码 */
  get httpCode() {
    return this._httpCode
  }

  /** 业务码 */
  get serviceCode() {
    return this._serviceCode
  }
}

export default AppError
