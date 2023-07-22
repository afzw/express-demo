import { ItemKey } from '@/entities/item.model'

const ItemStore = {
  /**
   * 创建属性
   */
  theCreateKeys: (): ItemKey[] => ['name', 'price', 'ownerId'],
  /**
   * 可查询依据
   */
  theSearchKeys: (): ItemKey[] => ItemStore.theCreateKeys()
}

export default ItemStore
