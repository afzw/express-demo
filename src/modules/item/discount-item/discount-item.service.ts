import callAsync from '@/lib/utils/callAsync'
import ItemCurdService from '../curd.service'
import { ItemFilter, ItemUpdate } from '../item'

/**
 * 【discount-item】业务逻辑
 */
class DiscountItemService {
  /**
   * 商品打折
   * @param itemId item id
   * @param discount 折扣率
   */
  public static async discountItem(itemId: string, discount: number) {
    const filter: ItemFilter = { _id: itemId }
    const updateDoc: ItemUpdate = { discount }

    const [errUpdate, newItem] = await callAsync(ItemCurdService.updateItem(filter, updateDoc))
    if (errUpdate) throw new Error(`更新商品信息失败 => ${errUpdate}`)

    return newItem
  }
}

export default DiscountItemService
