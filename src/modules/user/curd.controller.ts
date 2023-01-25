import _ from "lodash";
import { Request, Response } from "express";
import UserDao from '@/modules/user/user.dao'
import callAsync from "@/lib/utils/callAsync";

/**
 * 查询用户
 */
export async function search(req: Request, res: Response) {
  const [searchErr, users] = await callAsync(UserDao.findUsersByFilter({}))
  if (searchErr) return res.status(500).send(`查询用户失败，数据库错误 => ${searchErr}`)

  return res.status(200).send(users)
}
