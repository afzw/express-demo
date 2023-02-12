import callAsync from '@/lib/utils/callAsync'
import ItemCurdService from '../curd.service'
import { IItemCurdService, ItemProps } from '../item'
import { ISubItemCurdService } from './sub-item'

const SubItemCurdService: ISubItemCurdService = Object.create(ItemCurdService)

SubItemCurdService.createSubItem = async function (this: IItemCurdService, createProps: ItemProps) {
  const [errCreate, newItem] = await callAsync(this.createItem(createProps))
  if (errCreate) throw new Error(`创建item失败 => ${errCreate}`)

  console.log(`不仅创建了一个item，还是一个subItem呢~`)

  return newItem
}

export default SubItemCurdService
