import crypto from 'crypto'
import moment from 'moment'

/**
 * 生成24位密钥
 */
export function generate24BitsKey(): string {
  return crypto.randomBytes(100).toString('base64').replace(/[+/]/g, '').substring(0, 24);
}

/**
 * 生成数字类型唯一识别码
 */
export function generateNumericUUID(): string {
  return moment().format('YYYYMMDDHHmmssSSS') + Math.floor(Math.random() * 1000)
}