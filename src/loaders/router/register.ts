import { AppError } from '@/lib/error'
import express, { Request, Response, NextFunction } from 'express'
import { judgeRoleHasPerm, SysPerm } from '../rbac'

const routesMap = new Map<string, App.Route>()

/**
 * 单路由校验器
 */
function routeValidator(req: Request, res: Response, next: NextFunction) {
  // 路由存在性校验
  const key = `${req.route.stack[0].method.toUpperCase()}:${req.route.path}`
  const route = routesMap.get(key)
  if (!route) return res.status(500).send({ error: 'route not found: ' + req.route.path })

  res.locals.route = route
  //  路由权限校验
  const perm = route.permission
  if (perm === SysPerm.PUBLIC) {
    // 公开路由 - 直接放行
    return next()
  } else if (perm === SysPerm.OPEN) {
    // 需要授权的路由
    // todo - jwt verify
    return next()
  } else {
    // 需要认证的路由
    // 如果没有req.user，就说明没有从cookie-session机制中验证出用户信息
    if (!req.user)
      return next(new AppError({ statusCode: 403, businessCode: '40300', message: '未通过身份认证，尚未登录' }))
    else if (!judgeRoleHasPerm(req.user.role, perm)) {
      return next(new AppError({ statusCode: 403, businessCode: '40301', message: '没有权限' }))
    }

    return next()
  }
}

/**
 * 路由注册
 * @description 解构路由信息, 注册到express路由器中
 * @param {express.Router} router - express router
 * @param {App.Route[]} routes - 路由信息
 * @param {string} defaultPermission - 路由默认权限
 */
function registerRoutes(router: express.Router, routes: App.Route[], defaultPermission: string) {
  for (const route of routes) {
    //  路由校验
    const key = `${route.method}:${route.path}`
    if (routesMap.has(key)) console.error(`重复的路由${key}`)
    routesMap.set(key, route) // 处理请求时可以根据path一次找到对应的route

    if (!route.permission) route.permission = defaultPermission // 提供默认权限

    //  路由添加前置中间件
    const middlewares: unknown[] = []
    middlewares.push(route.path)
    middlewares.push(routeValidator) // 校验路由权限
    if (route.middlewares) Array.prototype.push.apply(middlewares, route.middlewares) // 业务中间件

    //  注册路由
    try {
      switch (route.method.toUpperCase()) {
        case 'GET':
          // eslint-disable-next-line prefer-spread
          router.get.apply(router, middlewares)
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

export { registerRoutes }
