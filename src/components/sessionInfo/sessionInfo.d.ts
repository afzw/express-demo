import { FilterQuery, HydratedDocument, Types, UpdateQuery } from 'mongoose'

/**
 * Session信息属性
 */
export interface SessionInfoProps {
  /**
   * 数据库唯一标识
   */
  _id?: Types.ObjectId
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
  createdAt?: Date
  updatedAt?: Date
}

export type SessionInfoFilter = FilterQuery<SessionInfoProps>
export type SessionInfoUpdate = UpdateQuery<SessionInfoProps>
export type SessionInfoDoc = HydratedDocument<SessionInfoProps>
export type SessionInfoKey = keyof SessionInfoProps
