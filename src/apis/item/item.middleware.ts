import callAsync from '@/lib/utils/callAsync'
import { Request, Response, NextFunction } from 'express'
import { ItemFilter } from '../../entities/item/item'
import itemDao from '@/dao/item.dao'
import AppError from '@/lib/error'

/**
 * 验证params中的item是否存在。
 */
export async function validateItemInParams(req: Request, res: Response, next: NextFunction) {
  const itemId = req.params.itemId

  const filter: ItemFilter = { _id: itemId }

  const [err, item] = await callAsync(itemDao.findOne(filter))
  if (err) return next(err)
  if (!item) return next(new AppError({ message: '没有找到item', httpCode: 404 }))

  next()
}
