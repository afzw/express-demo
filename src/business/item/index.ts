import callAsync from '@/lib/utils/callAsync'
import { ItemDoc, ItemProps, ItemFilter } from '@/modules/item/item'
import ItemDao from '@/modules/item/item.dao'

/** 【item】业务逻辑 */
class ItemService {
  /**
   * 新建一个item
   * @param createProps 新建item的属性
   * @return 新建的item
   */
  public static async createItem(createProps: ItemProps): Promise<ItemDoc> {
    const [errCreate, newItem] = await callAsync(ItemDao.create(createProps))
    if (errCreate) throw new Error(`数据库插入操作失败 => ${errCreate}`)

    return newItem
  }

  /**
   * 查询item
   * @param searchProps
   * @return 查询出的item mongoose 文档
   */
  public static async searchItems(filter: ItemFilter): Promise<{ items: ItemDoc[]; total: number }> {
    const [errSearchItems, items] = await callAsync(ItemDao.findDocsByFilter(filter))
    if (errSearchItems) throw new Error(`数据库查询items失败 => ${errSearchItems}`)

    const [errSearchTotal, total] = await callAsync(ItemDao.countDocuments(filter))
    if (errSearchTotal) throw new Error(`数据库查询items总数失败 => ${errSearchTotal}`)

    const result = { items, total }

    return result
  }

  /**
   * 更新某个item
   * @param itemId item id
   * @param updateProps 更新的属性
   * @return 更新后的item
   */
  public static async updateItem(filter: ItemFilter, updateProps: ItemProps): Promise<ItemDoc> {
    const queryOptions = { new: true }

    const [errUpdate, newItem] = await callAsync(ItemDao.findOneDocAndUpdate(filter, updateProps, queryOptions))
    if (errUpdate) throw new Error(`数据库更新操作失败 => ${errUpdate}`)

    return newItem
  }

  /**
   * 删除某个item
   * @param itemId item id
   * @param 删除的item mongoose 文档
   */
  public static async deleteItem(itemId: string): Promise<ItemDoc> {
    const filter: ItemFilter = { _id: itemId }

    const [errDelete, deletedItem] = await callAsync(ItemDao.findOneDocAndDelete(filter))
    if (errDelete) throw new Error(`数据库删除操作失败 => ${errDelete}`)

    return deletedItem
  }
}

export default ItemService
