import callAsync from '@/lib/utils/callAsync'
import { ItemDoc, ItemProps, IItemCurdService, ItemFilter } from '@/modules/item/item'
import ItemDao from '@/modules/item/item.dao'

const ItemCurdService: IItemCurdService = Object.create(null)

ItemCurdService.createItem = async function (createProps: ItemProps): Promise<ItemDoc> {
  const [errCreate, newItem] = await callAsync(ItemDao.create(createProps))
  if (errCreate) throw new Error(`数据库插入操作失败 => ${errCreate}`)

  return newItem
}

ItemCurdService.searchItems = async function (filter: ItemFilter): Promise<{ items: ItemDoc[]; total: number }> {
  const [errSearchItems, items] = await callAsync(ItemDao.findDocsByFilter(filter))
  if (errSearchItems) throw new Error(`数据库查询items失败 => ${errSearchItems}`)

  const [errSearchTotal, total] = await callAsync(ItemDao.countDocuments(filter))
  if (errSearchTotal) throw new Error(`数据库查询items总数失败 => ${errSearchTotal}`)

  const result = { items, total }

  return result
}

ItemCurdService.updateItem = async function (itemId: string, updateProps: ItemProps): Promise<ItemDoc> {
  const filter: ItemFilter = { _id: itemId }
  const queryOptions = { new: true }

  const [errUpdate, newItem] = await callAsync(ItemDao.findOneDocAndUpdate(filter, updateProps, queryOptions))
  if (errUpdate) throw new Error(`数据库更新操作失败 => ${errUpdate}`)

  return newItem
}

ItemCurdService.deleteItem = async function (itemId: string): Promise<ItemDoc> {
  const filter: ItemFilter = { _id: itemId }

  const [errDelete, deletedItem] = await callAsync(ItemDao.findOneDocAndDelete(filter))
  if (errDelete) throw new Error(`数据库删除操作失败 => ${errDelete}`)

  return deletedItem
}

export default ItemCurdService
