import express from 'express'
import { routeValidator } from '@/loaders/router/validator'
import { routesMap } from '@/loaders/router'

/**
 * 路由注册器。
 * @param router Express路由对象
 * @param routes 注册到路由对象的路由
 * @param defaultPermission 该路由对象上路由的默认permission值。
 */
function registerRouter(router: express.Router, routes: App.Route[], defaultPermission = 'admin') {
  for (const route of routes) {
    //  路由重复校验
    const key = `${route.method}:${route.path}`
    if (routesMap.has(key)) console.error(`重复的路由${key}`)
    routesMap.set(key, route) // 处理请求时可以根据path一次找到对应的route

    if (!route.permission) route.permission = defaultPermission // 提供默认权限

    //  路由添加前置中间件
    const middlewares: unknown[] = []
    middlewares.push(routeValidator) // 校验路由权限

    // 路由自定义中间件
    if (route.middlewares) Array.prototype.push.apply(middlewares, route.middlewares)
    middlewares.unshift(route.path)

    //  注册路由
    try {
      switch (route.method.toUpperCase()) {
        case 'GET':
          // eslint-disable-next-line prefer-spread
          router.get.apply(router, middlewares)
          // router.get(middlewares)
          break
        case 'POST':
          // eslint-disable-next-line prefer-spread
          router.post.apply(router, middlewares)
          break
        case 'PUT':
          // eslint-disable-next-line prefer-spread
          router.put.apply(router, middlewares)
          break
        case 'DELETE':
          // eslint-disable-next-line prefer-spread
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

export default registerRouter
