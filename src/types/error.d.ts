/** 应用程序错误 */
declare interface FormatError extends Error {
  /** http状态码 */
  statusCode: number
  /** 业务码 */
  businessCode?: string
}
