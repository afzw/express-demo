import _ from 'lodash'
import crypto from 'crypto'

export default {
  /**
   * 判断字符串是否为mongodb的ObjectId形式。
   * @param str 字符串
   */
  isObjectId(str: any) {
    if (!str) return
    return String(str).match(/[0-9a-zA-Z]{24}/)
  },

  /**
   * 将字符串解析为JSON格式。
   * @param str 字符串
   */
  parseJson(str: string) {
    if (_.isObject(str)) return str

    try {
      return JSON.parse(str)
    } catch (err) {
      console.log(err)
      return {}
    }
  },

  /**
   * MD5加密字符串。
   * @param str 字符串
   */
  md5(str: string) {
    // @ts-ignore
    return crypto.createHash('md5').update(str, 'utf-8').digest('hex')
  },

  /**
   * 生成随机数
   */
  genRandom() {
    return crypto.randomBytes(16).toString('hex')
  }
}
