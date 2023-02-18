import { Request, Response } from 'express'

/** 公共路由 */
const __publicRoutes: App.Route[] = [
  //  获取软件版本
  {
    path: '/VERSION',
    method: 'GET',
    middlewares: [(req: Request, res: Response) => res.status(200).send(`v0.0.1(dev)`)]
  }
]

export default __publicRoutes
