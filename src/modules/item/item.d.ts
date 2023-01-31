import { FilterQuery, HydratedDocument, Types, UpdateQuery } from 'mongoose'

/**
 * 示例模型属性
 */
export interface ItemProps {
  /**
   * 数据库唯一标识
   */
  _id?: Types.ObjectId
  /**
   * 名称
   */
  name: string
  /**
   * 价格
   */
  price: number
  /**
   * 持有人id
   */
  ownerId?: Types.ObjectId
  /**
   * 数据库数据项创建时间
   */
  createdAt: Date
  /**
   * 数据库数据项更新时间
   */
  updatedAt: Date
}

export type ItemFilter = FilterQuery<ItemProps>
export type ItemUpdate = UpdateQuery<ItemProps>
export type ItemDoc = HydratedDocument<ItemProps>
export type ItemKey = keyof ItemProps
