/**
 * 其他路由
 */

import path from 'path'
import { Request, Response } from 'express'

const otherRoutes: App.Route[] = [
  //  捕获所有未匹配的路由
  {
    path: '/*',
    method: 'GET',
    middlewares: [
      (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, '../..', 'public', 'index.html'))
      }
    ]
  }
]

export default otherRoutes
