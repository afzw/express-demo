import express from 'express'

import registerRouter from '@/loaders/router/register'
import errorHandler from '../errorHandler'

import __adminRoutes from '@/loaders/router/admin.route'
import __moduleRoutes from '@/loaders/router/module.route'
import __publicRoutes from '@/loaders/router/public.route'

//  路由字典
export const routesMap = new Map()

/**
 * 初始化路由器。
 */
function loadRouters(app: express.Express) {
  // 监听系统管理层级路由
  const adminRouter = express.Router()
  registerRouter(adminRouter, __adminRoutes, 'admin')

  //  监听业务路由
  const moduleRouter = express.Router()
  registerRouter(moduleRouter, __moduleRoutes, 'user')
  app.use('/', moduleRouter)

  //  监听公开路由
  const publicRouter = express.Router()
  registerRouter(publicRouter, __publicRoutes, 'public')
  app.use('/', publicRouter)

  // 添加错误处理器
  app.use(errorHandler)
}

export default loadRouters
