import _ from 'lodash'
import { Request, Response } from 'express'
import SessionInfoDao from '@/dao/sessionInfo.dao'
import { callAsync } from '@/lib/callAsync'
import UserDao from '@/dao/user.dao'
import UserStore from '../../business/user/user.store'

/**
 * 获取用户主页信息
 */
export async function getProfile(req: Request, res: Response) {
  const user = req.user

  const [updateSessionInfoErr] = await callAsync(
    SessionInfoDao.findOneAndUpdate({ sessionId: req.sessionID }, { activeAt: new Date() })
  )
  if (updateSessionInfoErr) console.log(`更新会话信息失败 => ${updateSessionInfoErr}`)

  const profile = _.pick(user, UserStore.theProfileKeys())

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
