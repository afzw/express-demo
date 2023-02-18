import { Schema } from 'mongoose'
import ItemModel from '@/modules/item/item.model'
import { ExcellentDiscountItemProps } from './excellent-discount-item'

export const ExcellentDiscountItemSchema = new Schema<ExcellentDiscountItemProps>(
  {
    discount: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const ExcellentDiscountItemModel = ItemModel.discriminator<ExcellentDiscountItemProps>(
  'Discount',
  ExcellentDiscountItemSchema
)

export default ExcellentDiscountItemModel
