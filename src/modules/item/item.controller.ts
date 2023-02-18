import _ from 'lodash'
import callAsync from '@/lib/utils/callAsync'
import { Request, Response, NextFunction } from 'express'
import ItemCurdService from '@/modules/item/curd.service'
import ItemStore from '@/modules/item/item.store'
import { ItemFilter } from '@/modules/item/item'

/** 新建item */
export async function create(req: Request, res: Response, next: NextFunction) {
  const createProps = _.pick(req.body, ItemStore.theCreateKeys())

  const [errCreate, newItem] = await callAsync(ItemCurdService.createItem(createProps))
  if (errCreate) return next({ code: 500, title: `新建item失败`, err: errCreate })

  return res.json(newItem)
}

/** 查询items */
export async function search(req: Request, res: Response, next: NextFunction) {
  const { name, price, ownerId } = req.query

  const filter: ItemFilter = {}
  if (name) filter.name = name
  if (price) filter.price = Number(price)
  if (ownerId) filter.ownerId = ownerId

  const [errSearch, items] = await callAsync(ItemCurdService.searchItems(filter))
  if (errSearch) return next({ code: 500, title: `查询item失败`, err: errSearch })

  return res.json(items)
}

/** 更新某个item */
export async function update(req: Request, res: Response, next: NextFunction) {
  const itemId = req.params.itemId

  const filter: ItemFilter = { _id: itemId }
  const updateProps = _.pick(req.body, ItemStore.theCreateKeys())

  const [errUpdate, newItem] = await callAsync(ItemCurdService.updateItem(filter, updateProps))
  if (errUpdate) next({ code: 500, title: `更新item失败`, err: errUpdate })

  return res.json(newItem)
}

/** 删除某个item */
export async function remove(req: Request, res: Response, next: NextFunction) {
  const itemId = req.params.itemId

  const [errRemove, removedItem] = await callAsync(ItemCurdService.deleteItem(itemId))
  if (errRemove) return next({ code: 500, title: `删除item失败`, err: errRemove })

  return res.json(removedItem)
}
