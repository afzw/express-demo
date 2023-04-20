import ItemModel from '@/modules/item/item.model'
import { MongooseBase } from '@/components/mongoose'

class ItemDao extends MongooseBase {}

const itemDao = new ItemDao(ItemModel)

export default itemDao
