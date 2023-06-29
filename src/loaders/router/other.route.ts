import { Request, Response } from 'express'

/** 其他路由 */
const __otherRoutes: App.Route[] = [
  /** 访问服务器 */
  {
    path: '/',
    method: 'GET',
    middlewares: [
      (req: Request, res: Response) => {
        res.status(200).send(`欢迎访问!`)
      }
    ]
  },
  /** 服务器中不存在的地址 */
  {
    path: '/*',
    method: 'GET',
    middlewares: [
      (req: Request, res: Response) => {
        res.status(404).send(`欢迎访问，但您请求的地址不存在>:`)
      }
    ]
  }
]

export default __otherRoutes
