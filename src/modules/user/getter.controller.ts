import _ from "lodash";
import { Request, Response } from "express";
import SessionInfoDao from '@/components/sessionInfo/sessionInfo.dao'
import { callAsync } from "@/lib/utils/callAsync";
import UserDao from '@/modules/user/user.dao'
import { __roles } from "@/loaders/rbac";
import { UserProps } from "./user";
import { getPermissionsByRoles } from "@/lib/rbac";
import UserStore from "./user.store";

/**
 * 获取用户主页信息
 */
export async function getProfile(req: Request, res: Response) {
  const [updateSessionInfoErr] = await callAsync(SessionInfoDao.findOneDocAndUpdate({ sessionId: req.sessionID }, { activeAt: new Date() }))
  if (updateSessionInfoErr) return res.status(500).send(`更新会话信息失败 => ${updateSessionInfoErr}`)

  const [findUserInfoErr, userInfo] = await callAsync<UserProps & { permissions?: string[] }>(UserDao.findOneObjAndUpdate({ _id: req.user._id }, { activeAt: new Date }))
  if (findUserInfoErr) return res.status(500).send(`获取用户信息失败 => ${findUserInfoErr}`)

  const permissions = getPermissionsByRoles(userInfo.roles)
  userInfo.permissions = permissions
  const profile = _.pick(userInfo, UserStore.theProfileKeys())

  res.send(profile)
}
