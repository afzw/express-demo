import config from '@/config/config'
import AppError from '@/lib/error'
import { Request, Response, NextFunction } from 'express'
import { appendFile } from 'fs/promises'
import moment from 'moment'
import path from 'path'

/** 错误日志路径 */
const ERRORLOGFILEPATH = path.join(config.logDir, `error-${moment().format('YYYYMMDD')}.txt`)

/** 错误处理器 */
// express类型限制，无法强制，err请尽量返回程序定义好的错误类型
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
function errorHandler(err: any, req: Request, res: Response, next: NextFunction): Response {
  // 未格式化的错误
  if (err instanceof AppError !== true) {
    console.error(err)

    appendFile(ERRORLOGFILEPATH, `未格式化的错误[${new Date()}]${err}\n`).catch(err =>
      console.log(`错误日志写入文件失败 => ${err}`)
    )

    return res.status(500).send(`未格式化的错误 => ${err}`)
  }

  // 格式化的错误
  const errInfo = `[${new Date()}]应用程序出现错误:
  http错误码: ${err.httpCode}
  业务码: ${err.serviceCode}
  错误信息: ${err.message}
  错误栈: ${err.stack}\n
  `

  // 格式化的错误
  console.error(errInfo)

  appendFile(ERRORLOGFILEPATH, errInfo).catch(err => console.log(`错误日志写入文件失败 => ${err}`))

  return res.status(err.httpCode).send({ message: err.message, serviceCode: err.serviceCode })
}

export default errorHandler
