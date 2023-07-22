import { FilterQuery, HydratedDocument, LeanDocument, Types, UpdateQuery } from 'mongoose'

/**
 * 脚本属性
 */
export interface ScriptProps {
  /**
   * 脚本名称
   */
  name: string
  /**
   * 脚本执行状态
   */
  status: 'done' | 'error'
  /**
   * 脚本执行时间
   */
  duration?: number
  /**
   * 备注信息
   */
  message?: string
  /**
   * 数据库文档创建时间，不应与业务耦合。
   */
  createdAt?: Date
  /**
   * 数据库文档更新时间，不应与业务耦合。
   */
  updatedAt?: Date
}

/**
 * 业务属性名。
 */
export type ScriptKey = keyof ScriptProps
/**
 * mongoose文档，包含mongoose内置操作，不能直接更改内部的属性。
 */
export type ScriptDoc = HydratedDocument<ScriptProps>
/**
 * mongoose文档的Pojo格式，可以直接操作。
 * 若您想修改数据库中查询出的文档，您应该使用该种类型。
 */
export type ScriptDocPojo = LeanDocument<ScriptDoc>
/**
 * mongoose文档的Pojo格式的属性名。
 */
export type ScriptDocPojoKey = keyof ScriptDocPojo
/**
 * mongoose 查询对象
 */
export type ScriptFilter = FilterQuery<ScriptProps>
/**
 * mongoose 更新对象
 */
export type ScriptUpdate = UpdateQuery<ScriptProps>
