import utils from "@/lib/utils/common"
import { UserProps } from "@/modules/user/user";
import UserDao from '@/modules/user/user.dao'

/**
 * @fileoverview 【默认脚本】创建系统管理员
 */
exports.start = async function start () {
  const initPassword = '123456' //  管理员初始密码
  const salt = utils.genRandom()

  const adminDoc: UserProps = {
    email: 'admin@example.com',
    username: 'admin',
    salt,
    password: utils.md5(salt + initPassword),
    nickname: '系统管理员',
    roles: ['admin', 'user']
  }

  return UserDao.findUserAndUpdate({ username: 'admin' }, adminDoc, { upsert: true, new: false })
}