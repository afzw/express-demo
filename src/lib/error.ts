/** App.Error 生成器 */
class AppError extends Error {
  private _message: string
  private _statusCode: number
  private _businessCode: string

  constructor(info: Partial<App.Error>) {
    super()
    this._message = info.message || 'unknown error message'
    this._statusCode = info.statusCode || 500
    this._businessCode = info.businessCode || 'null'
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

export { AppError }
