import mongoose from 'mongoose'
import callAsync from '@/lib/utils/callAsync'
import logger from '@/lib/utils/logger'

/**
 * 连接mongo数据库
 */
export async function loadMongoDB(mongoConifg: App.Config['mongo']) {
  const uri = getMongoUri(mongoConifg)

  logInfo(`开始连接 Mongo 数据库: ${uri.replace(/:.*@/, ':****@')}`)

  // eslint-disable-next-line no-constant-condition
  while (true) {
    // 尝试解决 topology was destroyed
    // 问题来源似乎是数据库连接长时间未使用导致数据库挂起
    const [err] = await callAsync(mongoose.connect(uri))
    if (err) {
      logError(`连接 Mongo 数据库失败: ${err.message}`)
    } else {
      logger.setConnect(true)
      logInfo('连接 Mongo 数据库成功')
      break
    }

    // 连接失败，mongoose不会自动重试，需手动重试
    console.info('即将重试...')
    await sleep(10 * 1000)
  }

  listenEvent()
}

export function getMongoUri(conf: App.Config['mongo']) {
  if (!conf.port) conf.port = 27017
  if (conf.uri) return conf.uri
  else if (conf.username && conf.password)
    return `mongodb://${conf.username}:${conf.password}@${conf.host}:${conf.port}/${conf.name}?authSource=admin`
  else return `mongodb://${conf.host}:${conf.port}/${conf.name}`
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function logError(error: any) {
  return logger.print(3, error, { label: 'MONGO' })
}

function logInfo(info: any) {
  return logger.print(6, info, { label: 'MONGO' })
}

/**
 * 监听 Mongoose 事件
 * 如果mongoose服务停止触发error事件但此时connection对象下的readyState依然为1代表已连接故不会触发mongoose的自动重连
 * 在监听到error事件后需要将连接关闭，此时连接设置autoReconnect为true时会触发自动重连
 */
function listenEvent() {
  mongoose.connection.on('error', function (err) {
    console.error(`mongoose连接异常${err.message}`)
    mongoose.disconnect()
  })

  mongoose.connection.on('disconnected', function () {
    console.info('数据库连接已断开')
  })

  mongoose.connection.on('connected', function () {
    console.info('已连接到数据库')
  })
}
