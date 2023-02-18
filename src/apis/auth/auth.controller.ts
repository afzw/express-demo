/**
 * @file 公共路由控制器
 */
import _ from 'lodash'
import { callAsync } from '@/lib/utils/callAsync'
import { Request, Response, NextFunction } from 'express'
import sessionInfoDao from '@/modules/sessionInfo/sessionInfo.dao'
import { SessionInfoProps } from '@/modules/sessionInfo/sessionInfo'
import UserStore from '@/business/user/user.store'
import LocalAuthService from '@/business/auth/local'

/**
 * 登录
 */
export async function signIn(req: Request, res: Response, next: NextFunction) {
  const signInInfo: Ctx.Body = req.body

  const [errAuth, user] = await callAsync(LocalAuthService.signIn(signInInfo))
  if (errAuth) return next({ code: 500, title: '认证失败', err: errAuth })

  if (user.disabled) {
    req.logout(function (err: any) {
      if (err) console.log('登录失败，用户已禁用')
      return next({ code: 400, title: '登录失败，用户已禁用' })
    })
  }

  req.login(user, async (error: any) => {
    if (error) return next({ code: 500, title: '登录失败，系统错误', err: error })

    //  记录sessionInfo
    const SessionInfoProps: SessionInfoProps = {
      sessionId: req.sessionID,
      userId: req.user._id,
      expireAt: req.session.cookie._expires,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const [createSessionInfoErr, sessionInfo] = await callAsync(sessionInfoDao.create(SessionInfoProps))
    if (createSessionInfoErr) console.log(`记录sessionInfo失败：${createSessionInfoErr}`)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    process.eventEmitter.emit('signIn', user, sessionInfo)

    const profile = _.pick(user, UserStore.theProfileKeys())

    return res.json(profile)
  })
}

/**
 * 注册
 */
export async function signUp(req: Request, res: Response, next: NextFunction) {
  const signUpInfo: Ctx.Body = req.body

  const [errSignUp, user] = await callAsync(LocalAuthService.signUp(signUpInfo))
  if (errSignUp) return next({ code: 500, title: '注册失败', err: errSignUp })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  process.eventEmitter.emit('signUp', user)

  return res.sendStatus(200)
}

/**
 * 登出
 */
export async function signOut(req: Request, res: Response) {
  const [err, session] = await callAsync(sessionInfoDao.findOneDocAndDelete({ sessionId: req.sessionID }))
  if (err) console.log('sessionInfo销毁失败')

  req.session.destroy((err: any) => {
    if (err) console.log('session销毁失败')
  })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  process.eventEmitter.emit('signOut', req.user, session)

  req.logout(() => {
    return res.sendStatus(200)
  })
}
