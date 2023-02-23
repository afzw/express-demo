import { Request, Response } from 'express'
import path from 'path'

/** 其他路由 */
const __otherRoutes: App.Route[] = [
  /** 访问服务器 */
  {
    path: '/',
    method: 'GET',
    middlewares: [
      (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, '../../../', 'public', 'index.html'))
      }
    ]
  }
]

export default __otherRoutes
