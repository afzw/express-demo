/**
 * @file cn-item数据模型 类型定义
 */
import { ItemProps } from '@/modules/item/item'
import { FilterQuery, HydratedDocument, LeanDocument, UpdateQuery } from 'mongoose'

/* --------------------------- 业务属性  --------------------------- */
/**
 * 属性
 */
export interface CnItemProps extends ItemProps {
  /** 中文简介 */
  cn_description?: string
}

/* --------------------------- odm (mongoose) 相关  --------------------------- */
/**
 * 业务属性名。
 */
export type CnItemKey = keyof CnItemProps
/**
 * mongoose文档，包含mongoose内置操作，不能直接更改内部的属性。
 */
export type CnItemDoc = HydratedDocument<CnItemProps>
/**
 * mongoose文档的Pojo格式，可以直接操作。
 * 若您想修改数据库中查询出的文档，您应该使用该种类型。
 */
export type CnItemDocPojo = LeanDocument<CnItemDoc>
/**
 * mongoose文档的Pojo格式的属性名。
 */
export type CnItemDocPojoKey = keyof CnItemDocPojo
/**
 * mongoose 查询对象
 */
export type CnItemFilter = FilterQuery<CnItemProps>
/**
 * mongoose 更新对象
 */
export type CnItemUpdate = UpdateQuery<CnItemProps>
