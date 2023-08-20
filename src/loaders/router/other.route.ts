import { Request, Response } from 'express'

/** 其他路由 */
const __otherRoutes: App.Route[] = [
  /** 捕获所有其他路径 */
  {
    path: '/*',
    method: 'GET',
    middlewares: [
      (req: Request, res: Response) => {
        res.send('<p>欢迎访问</p>')
      }
    ]
  }
]

export default __otherRoutes
