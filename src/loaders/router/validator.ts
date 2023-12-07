import { Request, Response, NextFunction } from 'express'
import { routesMap } from '.'
import { logger } from '@/lib/logger'

/**
 * 路由校验器
 */
export function routeValidator(req: Request, res: Response, next: NextFunction) {
  // 校验路由存在性
  const key = `${req.route.stack[0].method.toUpperCase()}:${req.route.path}`
  const route = routesMap.get(key)
  if (!route) return res.status(500).send({ error: 'route not found: ' + req.route.path })

  //  校验路由权限
  if (route.permission !== 'public') if (req.user?.status !== 1) return res.status(403).send({ error: '账号非法！' })

  let pass = false
  if (route.permission instanceof Array) {
    for (const perm of route.permission) {
      if (req.hasPermission(perm)) {
        pass = true
        break
      }
    }
  } else {
    pass = req.hasPermission(route.permission)
  }

  if (!pass) {
    if (!req.user) {
      return res.status(403).send({ code: 'LoginRequired', error: '请您先登录！' })
    } else if (route.permission === 'anon') {
      return res.status(405).send({ code: 'LogoutRequired', error: '您已经登录啦！' })
    } else {
      if (route.permission !== 'anon' && route.permission !== 'user') {
        logger.warning(`未授权的API调用: ${req.method} ${req.path}。用户：${req.user?._id}`)
      }
    }
    return res.sendStatus(401)
  }

  res.locals.route = route
  return next()
}
