/** 应用程序错误 */
declare interface AppError extends Error {
  /** http状态码 */
  httpCode: number
  /** 业务码 */
  serviceCode: string
}
