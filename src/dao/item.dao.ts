import ItemModel from '@/entities/item/item.model'
import { MongooseBase } from '@/components/mongoose'
import { ItemProps } from '@/entities/item/item'

class ItemDao extends MongooseBase<ItemProps> {}

const itemDao = new ItemDao(ItemModel)

export default itemDao
