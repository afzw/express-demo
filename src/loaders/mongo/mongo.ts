import mongoose from 'mongoose'

/**
 * 连接mongo数据库
 */

export function getMongoUri(conf: App.Config['mongo']) {
  if (!conf.port) conf.port = 27017
  if (conf.uri) return conf.uri
  else if (conf.username && conf.password)
    return `mongodb://${conf.username}:${conf.password}@${conf.host}:${conf.port}/${conf.name}?authSource=admin`
  else return `mongodb://${conf.host}:${conf.port}/${conf.name}`
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 监听 Mongoose 事件
 * 如果mongoose服务停止触发error事件但此时connection对象下的readyState依然为1代表已连接故不会触发mongoose的自动重连
 * 在监听到error事件后需要将连接关闭，此时连接设置autoReconnect为true时会触发自动重连
 */
export function listenMongoEvent() {
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
