import path from 'path'
import { Request, Response } from 'express'
import config from '@/_config/config'

/** 公共路由 */
const __publicRoutes: App.Route[] = [
  //  获取软件版本
  {
    path: '/VERSION',
    method: 'GET',
    middlewares: [
      (req: Request, res: Response) => {
        res.sendFile(path.join(config.publicDir, 'VERSION'))
      }
    ]
  },
  /** 捕获所有其他路径 */
  {
    path: '/*',
    method: 'GET',
    middlewares: [
      (req: Request, res: Response) => {
        res.sendFile(path.join(config.publicDir, 'index.html'))
      }
    ]
  }
]

export default __publicRoutes
