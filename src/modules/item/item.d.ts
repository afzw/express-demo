/**
 * @file item数据模型 类型定义
 */
import { FilterQuery, HydratedDocument, LeanDocument, Types, UpdateQuery } from 'mongoose'

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
  /** 数据库文档创建时间，不应与业务耦合。 */
  createdAt: Date
  /** 数据库文档更新时间，不应与业务耦合。 */
  updatedAt: Date

  /** 【discount-item】折扣率 */
  discount?: number
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
