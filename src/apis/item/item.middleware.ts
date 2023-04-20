import callAsync from '@/lib/utils/callAsync'
import { Request, Response, NextFunction } from 'express'
import { ItemFilter } from '../../modules/item/item'
import itemDao from '@/business/item/item.dao'

/**
 * 验证params中的item是否存在。
 */
export async function validateItemInParams(req: Request, res: Response, next: NextFunction) {
  const itemId = req.params.itemId

  const filter: ItemFilter = { _id: itemId }

  const [err, item] = await callAsync(itemDao.findOne(filter))
  if (err) return res.status(500).send(`查询item失败 => ${err}`)

  if (!item) return res.status(400).send(`该item不存在！`)

  next()
}
