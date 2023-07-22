import ItemModel from '@/entities/item.model'
import { MongooseBase } from '@/dao/utils'
import { ItemProps } from '@/entities/item.model'

class ItemDao extends MongooseBase<ItemProps> {}

const itemDao = new ItemDao(ItemModel)

export default itemDao
