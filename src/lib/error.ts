/** 应用程序错误 - 错误体 */
interface AppErrorBody {
  /** 错误信息 */
  message: string
  /** http状态码 */
  statusCode: number
  /** 业务码 */
  businessCode?: string
}

/** 应用程序错误 */
class AppError extends Error {
  private _message: string
  private _statusCode: number
  private _businessCode: string

  constructor(body: AppErrorBody) {
    super()
    this._message = body.message || '未知错误信息'
    this._statusCode = body.statusCode || 500
    this._businessCode = body.businessCode || ''
  }

  /** 错误信息 */
  get message() {
    return this._message
  }

  /** http状态码 */
  get statusCode() {
    return this._statusCode
  }

  /** 业务码 */
  get businessCode() {
    return this._businessCode
  }
}

export default AppError
