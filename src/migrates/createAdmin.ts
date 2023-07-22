// ts编译之后不会处理ts文件中的路径映射，需要借助module-alias解析编译后js文件中的路径别名。
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moduleAlias = require('module-alias')
moduleAlias.addAlias('@', './src/')

import utils from '@/lib/utils/common'
import { UserProps } from '@/entities/user.model'
import UserDao from '@/dao/user.dao'

/**
 * @fileoverview 【默认脚本】创建系统管理员
 */
exports.start = async function start() {
  const initPassword = '123456' //  管理员初始密码
  const salt = utils.genRandom()

  const adminDoc: Partial<UserProps> = {
    email: 'admin@example.com',
    username: 'admin',
    salt,
    password: utils.md5(salt + initPassword),
    nickname: '系统管理员',
    roles: ['admin', 'user']
  }

  return UserDao.findOneAndUpdate({ username: 'admin' }, adminDoc, {
    upsert: true,
    new: false
  })
}
