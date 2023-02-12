import { Schema, model } from 'mongoose'
import { ItemProps } from './item'

export const ItemSchema = new Schema<ItemProps>(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  },
  {
    timestamps: true
  }
)

const ItemModel = model<ItemProps>('item', ItemSchema)

export default ItemModel
