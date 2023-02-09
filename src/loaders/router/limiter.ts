import _ from 'lodash'
import { Request, Response, NextFunction } from 'express'

/**
 * 接口限频器
 * @description 限制API调用频率
 */
export function frequencyLimiter(route: App.Route) {
  if (!route.threshold) route.threshold = { total: 20, expire: 60 * 1000 } // 默认一分钟最多允许调用20次

  if (!_.isFunction(route.threshold.lookup)) route.threshold.lookup = (req: any) => [req.path, req.user?._id || req.ip]

  if (route.threshold.disable) {
    route.threshold.onRateLimited = function (req: Request, res: Response, next: NextFunction) {
      next()
    }
  } else {
    route.threshold.onRateLimited = function (req: Request, res: Response, next: NextFunction) {
      res.status(429).send({ error: '您的操作过于频繁，请稍后再试！' })
    }
  }

  return route.threshold
}
