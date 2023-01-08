import _ from "lodash";
import { Request, Response } from "express";
import * as SessionInfoDao from '@/components/sessionInfo/sessionInfo.dao'
import { callAsync } from "@/lib/utils/callAsync";
import UserDao from '@/modules/user/user.dao'

/**
 * 获取用户个人信息
 */
export async function getProfile(req: Request, res: Response) {
  const [updateSessionInfoerr] = await callAsync(SessionInfoDao.updateTheActiveAt({ sessionId: req.sessionID }))
  if (updateSessionInfoerr) return res.status(500).send(`获取用户信息失败！更新会话信息失败！详情：${updateSessionInfoerr}`)

  const [findProfileErr, profile] = await callAsync(UserDao.findUserAndUpdate({ _id: req.user._id }, { activeAt: new Date }))
  if (findProfileErr) return res.status(500).send(`获取用户信息失败！详情：${findProfileErr}`)

  res.send(_.omit(profile, 'password', 'salt'))
}