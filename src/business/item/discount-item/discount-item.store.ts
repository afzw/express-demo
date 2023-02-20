import { DiscountItemKey } from '@/modules/item/discount-item/discount-item'
import ItemStore from '../item.store'

const DiscountItemStore = {
  /**
   * 创建属性
   */
  theCreateKeys: (): DiscountItemKey[] => [...ItemStore.theCreateKeys(), 'discount']
}

export default DiscountItemStore
