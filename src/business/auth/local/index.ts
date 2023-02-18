import _ from 'lodash'
import utils from '@/lib/utils/common'
import { callAsync } from '@/lib/utils/callAsync'
import UserDao from '@/modules/user/user.dao'
import { UserDoc, UserDocPojo, UserFilter, UserProps } from '@/modules/user/user'
import LocalAuthStore from './local.store'
import { generateNumericUUID } from '@/lib/utils/crypto'

/** 本地认证服务 */
class LocalAuthService {
  /**
   * 本地认证策略 - 登录
   * @param signInInfo 登录信息
   */
  public static async signIn(signInInfo: Ctx.Body): Promise<UserDocPojo> {
    const signInProps = _.pick(signInInfo, LocalAuthStore.theSignInKeys())

    if (!signInProps.email || !signInProps.password) throw new Error('邮箱或密码未填写')

    const findUserFilter: UserFilter = {
      email: signInProps.email,
      deleted: { $ne: true }
    }
    const [err, user] = await callAsync(UserDao.findOnePojoByFilter(findUserFilter))
    if (err) throw new Error(`数据库查询用户失败 => ${err}`)
    if (!user) throw new Error('邮箱或密码错误')

    const salt = user.salt
    const enPass = utils.md5(salt + signInProps.password)
    if (enPass !== user.password) throw new Error('邮箱或密码错误')

    return user
  }

  /**
   * 本地认证策略 - 注册
   * @param signUpInfo 注册信息
   */
  public static async signUp(signUpInfo: Ctx.Body): Promise<UserDoc> {
    const signUpProps = _.pick(signUpInfo, LocalAuthStore.theSignUpKeys())

    if (!signUpProps.email || !signUpProps.password) throw new Error('信息填写不全')

    const salt = utils.genRandom()
    const password = utils.md5(salt + signUpProps.password)

    const newUserDoc: UserProps = {
      password,
      salt,
      email: signUpProps.email,
      username: signUpProps.email,
      nickname: `用户${generateNumericUUID()}`,
      roles: ['user'],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const [err, user] = await callAsync(UserDao.create(newUserDoc))
    if (err) throw new Error(`注册失败 => ${err}`)

    return user
  }
}

export default LocalAuthService
