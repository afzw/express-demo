/**
 * @fileoverview Nope日志打印
 */
import os from 'os'
import moment from 'moment'

interface Options {
  label?: string
  tags?: any
}

class Logger {
  private _prefix: string = 'Express Demo' //  日志信息前缀，标识符
  private _connected: boolean = false
  private _ipAddr: string
  private levelMap = new Map([
    [0, ['Fatal', '灾难', '\x1B[41m']],
    [1, ['Alert', '警报', '\x1B[41m']],
    [2, ['Critical', '严重', '\x1B[41m']],
    [3, ['Error', '错误', '\x1B[31m']],
    [4, ['Warning', '警告', '\x1B[33m']],
    [5, ['Notice', '提醒', '\x1B[36m']],
    [6, ['Info', '信息', '\x1B[32m']],
    [7, ['Debug', '调试', '\x1B[1m']]
  ])

  constructor () {
    this._ipAddr = this.getIpAddr()
  }

  setConnect (isconnect: boolean) {
    return this._connected = isconnect
  }

  /**
   * ### 打印日志
   * 日志格式：【日志前缀】{日志等级} <时间戳> [日志标签]：日志信息
   * @param level 日志等级
   * @param message 日志信息
   * @param options 可选项
   */
  print (level: number, message: any, options: Options = {}) {
    if (!message) return

    const timestamp = moment().format('YYYY/MM/DD HH:mm:ss')
    const tags = options.label || options.tags?.join(',') || ' '

    if (message.message) message = message.message

    if (level < 7 || process.env.NODE_ENV === 'dev') {
      console.log(`\x1B[34m【${this._prefix}】\x1B[0m[${this.levelMap.get(level)[2]}${this.levelMap.get(level)[0]}\x1B[0m] {${timestamp}} ${tags ? `<${tags}>` : ``}: ${message}`)
    }
  }

  debug (message: any, options?: Options) {
    this.print(7, message, options)
  }

  info (message: any, options?: Options) {
    this.print(6, message, options)
  }

  notice (message: any, options?: Options) {
    this.print(5, message, options)
  }

  warning (message: any, options?: Options) {
    this.print(4, message, options)
  }

  error (message: any, options?: Options) {
    this.print(3, message, options)
  }

  critical (message: any, options?: Options) {
    this.print(2, message, options)
  }

  alert (message: any, options?: Options) {
    this.print(1, message, options)
  }

  fatal (message: any, options?: Options) {
    this.print(0, message, options)
  }

  /**
   * ### 获取ip地址
   */
  getIpAddr () {
    let ipv6 = ''
    const networkInterfaces = os.networkInterfaces()
    for (const key in networkInterfaces) {
      if (Object.prototype.hasOwnProperty.call(networkInterfaces, key)) {
        const addrs = networkInterfaces[key]
        for (const addr of addrs) {
          if (addr.mac !== '00:00:00:00:00:00' && !addr.internal) {
            if (addr.family === 'IPv4') {
              return addr.address
            } else {
              ipv6 = addr.address
            }
          }
        }
      }
    }

    return ipv6
  }
}

export default new Logger()
