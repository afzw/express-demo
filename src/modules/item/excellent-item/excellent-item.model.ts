import { Schema } from 'mongoose'
import ItemModel from '@/modules/item/item.model'
import { ExcellentItemProps } from './excellent-item'

export const ExcellentItemSchema = new Schema<ExcellentItemProps>(
  {
    starLevel: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const ExcellentItemModel = ItemModel.discriminator<ExcellentItemProps>('Excellent', ExcellentItemSchema)

export default ExcellentItemModel
