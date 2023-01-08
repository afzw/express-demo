import { UserProps } from "@/modules/user/user";
import UserDao from "@/modules/user/user.dao"
import { callAsync } from "@/lib/utils/callAsync";

/**
 * 序列化用户（记录用户id）
 */
export function serializeUserCb (user: UserProps, done: (err?: any, userId?: any) => void) {
  done(null, user?._id)
}

/**
 * 反序列化用户（查找用户信息）
 */
export async function deserializeUserCb (userId: string, done: (err?: any, user?: Express.User) => void) {
  if (!userId) return done(`反序列化用户信息失败！没有用户id！`, null)

  const [err, user] = await callAsync(UserDao.findUserByFilter({ _id: userId }))
  if (err) return done(`反序列化用户信息失败！查询数据库错误！详情${err}`, null)
  return done(null, user)
}