import { ItemDoc, ItemProps, IItemCurdService } from '@/modules/item/item'

/* --------------------------- 业务逻辑  --------------------------- */
/**
 * 业务逻辑 - 增删改查
 */
export interface SubItemCurdService extends IItemCurdService {
  /**
   * 新建一个sub-item
   * @param createProps 新建sub-item的属性
   * @return 新建的sub-item
   */
  createSubItem: (createProps: ItemProps) => Promise<ItemDoc>
}
