import config from '@/_config/config'
import { Request, Response } from 'express'
import path from 'path'

/** 其他路由 */
const __otherRoutes: App.Route[] = [
  /** 捕获所有其他路径 */
  {
    path: '/*',
    method: 'GET',
    middlewares: [
      (req: Request, res: Response) => {
        res.redirect(path.join(config.publicDir, 'index.html'))
      }
    ]
  }
]

export default __otherRoutes
