import { Request, Response } from 'express'
import { callAsync } from '@/lib/callAsync'
import UserDao from '@/dao/user.dao'

/**
 * 查询用户
 */
export async function search(req: Request, res: Response) {
  const [searchErr, users] = await callAsync(UserDao.find({}))
  if (searchErr) return res.status(500).send(`查询用户失败，数据库错误 => ${searchErr}`)

  return res.status(200).send(users)
}
