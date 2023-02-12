import { Schema } from 'mongoose'
import ItemModel from '@/modules/item/item.model'
import { DiscountItemProps } from './discount-item'

export const DiscountItemSchema = new Schema<DiscountItemProps>(
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

const DiscountItemModel = ItemModel.discriminator<DiscountItemProps>('Discount', DiscountItemSchema)

export default DiscountItemModel
