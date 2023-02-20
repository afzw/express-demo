import ItemStore from '@/business/item/item.store'
import { CnItemKey } from '../../modules/item/item'

const CnItemStore = {
  /**
   * 创建属性
   */
  theCreateKeys: (): CnItemKey[] => [...ItemStore.theCreateKeys(), 'cn_description']
}

export default CnItemStore
