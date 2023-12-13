import express from 'express'

import { registerRoutes } from '@/loaders/router/register'
import errorHandler from '../errorHandler'

import { __adminRoutes } from '@/loaders/router/routes/admin.route'
import { __userRoutes } from '@/loaders/router/routes/user.route'
import { __publicRoutes } from '@/loaders/router/routes/public.route'
import { __openRoutes } from '@/loaders/router/routes/open.route'

/**
 * 加载路由。
 */
function loadRouters(app: express.Express) {
  const adminRouter = express.Router()
  registerRoutes(adminRouter, __adminRoutes, 'admin')
  app.use('/', adminRouter)

  const userRouter = express.Router()
  registerRoutes(userRouter, __userRoutes, 'user')
  app.use('/', userRouter)

  const openRouter = express.Router()
  registerRoutes(openRouter, __openRoutes, 'open')
  app.use('/', openRouter)

  const publicRouter = express.Router()
  registerRoutes(publicRouter, __publicRoutes, 'public')
  app.use('/', publicRouter)

  // 添加错误处理器
  app.use(errorHandler)
}

export default loadRouters
