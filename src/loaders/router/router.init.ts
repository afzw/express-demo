import express from 'express'
import { checkRoutePermission } from './router.middleware'
import publicRoutes from '@/loaders/router/public.route'    //  公开路由
import moduleRoutes from '@/loaders/router/module.route'    //  业务路由
import otherRoutes from '@/loaders/router/other.route'      //  其他路由

//  路由字典
export const routesMap = new Map()

/**
 * 初始化路由器。
 */
export function initRouters(app: express.Express) {
  //  监听公开路由
  const publicRouter = express.Router()
  applyRouters(publicRouter, publicRoutes, 'public')
  app.use("/", publicRouter)

  //  监听业务路由
  const moduleRouter = express.Router()
  applyRouters(moduleRouter, moduleRoutes, 'admin')
  app.use("/", moduleRouter)

  //  监听捕获其他路由
  const otherRouter = express.Router()
  applyRouters(otherRouter, otherRoutes, 'public')
  app.use("/", otherRouter)
}

/**
 * 路由器注册路由。
 * @param router Express路由对象
 * @param routes 注册到路由对象的路由
 * @param defaultPermission 该路由对象上路由的默认permission值。
 */
function applyRouters(router: express.Router, routes: App.Route[], defaultPermission = 'admin') {
  for (const route of routes) {
    //  路由重复校验
    const key = `${route.method}:${route.path}`
    if (routesMap.has(key)) console.error(`重复的路由${key}`)
    routesMap.set(key, route) // 处理请求时可以根据path一次找到对应的route

    if (!route.permission) route.permission = defaultPermission // 提供默认权限

    //  路由添加前置中间件
    const middlewares: any[] = []
    middlewares.push(checkRoutePermission)  // 校验路由权限

    // 路由自定义中间件
    if (route.middlewares) Array.prototype.push.apply(middlewares, route.middlewares)
    middlewares.unshift(route.path)

    //  注册路由
    try {
      switch (route.method.toUpperCase()) {
        case 'GET':
          router.get.apply(router, middlewares)
        case 'POST':
          router.post.apply(router, middlewares)
          break
        case 'PUT':
          router.put.apply(router, middlewares)
          break
        case 'DELETE':
          router.delete.apply(router, middlewares)
          break
        default:
          throw new Error('不合法的http请求方法' + route.path)
      }
    } catch (error) {
      console.log(route, error)
    }
  }
}