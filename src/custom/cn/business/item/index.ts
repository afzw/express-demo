import { CommonItemService } from '@/business/item'
import callAsync from '@/lib/utils/callAsync'
import { injectable } from 'inversify'
import { CnItemDoc } from '@/custom/cn/modules/item/item'
import { ItemFilter } from '@/modules/item/item'

/** 【item】业务逻辑 */
@injectable()
class CnItemService extends CommonItemService {
  public async createItem(createInfo: Pojo): Promise<CnItemDoc> {
    const [errCreate, newItem] = await callAsync(super.createItem(createInfo))
    if (errCreate) throw new Error(`创建cnitem失败 => ${errCreate}`)

    console.log(`创建了一个cn-item嘿嘿~`)

    return newItem
  }

  public async searchItems(filter: ItemFilter): Promise<{ items: CnItemDoc[]; total: number }> {
    const [errSearch, searchResult] = await callAsync(super.searchItems(filter))
    if (errSearch) throw new Error(`创建cnItem失败 => ${errSearch}`)

    console.log(`查询cn-item喽~`)

    return searchResult
  }
}

export { CnItemService }
