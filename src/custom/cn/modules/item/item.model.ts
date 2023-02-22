import ItemModel from '@/modules/item/item.model'
import { Schema } from 'mongoose'
import { CnItemProps } from './item'

export const CnItemSchema = new Schema<CnItemProps>(
  {
    cn_description: String
  },
  {
    timestamps: true
  }
)

const CnItemModel = ItemModel.discriminator<CnItemProps>('cn', CnItemSchema)

export default CnItemModel
