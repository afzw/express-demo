import path from 'path'
import dayjs from 'dayjs'
import { Request, Response, NextFunction } from 'express'
import { appendFile } from 'fs/promises'
import { config } from '@/_config/config'
import { AppError } from '@/lib/error'

/** 错误日志路径 */
const ERRORLOGFILEPATH = path.join(config.logDir, `error-${dayjs().format('YYYYMMDD')}.txt`)

/**
 * 错误处理器
 * @param error 原始错误（express类型限制，无法强制，error请尽量返回程序定义好的错误类型）
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
function errorHandler(err: Partial<App.Error>, req: Request, res: Response<FailedResponseInfo>, next: NextFunction) {
  const error = new AppError(err)
  const { name, statusCode, businessCode, message, stack } = error

  // 可读的错误信息
  const errorInfo = `【${dayjs().format('YYYY-MM-DDTHH:mm:ss')}】应用程序出现错误:
  错误名: ${name}
  http状态码: ${statusCode}
  业务码: ${businessCode}
  错误信息: ${message}
  错误栈: ${stack}\n
  `
  console.error(errorInfo)
  appendFile(ERRORLOGFILEPATH, errorInfo).catch(writeErr => console.log(`错误日志写入文件失败 => ${writeErr}`))

  const responseInfo = { message, businessCode }

  return res.status(statusCode).send(responseInfo)
}

export default errorHandler
