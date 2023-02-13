import _ from 'lodash'
import callAsync from '@/lib/utils/callAsync'
import { Request, Response } from 'express'
import ItemCurdService from '@/modules/item/curd.service'
import ItemStore from '@/modules/item/item.store'
import { ItemFilter } from '@/modules/item/item'

/** 新建item */
export async function create(req: Request, res: Response) {
  const createProps = _.pick(req.body, ItemStore.theCreateKeys())

  const [errCreate, newItem] = await callAsync(ItemCurdService.createItem(createProps))
  if (errCreate) return res.status(500).send(`新建item失败 => ${errCreate}`)

  return res.json(newItem)
}

/** 查询items */
export async function search(req: Request, res: Response) {
  const { name, price, ownerId } = req.query

  const filter: ItemFilter = {}
  if (name) filter.name = name
  if (price) filter.price = Number(price)
  if (ownerId) filter.ownerId = ownerId

  const [errSearch, items] = await callAsync(ItemCurdService.searchItems(filter))
  if (errSearch) return res.status(500).send(`查询item失败 => ${errSearch}`)

  return res.json(items)
}

/** 更新某个item */
export async function update(req: Request, res: Response) {
  const itemId = req.params.itemId

  const filter: ItemFilter = { _id: itemId }
  const updateProps = _.pick(req.body, ItemStore.theCreateKeys())

  const [errUpdate, newItem] = await callAsync(ItemCurdService.updateItem(filter, updateProps))
  if (errUpdate) return res.status(500).send(`更新item失败 => ${errUpdate}`)

  return res.json(newItem)
}

/** 删除某个item */
export async function remove(req: Request, res: Response) {
  const itemId = req.params.itemId

  const [errRemove, removedItem] = await callAsync(ItemCurdService.deleteItem(itemId))
  if (errRemove) return res.status(500).send(`删除item失败 => ${errRemove}`)

  return res.json(removedItem)
}
