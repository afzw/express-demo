import callAsync from '@/lib/utils/callAsync'
import { DiscountItemDoc, DiscountItemProps } from '@/modules/item/discount-item/discount-item'
import DiscountItemDao from '@/modules/item/discount-item/discount-item.dao'
import _ from 'lodash'
import DiscountItemStore from './discount-item.store'

/** discount-item 业务逻辑 */
class DiscountItemService {
  /**
   * 新建一个discount-itemn
   * @param createProps 新建discount-itemn的属性
   * @return 新建的discount-itemn
   */
  public static async createDiscountItem(createInfo: Pojo): Promise<DiscountItemDoc> {
    const createProps = _.pick(createInfo, DiscountItemStore.theCreateKeys())

    const [errCreate, newDiscountItem] = await callAsync(DiscountItemDao.create(createProps))
    if (errCreate) throw new Error(`数据库插入操作失败 => ${errCreate}`)

    return newDiscountItem
  }
}

export default DiscountItemService
