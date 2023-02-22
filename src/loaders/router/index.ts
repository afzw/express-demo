import express from 'express'
import __publicRoutes from '@/loaders/router/public.route'
import __moduleRoutes from '@/loaders/router/module.route'
import __otherRoutes from '@/loaders/router/other.route'
import registerRouter from '@/loaders/router/register'

//  路由字典
export const routesMap = new Map()

/**
 * 【初始化】加载express路由器。
 */
function loadExpressRouters(app: express.Application) {
  //  监听公开路由
  const publicRouter = express.Router()
  registerRouter(publicRouter, __publicRoutes, 'public')
  app.use('/', publicRouter)

  //  监听业务路由
  const moduleRouter = express.Router()
  registerRouter(moduleRouter, __moduleRoutes, 'admin')
  app.use('/', moduleRouter)

  //  监听捕获其他路由
  const otherRouter = express.Router()
  registerRouter(otherRouter, __otherRoutes, 'public')
  app.use('/', otherRouter)
}

export default loadExpressRouters
