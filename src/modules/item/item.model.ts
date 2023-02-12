import { Schema, model } from 'mongoose'

export const ItemSchema = new Schema(
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

const ItemModel = model('item', ItemSchema)

export default ItemModel
