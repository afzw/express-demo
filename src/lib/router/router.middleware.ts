import _ from "lodash"
import { Request, Response, NextFunction } from "express"
import { routesMap } from "./router.init";
import logger from "@/src/lib/utils/logger";

/**
 * 限制API调用频率
 * 需要限制时启用。
 */
export function validThreshold(route: App.Route) {
  if (!route.threshold)
    route.threshold = { total: 20, expire: 60 * 1000 } // 默认一分钟最多允许调用20次

  if (!_.isFunction(route.threshold.lookup))
    route.threshold.lookup = (req: any) => [req.path, req.user?._id || req.ip]

  if (route.threshold.disable) {
    route.threshold.onRateLimited = function (req: Request, res: Response, next: NextFunction) {
      next()
    }
  } else {
    route.threshold.onRateLimited = function (req: Request, res: Response, next: NextFunction) {
      res.status(429).send({ error: "您的操作过于频繁，请稍后再试！" })
    }
  }

  return route.threshold
}

/**
 * 检查路由权限
 */
export function checkRoutePermission(req: Request & App.reqAddition, res: Response, next: NextFunction) {
  const key = `${req.route.stack[0].method.toUpperCase()}:${req.route.path}`
  const route = routesMap.get(key)
  if (!route) return res.status(500).send({ error: 'route not found: ' + req.route.path })

  //  检查用户是否被禁用或删除
  if (route.permission !== 'public')
    if (req.user?.disabled || req.user?.deleted)
      return res.status(403).send({ error: '账号非法！' })

  //  检查访问权限
  let hasPermission = false
  if (route.permission instanceof Array) {
    for (const perm of route.permission) {
      if (req.hasPermission(perm)) {
        hasPermission = true
        break
      }
    }
  } else {
    hasPermission = req.hasPermission(route.permission)
  }

  //  接口权限校验失败
  if (!hasPermission) {
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