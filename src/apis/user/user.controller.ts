import _ from 'lodash'
import { Request, Response } from 'express'
import SessionInfoDao from '@/dao/sessionInfo.dao'
import { callAsync } from '@/lib/utils/callAsync'
import UserDao from '@/dao/user.dao'
import UserStore from '../../business/user/user.store'

/**
 * 获取用户主页信息
 */
export async function getProfile(req: Request, res: Response) {
  const [updateSessionInfoErr] = await callAsync(
    SessionInfoDao.findOneAndUpdate({ sessionId: req.sessionID }, { activeAt: new Date() })
  )
  if (updateSessionInfoErr) return res.status(500).send(`更新会话信息失败 => ${updateSessionInfoErr}`)

  const [findUserInfoErr, userInfo] = await callAsync(
    UserDao.findOne({ _id: req.user._id }, { activeAt: new Date() }, { lean: true })
  )
  if (findUserInfoErr) return res.status(500).send(`获取用户信息失败 => ${findUserInfoErr}`)

  const profile = _.pick(userInfo, UserStore.theProfileKeys())

  res.send(profile)
}
/**
 * 查询用户
 */
export async function search(req: Request, res: Response) {
  const [searchErr, users] = await callAsync(UserDao.find({}))
  if (searchErr) return res.status(500).send(`查询用户失败，数据库错误 => ${searchErr}`)

  return res.status(200).send(users)
}