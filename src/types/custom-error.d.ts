/** 自定义错误 */
declare namespace CustomError {
  /** 控制器层的错误 */
  interface ControllerError {
    /** http响应码 */
    code: number
    /** 错误标题 */
    title: string
    /** 错误主体 */
    err?: Error
  }

  /** 响应中的错误 */
  interface ResponseError {
    /** http响应码 */
    code: number
    /** 错误标题 */
    title: string
    /** 详情信息 */
    msg: string
  }
}
