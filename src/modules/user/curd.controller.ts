import { Request, Response } from "express";
import UserDao from '@/modules/user/user.dao'
import callAsync from "@/lib/utils/callAsync";

/**
 * 新增用户
 */
export async function create(req: Request, res: Response) {
  return res.status(200).send('ok')
}

/**
 * 查询用户
 */
export async function search(req: Request, res: Response) {
  const [searchErr, users] = await callAsync(UserDao.findUsersByFilter({}))
  if (searchErr) return res.status(500).send(`查询用户失败，数据库错误 => ${searchErr}`)

  return res.status(200).send(users)
}

/**
 * 修改用户
 */
export async function update(req: Request, res: Response) {
  return res.status(200).send('ok')
}

/**
 * 删除用户
 */
export async function _delete(req: Request, res: Response) {
  return res.status(200).send('ok')
}