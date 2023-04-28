/**
 * @file 公共路由控制器
 */
import _ from 'lodash'
import utils from '@/lib/utils/common'
import { callAsync } from '@/lib/utils/callAsync'
import UserDao from '@/modules/user/user.dao'
import { NextFunction, Request, Response } from 'express'
import sessionInfoDao from '@/business/sessionInfo/sessionInfo.dao'
import { SessionInfoProps } from '@/modules/sessionInfo/sessionInfo'
import { UserFilter, UserProps } from '@/modules/user/user'
import UserStore from '@/modules/user/user.store'
import LocalAuthStore from '@/business/auth/local/local-auth.store'
import AppError from '@/lib/error'

/**
 * 登录
 */
export async function signIn(req: Request, res: Response, next: NextFunction) {
  const signInProfile = _.pick(req.body, LocalAuthStore.theSignInKeys())

  // 验证表单
  if (!signInProfile.email || !signInProfile.password)
    return next(new AppError({ httpCode: 400, message: '邮箱或密码未填写' }))

  // 查询用户
  const findUserFilter: UserFilter = {
    email: signInProfile.email,
    deleted: { $ne: true }
  }
  const [err, user] = await callAsync(UserDao.findOne(findUserFilter, null, { lean: true }))
  if (err) return next(err)
  if (!user) return next(new AppError({ httpCode: 401, message: '邮箱或密码错误' }))

  // 密码验证
  const salt = user.salt
  const enPass = utils.md5(salt + signInProfile.password)
  if (enPass !== user.password) return next(new AppError({ httpCode: 401, message: '邮箱或密码错误' }))

  if (user.disabled) {
    req.logout(function (err: any) {
      if (err) console.log('登录失败，用户已禁用')
      return next(new AppError({ httpCode: 400, message: '登录失败，用户已禁用' }))
    })
  }

  req.login(user, async (error: any) => {
    if (error) return next(new AppError({ httpCode: 500, message: `登录失败 => ${err}` }))

    //  记录sessionInfo
    const SessionInfoProps: SessionInfoProps = {
      sessionId: req.sessionID,
      userId: req.user._id,
      expireAt: req.session.cookie._expires,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    }
    const [createSessionInfoErr, sessionInfo] = await callAsync(sessionInfoDao.create(SessionInfoProps))
    if (createSessionInfoErr) console.log(`记录sessionInfo失败：${createSessionInfoErr}`)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    process.eventEmitter.emit('signIn', user, sessionInfo)

    const profile = _.pick(user, UserStore.theProfileKeys())

    res.json(profile)
  })
}

/**
 * 注册
 */
export async function signUp(req: Request, res: Response, next: NextFunction) {
  const signUpProfile = _.pick(req.body, 'email', 'password', 'username', 'nickname')
  if (!signUpProfile.email || !signUpProfile.password || !signUpProfile.username)
    return next(new AppError({ httpCode: 400, message: '信息填写不全' }))

  const salt = utils.genRandom()
  const password = utils.md5(salt + signUpProfile.password)

  const newUserDoc: UserProps = {
    password,
    salt,
    email: signUpProfile.email,
    username: signUpProfile.username,
    nickname: signUpProfile.nickname,
    roles: ['user']
  }

  const [err, user] = await callAsync(UserDao.create(newUserDoc))
  if (err) return next(new AppError({ message: `注册失败 => ${err}` }))

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  process.eventEmitter.emit('signUp', user)

  res.sendStatus(200)
}

/**
 * 登出
 */
export async function signOut(req: Request, res: Response) {
  const [err, session] = await callAsync(sessionInfoDao.findOneAndDelete({ sessionId: req.sessionID }))
  if (err) return console.log('sessionInfo销毁失败')

  req.session.destroy((err: any) => {
    if (err) console.log('session销毁失败')
  })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  process.eventEmitter.emit('signOut', req.user, session)

  req.logout(() => {
    res.sendStatus(200)
  })
}

/**
 * 获取版本信息
 */
export function getVersionInfo(req: Request, res: Response) {
  return res.send('0.0.1 (dev)')
}
