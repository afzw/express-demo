import 'reflect-metadata'
import _ from 'lodash'
import callAsync from '@/lib/utils/callAsync'
import { ItemDoc, ItemProps, ItemFilter } from '@/modules/item/item'
import { ItemDao } from '@/modules/item/item.dao'
import { ItemStore } from './item.store'
import { inject, injectable } from 'inversify'
import { ItemDaoSymbol, ItemStoreSymbol } from '@/inversify.type'

export interface ItemService {
  /**
   * 新建一个item
   * @param createInfo item新建信息
   * @return 新建的item
   */
  createItem(createInfo: Pojo): Promise<ItemDoc>
  /**
   * 查询item
   * @param filter 查询条件
   * @return 查询出的item mongoose 文档
   */
  searchItems(filter: ItemFilter): Promise<{ items: ItemDoc[]; total: number }>
  /**
   * 更新某个item
   * @param filter 查询条件
   * @param updateInfo item更新信息
   * @return 更新后的item
   */
  updateItem(filter: ItemFilter, updateInfo: Pojo): Promise<ItemDoc>
  /**
   * 删除某个item
   * @param filter 查询条件
   * @param 删除的item mongoose 文档
   */
  deleteItem(filter: ItemFilter): Promise<ItemDoc>
}

@injectable()
class CommonItemService implements ItemService {
  private _itemDao: ItemDao
  private _itemStore: ItemStore

  public constructor(@inject(ItemDaoSymbol) itemDao: ItemDao, @inject(ItemStoreSymbol) itemStore: ItemStore) {
    this._itemDao = itemDao
    this._itemStore = itemStore
  }

  public async createItem(createInfo: Pojo): Promise<ItemDoc> {
    const createProps = _.pick(createInfo, this._itemStore.theCreateKeys())

    const [errCreate, newItem] = await callAsync(this._itemDao.create(createProps))
    if (errCreate) throw new Error(`数据库插入操作失败 => ${errCreate}`)

    return newItem
  }

  public async searchItems(filter: ItemFilter): Promise<{ items: ItemDoc[]; total: number }> {
    const [errSearchItems, items] = await callAsync(this._itemDao.findDocsByFilter(filter))
    if (errSearchItems) throw new Error(`数据库查询items失败 => ${errSearchItems}`)

    const [errSearchTotal, total] = await callAsync(this._itemDao.countDocuments(filter))
    if (errSearchTotal) throw new Error(`数据库查询items总数失败 => ${errSearchTotal}`)

    const result = { items, total }

    return result
  }

  public async updateItem(filter: ItemFilter, updateProps: ItemProps): Promise<ItemDoc> {
    const queryOptions = { new: true }

    const [errUpdate, newItem] = await callAsync(this._itemDao.findOneDocAndUpdate(filter, updateProps, queryOptions))
    if (errUpdate) throw new Error(`数据库更新操作失败 => ${errUpdate}`)

    return newItem
  }

  public async deleteItem(filter: ItemFilter): Promise<ItemDoc> {
    const [errDelete, deletedItem] = await callAsync(this._itemDao.findOneDocAndDelete(filter))
    if (errDelete) throw new Error(`数据库删除操作失败 => ${errDelete}`)

    return deletedItem
  }
}

export { CommonItemService }
