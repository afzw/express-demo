import { ItemKey } from '@/modules/item/item'
import ItemStore from '../item.store'

const DiscountItemStore = {
  /**
   * 创建属性
   */
  theCreateKeys: (): ItemKey[] => {
    const createItemKeys = ItemStore.theCreateKeys()
    const result: ItemKey[] = [...createItemKeys, 'discount']

    return result
  }
}

export default DiscountItemStore
