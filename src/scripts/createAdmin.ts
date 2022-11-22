import utils from "@/src/lib/utils/common"
import { UserDoc } from "@/src/modules/user/user.schema";
import * as userDao from '@/src/modules/user/user.dao'

/**
 * @fileoverview 【默认脚本】创建系统管理员
 */
exports.start = async function start () {
  const initPassword = '123456' //  管理员初始密码
  const salt = utils.genRandom()

  const adminDoc: UserDoc = {
    email: 'admin@example.com',
    username: 'admin',
    salt,
    password: utils.md5(salt + initPassword),
    nickname: '系统管理员',
    roles: ['admin']
  }

  return userDao.findUserAndUpdate({ username: 'admin' }, adminDoc, { upsert: true, new: false })
}