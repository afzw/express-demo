import { Schema, model, FilterQuery, HydratedDocument, LeanDocument, Types, UpdateQuery } from 'mongoose'

/* --------------------------- 业务属性  --------------------------- */
/**
 * 属性
 */
export interface ItemProps {
  /** 名称 */
  name: string
  /** 价格 */
  price: number
  /** 持有人id */
  ownerId?: Types.ObjectId
  /** 附件id */
  attachmentId?: Types.ObjectId
  /** 数据库文档创建时间，不应与业务耦合。 */
  createdAt?: Date
  /** 数据库文档更新时间，不应与业务耦合。 */
  updatedAt?: Date
}

/* --------------------------- odm (mongoose) 相关  --------------------------- */
/**
 * 业务属性名。
 */
export type ItemKey = keyof ItemProps
/**
 * mongoose文档，包含mongoose内置操作，不能直接更改内部的属性。
 */
export type ItemDoc = HydratedDocument<ItemProps>
/**
 * mongoose文档的Pojo格式，可以直接操作。
 * 若您想修改数据库中查询出的文档，您应该使用该种类型。
 */
export type ItemDocPojo = LeanDocument<ItemDoc>
/**
 * mongoose文档的Pojo格式的属性名。
 */
export type ItemDocPojoKey = keyof ItemDocPojo
/**
 * mongoose 查询对象
 */
export type ItemFilter = FilterQuery<ItemProps>
/**
 * mongoose 更新对象
 */
export type ItemUpdate = UpdateQuery<ItemProps>

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
    },
    attachmentId: {
      type: Schema.Types.ObjectId,
      ref: 'file'
    }
  },
  {
    timestamps: true
  }
)

const ItemModel = model<ItemProps>('item', ItemSchema)

export default ItemModel
