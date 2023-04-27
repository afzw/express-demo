/** 应用程序错误 - 错误体 */
interface AppErrorBody {
  /** 错误码 */
  code: number
  /** 错误信息 */
  message: string
}

/** 业务错误 - 错误体 */
interface ServiceErrorBody extends AppErrorBody {
  /** 业务码 */
  serviceCode: number
}

/** 应用程序错误 */
class AppError extends Error {
  /** 错误代码 */
  public code: number

  constructor(body: AppErrorBody) {
    super()
    this.code = body.code
    this.message = body.message
  }
}

/** 业务错误 */
class ServiceError extends AppError {
  /** 业务码 */
  public serviceCode: number

  constructor(body: ServiceErrorBody) {
    super(body)
    this.code = 500
    this.serviceCode = body.serviceCode
  }
}

export { AppError, ServiceError }
