import _ from 'lodash'
import config from '@/_config/config'
import { Request, Response, NextFunction } from 'express'
import { appendFile } from 'fs/promises'
import path from 'path'
import dayjs from 'dayjs'

/** 错误日志路径 */
const ERRORLOGFILEPATH = path.join(config.logDir, `error-${dayjs().format('YYYYMMDD')}.txt`)

/**
 * 错误处理器
 * @param error 原始错误（express类型限制，无法强制，error请尽量返回程序定义好的错误类型）
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
function errorHandler(error: any, req: Request, res: Response, next: NextFunction): Response {
  /** 格式化的错误信息 */
  const formatedError: FormatError = getFormatError(error)

  // 格式化的错误
  const formatedErrorInfo = `【${dayjs().format('YYYY-MM-DDTHH:mm:ss')}】应用程序出现错误:
  错误名: ${formatedError.name}
  http状态码: ${formatedError.statusCode}
  业务码: ${formatedError.businessCode || 'null'}
  错误信息: ${formatedError.message}
  错误栈: ${formatedError.stack}\n
  `

  console.error(error)

  appendFile(ERRORLOGFILEPATH, formatedErrorInfo).catch(writeErr => console.log(`错误日志写入文件失败 => ${writeErr}`))

  return res
    .status(error.statusCode)
    .send({ name: formatedError.name, message: formatedError.message, businessCode: formatedError.businessCode })

  /**
   * 获取格式化后的错误
   * @param error 原始错误
   * @return 格式化后的错误
   */
  function getFormatError(error: any): FormatError {
    const formatedError: FormatError = {
      name: error.name || 'unknown error',
      statusCode: error.statusCode || 500,
      businessCode: error.businessCode || 'null',
      message: error.message || 'unknown error',
      stack: error.stack || null
    }

    return formatedError
  }
}

export default errorHandler
