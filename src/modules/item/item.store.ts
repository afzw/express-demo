import { ItemKey } from '@/modules/item/item'

const ItemStore = {
  /**
   * 创建属性
   */
  theCreateKeys: (): ItemKey[] => ['name', 'price', 'ownerId'],
  /**
   * 查询属性
   */
  theSearchKeys: (): ItemKey[] => ItemStore.theCreateKeys()
}

export default ItemStore
