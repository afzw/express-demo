// ts编译之后不会处理ts文件中的路径映射，需要借助module-alias解析编译后js文件中的路径别名。
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moduleAlias = require('module-alias')
moduleAlias.addAlias('@', '..')

import { UserProps } from '@/entities/auth/user.model'
import UserDao from '@/dao/user.dao'
import { genRandom32BitsHexString, genPBK, encryptStringUsingSH512 } from '@/lib/encryption/crypto'

/**
 * @fileoverview 【默认脚本】创建系统管理员
 */
exports.start = async function start() {
  const initPassword = '123456' //  管理员初始密码
  const encryptedPwd = encryptStringUsingSH512(initPassword)
  const salt = genRandom32BitsHexString()
  const password = genPBK(encryptedPwd, salt)

  const adminDoc: Partial<UserProps> = {
    email: 'admin@example.com',
    role: 'admin',
    salt,
    password
  }

  return UserDao.findOneAndUpdate({ email: 'admin@example.com' }, adminDoc, {
    upsert: true,
    new: false
  })
}
