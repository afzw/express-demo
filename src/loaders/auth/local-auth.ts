import { UserDoc } from '@/entities/auth/user.model'
import UserDao from '@/dao/user.dao'
import { callAsync } from '@/lib/callAsync'

/**
 * 序列化用户（记录用户id）
 */
export function localSerialize(user: UserDoc, done: (err?: any, userId?: any) => void) {
  done(null, user?._id)
}

/**
 * 反序列化用户（查找用户信息）
 */
export async function localDeserialize(userId: string, done: (err?: any, user?: Express.User) => void) {
  if (!userId) return done(`反序列化用户信息失败！没有用户id！`, null)

  const [err, user] = await callAsync(UserDao.findOne({ _id: userId }))
  if (err) return done(`反序列化用户信息失败！查询数据库错误！详情${err}`, null)
  return done(null, user)
}
