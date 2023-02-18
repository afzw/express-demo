/**
 * @file excellent-discount-item数据模型 类型定义
 */
import { FilterQuery, HydratedDocument, LeanDocument, UpdateQuery } from 'mongoose'
import { ItemProps } from '@/modules/item/item'

/* --------------------------- 业务属性  --------------------------- */
/**
 * discount-item 属性
 */
export interface ExcellentDiscountItemProps extends ItemProps {
  /** 折扣率 */
  discount: number
}

/* --------------------------- odm (mongoose) 相关  --------------------------- */
/**
 * 业务属性名。
 */
export type ExcellentDiscountItemKey = keyof ExcellentDiscountItemProps
/**
 * mongoose文档，包含mongoose内置操作，不能直接更改内部的属性。
 */
export type ExcellentDiscountItemDoc = HydratedDocument<ExcellentDiscountItemProps>
/**
 * mongoose文档的Pojo格式，可以直接操作。
 * 若您想修改数据库中查询出的文档，您应该使用该种类型。
 */
export type ExcellentDiscountItemDocPojo = LeanDocument<ExcellentDiscountItemDoc>
/**
 * mongoose文档的Pojo格式的属性名。
 */
export type ExcellentDiscountItemDocPojoKey = keyof ExcellentDiscountItemDocPojo
/**
 * mongoose 查询对象
 */
export type ExcellentDiscountItemFilter = FilterQuery<ExcellentDiscountItemProps>
/**
 * mongoose 更新对象
 */
export type ExcellentDiscountItemUpdate = UpdateQuery<ExcellentDiscountItemProps>
