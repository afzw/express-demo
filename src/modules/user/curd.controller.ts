import { UserModel } from "@/modules/user/user.model";
import { Request, Response } from "express";
import * as UserDao from '@/modules/user/user.dao'

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
  const users = await UserDao.findUsersByFilter({})
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