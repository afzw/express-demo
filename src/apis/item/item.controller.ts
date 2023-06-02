import callAsync from '@/lib/utils/callAsync'
import { NextFunction, Request, Response } from 'express'
import ItemService from '@/business/item/item.service'
import { ItemFilter } from '@/entities/item/item'
import { Paging } from '@/components/mongoose'

/** 新建item */
export async function create(req: Request, res: Response, next: NextFunction) {
  const createInfo: Ctx.Body = req.body

  const [errCreate, newItem] = await callAsync(ItemService.createItem(createInfo))
  if (errCreate) return next(errCreate)

  return res.json(newItem)
}

/** 查询items */
export async function search(req: Request, res: Response, next: NextFunction) {
  const { name, price, ownerId } = req.query
  const pagingOptions = new Paging(req.query)

  const filter: ItemFilter = {}
  if (name) filter.name = name
  if (price) filter.price = Number(price)
  if (ownerId) filter.ownerId = ownerId

  const [errSearch, result] = await callAsync(ItemService.searchItems(filter, null, pagingOptions))
  if (errSearch) return next(errSearch)

  return res.json(result)
}

/** 更新某个item */
export async function update(req: Request, res: Response, next: NextFunction) {
  const itemId = req.params.itemId
  const updateInfo: Ctx.Body = req.body

  const [errUpdate, newItem] = await callAsync(ItemService.updateItem(itemId, updateInfo))
  if (errUpdate) return next(errUpdate)

  return res.json(newItem)
}

/** 删除某个item */
export async function remove(req: Request, res: Response, next: NextFunction) {
  const itemId = req.params.itemId

  const [errRemove, removedItem] = await callAsync(ItemService.deleteItem(itemId))
  if (errRemove) return next(errRemove)

  return res.json(removedItem)
}
