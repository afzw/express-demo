import { FilterQuery, HydratedDocument, LeanDocument, Types, UpdateQuery } from 'mongoose'

/**
 * Session信息属性
 */
export interface SessionInfoProps {
  /**
   * session ID
   */
  sessionId?: string
  /**
   * session组 ID
   */
  sessionGroupId?: string
  /**
   * session相应的用户id
   */
  userId?: Types.ObjectId
  /**
   * ip地址
   */
  ipAddress?: string
  /**
   * 用户代理
   */
  userAgent?: string
  /**
   * 激活时间
   */
  activeAt?: Date
  /**
   * 过期时间
   */
  expireAt?: Date
  /**
   * 数据库文档创建时间，不应与业务耦合。
   */
  createdAt: Date
  /**
   * 数据库文档更新时间，不应与业务耦合。
   */
  updatedAt: Date
}

/**
 * 业务属性名。
 */
export type SessionInfoKey = keyof SessionInfoProps
/**
 * mongoose文档，包含mongoose内置操作，不能直接更改内部的属性。
 */
export type SessionInfoDoc = HydratedDocument<SessionInfoProps>
/**
 * mongoose文档的Pojo格式，可以直接操作。
 * 若您想修改数据库中查询出的文档，您应该使用该种类型。
 */
export type SessionInfoDocPojo = LeanDocument<SessionInfoDoc>
/**
 * mongoose文档的Pojo格式的属性名。
 */
export type SessionInfoDocPojoKey = keyof SessionInfoDocPojo
/**
 * mongoose 查询对象
 */
export type SessionInfoFilter = FilterQuery<SessionInfoProps>
/**
 * mongoose 更新对象
 */
export type SessionInfoUpdate = UpdateQuery<SessionInfoProps>
