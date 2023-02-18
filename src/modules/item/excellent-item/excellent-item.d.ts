/**
 * @file excellent-item数据模型 类型定义
 */
import { FilterQuery, HydratedDocument, LeanDocument, UpdateQuery } from 'mongoose'
import { ItemProps } from '@/modules/item/item'

/* --------------------------- 业务属性  --------------------------- */
/** 星级 */
export enum StarLevel {
  ONE = 1,
  TWO,
  THREE,
  FOUR,
  FIVE
}
/**
 * excellent-item 属性
 */
export interface ExcellentItemProps extends ItemProps {
  /** 星级 */
  starLevel: StarLevel
}

/* --------------------------- odm (mongoose) 相关  --------------------------- */
/**
 * 业务属性名。
 */
export type ExcellentItemKey = keyof ExcellentItemProps
/**
 * mongoose文档，包含mongoose内置操作，不能直接更改内部的属性。
 */
export type ExcellentItemDoc = HydratedDocument<ExcellentItemProps>
/**
 * mongoose文档的Pojo格式，可以直接操作。
 * 若您想修改数据库中查询出的文档，您应该使用该种类型。
 */
export type ExcellentItemDocPojo = LeanDocument<ExcellentItemDoc>
/**
 * mongoose文档的Pojo格式的属性名。
 */
export type ExcellentItemDocPojoKey = keyof ExcellentItemDocPojo
/**
 * mongoose 查询对象
 */
export type ExcellentItemFilter = FilterQuery<ExcellentItemProps>
/**
 * mongoose 更新对象
 */
export type ExcellentItemUpdate = UpdateQuery<ExcellentItemProps>
