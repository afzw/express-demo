import _ from 'lodash'
import { callAsync } from '@/lib/callAsync'
import UserDao from '@/dao/user.dao'
import { NextFunction, Request, Response } from 'express'
import sessionInfoDao from '@/dao/sessionInfo.dao'
import { SessionInfoProps } from '@/entities/sessionInfo.model'
import { UserFilter, UserProps } from '@/entities/auth/user.model'
import { LocalAuthStore } from '@/business/auth/local/local-auth.store'
import { AppError } from '@/lib/error'
import { genRandom32BitsHexString, genPBK } from '@/lib/encryption/crypto'
import { Types } from 'mongoose'

interface LoginInfo {
  email: string
  password: string
}

type RegisterInfo = LoginInfo

class LocalAuthController {
  public static async login(req: Request<null, UserProps, LoginInfo>, res: Response, next: NextFunction) {
    const loginInfo = _.pick(req.body, LocalAuthStore.theLoginInfoKeys())
    if (!loginInfo.email || !loginInfo.password) {
      return next(new AppError({ statusCode: 400, message: '邮箱或密码未填写' }))
    }

    // 验证用户
    const userFilter: UserFilter = { email: loginInfo.email }
    const [findUserErr, user] = await callAsync(UserDao.findOne(userFilter, null, { lean: true }))
    if (findUserErr) return next(new AppError({ message: `查询用户失败 => ${findUserErr}` }))
    if (!user) return next(new AppError({ statusCode: 401, message: '邮箱或密码错误' }))
    const enPass = genPBK(loginInfo.password, user.salt)
    if (enPass !== user.password) return next(new AppError({ statusCode: 401, message: '邮箱或密码错误' }))

    req.login(user, async (error: unknown) => {
      if (error) return next(new AppError({ message: `登录失败 => ${error}` }))

      const sessionInfoProps: SessionInfoProps = {
        sessionId: req.session.id,
        userId: new Types.ObjectId(req.user._id),
        expireAt: req.session.cookie.expires,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent']
      }
      const [createSessionInfoErr] = await callAsync(sessionInfoDao.create(sessionInfoProps))
      if (createSessionInfoErr) console.log(`记录sessionInfo失败 => ${createSessionInfoErr}`)

      return res.sendStatus(200)
    })
  }

  public static async register(req: Request<null, UserProps, RegisterInfo>, res: Response, next: NextFunction) {
    const registerInfo = _.pick(req.body, LocalAuthStore.theRegisterInfoKeys())

    // 验证信息
    if (!registerInfo.email || !registerInfo.password)
      return next(new AppError({ statusCode: 400, message: '信息填写不全' }))
    const verifyFilter: UserFilter = { email: registerInfo.email }
    const [verifyErr, conflictedUser] = await callAsync(UserDao.findOne(verifyFilter))
    if (verifyErr) return next(new AppError({ message: `信息验证失败 => ${verifyErr}` }))
    if (conflictedUser) return next(new AppError({ statusCode: 400, message: '邮箱已被占用' }))

    const salt = genRandom32BitsHexString()
    const password = genPBK(registerInfo.password, salt)

    const newUserProps: Partial<UserProps> = {
      email: registerInfo.email,
      password,
      salt
    }
    const [createUserErr] = await callAsync(UserDao.create(newUserProps))
    if (createUserErr) return next(new AppError({ message: `创建用户失败 => ${createUserErr} ` }))

    return res.sendStatus(200)
  }

  public static async logout(req: Request<null, number, null>, res: Response, next: NextFunction) {
    req.session.destroy((err: unknown) => {
      if (err) return next(new AppError({ message: `登出失败 => ${err}` }))
    })

    const [deleteSessionInfoErr] = await callAsync(sessionInfoDao.findOneAndDelete({ sessionId: req.sessionID }))
    if (deleteSessionInfoErr) console.log(`sessionInfo删除失败 => ${deleteSessionInfoErr}`)

    req.logout(() => {
      res.sendStatus(200)
    })
  }
}

export { LocalAuthController }
