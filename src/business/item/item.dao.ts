import ItemModel from '@/modules/item/item.model'
import { MongooseBase } from '@/components/mongoose'
import { ItemProps } from '@/modules/item/item'

class ItemDao extends MongooseBase<ItemProps> {}

const itemDao = new ItemDao(ItemModel)

export default itemDao
