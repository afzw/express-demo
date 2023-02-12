import callAsync from '@/lib/utils/callAsync'
import { Request, Response, NextFunction } from 'express'
import IItemCurdService from './curd.service'
import { ItemFilter } from './item'

/**
 * 验证params中的item是否存在。
 */
export async function validateItemInParams(req: Request, res: Response, next: NextFunction) {
  const itemId = req.params.itemId

  const filter: ItemFilter = { _id: itemId }

  const [errFind, searchResult] = await callAsync(ItemCurdService.searchItems(filter))
  if (errFind) return res.status(500).send(`查询item失败 => ${errFind}`)

  if (!searchResult.total) return res.status(400).send(`该item不存在！`)

  next()
}
