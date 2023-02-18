import { NextFunction, Request, Response } from 'express'

/**
 * 一般性错误处理器
 * @param error 错误（控制器层的错误）
 */
export function commonErrorHandler(
  error: CustomError.ControllerError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const response: CustomError.ResponseError = {
    code: error.code || 500,
    title: error.title || '未知错误',
    msg: error.err ? `${error.err}` : '未知信息'
  }
  return res.status(error.code).json(response)
}
