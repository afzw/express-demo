import { ItemService } from '@/business/item'
import callAsync from '@/lib/utils/callAsync'
import { injectable } from 'inversify'
import _ from 'lodash'
import { CnItemDoc } from '../../modules/item/item'
import CnItemDao from '../../modules/item/item.dao'
import CnItemStore from './item.store'

/** 【item】业务逻辑 */
@injectable()
class CnItemService implements ItemService {
  /**
   * 新建一个item
   * @param createProps 新建item的属性
   * @return 新建的item
   */
  public async createItem(createInfo: Pojo): Promise<CnItemDoc> {
    const createProps = _.pick(createInfo, CnItemStore.theCreateKeys())

    const [errCreate, newItem] = await callAsync(CnItemDao.create(createProps))
    if (errCreate) throw new Error(`数据库插入操作失败 => ${errCreate}`)

    return newItem
  }
}

export default CnItemService
