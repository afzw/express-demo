import _ from 'lodash'
import config from '@config/config'
import AppError from '@/lib/error'
import { Request, Response, NextFunction } from 'express'
import { appendFile } from 'fs/promises'
import moment from 'moment'
import path from 'path'
import { ValidationError } from 'express-validation'

/** 错误日志路径 */
const ERRORLOGFILEPATH = path.join(config.logDir, `error-${moment().format('YYYYMMDD')}.txt`)

/**
 * 错误处理器
 * @param error 原始错误（express类型限制，无法强制，error请尽量返回程序定义好的错误类型）
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
function errorHandler(error: any, req: Request, res: Response, next: NextFunction): Response {
  const formatedError = getFormatError(error)

  // 格式化的错误
  const errInfo = `【${new Date()}】应用程序出现错误:
  错误名: ${formatedError.name}
  http状态码: ${formatedError.statusCode}
  业务码: ${formatedError.businessCode || '未知'}
  错误信息: ${formatedError.message}
  错误栈: ${formatedError.stack}\n
  `

  console.error(error)

  appendFile(ERRORLOGFILEPATH, errInfo).catch(writeErr => console.log(`错误日志写入文件失败 => ${writeErr}`))

  return res.status(error.statusCode).send({ message: error.message, businessCode: error.businessCode })

  /**
   * 获取格式化后的错误
   * @param error 原始错误
   * @return 格式化后的错误
   */
  function getFormatError(error: any): FormatError {
    let formatedError: FormatError

    if (error instanceof ValidationError) {
      // 参数校验错误
      formatedError = _.pick(error, 'name', 'statusCode', 'message', 'stack')
    } else if (error instanceof AppError) {
      // 应用程序错误
      formatedError = _.pick(error, 'name', 'statusCode', 'message', 'stack')
    } else {
      // 未知错误
      ;(formatedError.name = error.name || 'unknown error'),
        (formatedError.statusCode = error.statusCode || 500),
        (formatedError.message = error.message || 'unknown error')
    }

    return formatedError
  }
}

export default errorHandler
