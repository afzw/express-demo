import 'reflect-metadata'
import { ItemKey } from '@/modules/item/item'
import { injectable } from 'inversify'

interface ItemStore {
  /** 创建item的属性 */
  theCreateKeys(): string[]
  /** 可筛选查询的属性 */
  theSearchKeys(): string[]
}

@injectable()
class CommonItemStore implements ItemStore {
  public theCreateKeys = (): ItemKey[] => ['name', 'price', 'ownerId']

  public theSearchKeys = (): ItemKey[] => this.theCreateKeys()
}

export { ItemStore, CommonItemStore }
