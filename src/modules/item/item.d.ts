/**
 * @file item数据模型 类型定义
 */
import { FilterQuery, HydratedDocument, LeanDocument, Types, UpdateQuery } from 'mongoose'

/* --------------------------- 业务属性  --------------------------- */
/**
 * 属性
 */
export interface ItemProps {
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
   * 数据库文档创建时间，不应与业务耦合。
   */
  createdAt: Date
  /**
   * 数据库文档更新时间，不应与业务耦合。
   */
  updatedAt: Date
}

/* --------------------------- 业务逻辑  --------------------------- */
/**
 * 业务逻辑 - 增删改查
 */
export interface ItemCurdService {
  /**
   * 新建一个item
   * @param createProps 新建item的属性
   * @return 新建的item
   */
  createItem: (createProps: ItemProps) => Promise<ItemDoc>
  /**
   * 查询item
   * @param searchProps
   * @return 查询出的item mongoose 文档
   */
  searchItems: (filter: ItemFilter) => Promise<{ items: ItemDoc[]; total: number }>
  /**
   * 更新某个item
   * @param itemId item id
   * @param updateProps 更新的属性
   * @return 更新后的item
   */
  updateItem: (itemId: string, updateProps: ItemProps) => Promise<ItemDoc>
  /**
   * 删除某个item
   * @param itemId item id
   * @param 删除的item mongoose 文档
   */
  deleteItem: (itemId: string) => Promise<ItemDoc>
}
/**
 * 业务逻辑 - 校验
 */
export interface ItemValidationService {
  /**
   * 根据id验证某个item是否存在。
   * @param itemId item id
   */
  validateItemExistById: (itemId: string) => Promise<ItemDoc>
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
