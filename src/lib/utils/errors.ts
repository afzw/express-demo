/**
 * @fileoverview 自定义错误
 */

/**
 * 客户端调用错误
 * @param {string} message - 返回给客户端的信息，默认为 Internal Server Error
 * @param {number} statusCode - HTTP错误码，默认为500
 * @param {bool} dontLogging - 不记录系统日志，默认为false
 */
function clientError(message: string, statusCode: number, dontLogging: any) {
  const error: any = new Error(message)
  error.name = 'clientError'
  error.code = statusCode || 500
  error.isAppError = true
  error.dontLogging = dontLogging
  return error
}

/**
 * 数据库查询错误
 * @param {object} err - 已发生的mongodb错误
 */
function mongoError(err: any) {
  err.stack = new Error().stack
  return err
}

// @ts-ignore
global.clientError = global.ClientError = clientError

// @ts-ignore
global.mongoError = global.MongoError = mongoError
