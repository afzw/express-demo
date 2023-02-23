import { CommonItemStore, ItemStore } from '@/business/item/item.store'
import { injectable } from 'inversify'
import { CnItemKey } from '@/custom/cn/modules/item/item'

const commonItemStore = new CommonItemStore()

@injectable()
class CnItemStore implements ItemStore {
  public theCreateKeys = (): CnItemKey[] => [...commonItemStore.theCreateKeys(), 'cn_description']

  public theSearchKeys = (): CnItemKey[] => commonItemStore.theSearchKeys()
}

export { CnItemStore }
