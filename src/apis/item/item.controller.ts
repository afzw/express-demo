import callAsync from '@/lib/utils/callAsync'
import { Request, Response } from 'express'
import ItemService from '@/business/item'
import { ItemFilter } from '@/modules/item/item'

/** 新建item */
export async function create(req: Request, res: Response) {
  const createInfo: Ctx.Body = req.body

  const [errCreate, newItem] = await callAsync(ItemService.createItem(createInfo))
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

  const [errSearch, result] = await callAsync(ItemService.searchItems(filter))
  if (errSearch) return res.status(500).send(`查询item失败 => ${errSearch}`)

  return res.json(result)
}

/** 更新某个item */
export async function update(req: Request, res: Response) {
  const itemId = req.params.itemId
  const updateInfo: Ctx.Body = req.body

  const [errUpdate, newItem] = await callAsync(ItemService.updateItem(itemId, updateInfo))
  if (errUpdate) return res.status(500).send(`更新item失败 => ${errUpdate}`)

  return res.json(newItem)
}

/** 删除某个item */
export async function remove(req: Request, res: Response) {
  const itemId = req.params.itemId

  const [errRemove, removedItem] = await callAsync(ItemService.deleteItem(itemId))
  if (errRemove) return res.status(500).send(`删除item失败 => ${errRemove}`)

  return res.json(removedItem)
}
