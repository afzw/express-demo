import mongoose from 'mongoose'
import callAsync from '@/lib/utils/callAsync'
import logger from '@/lib/utils/logger'
import { getMongoUri, listenMongoEvent, sleep } from './mongo'

async function loadMongoDB(mongoConifg: App.Config['mongo']) {
  const uri = getMongoUri(mongoConifg)

  logger.print(6, `开始连接 Mongo 数据库: ${uri.replace(/:.*@/, ':****@')}`, { label: 'MONGO' })

  // eslint-disable-next-line no-constant-condition
  while (true) {
    // 尝试解决 topology was destroyed
    // 问题来源似乎是数据库连接长时间未使用导致数据库挂起
    const [err] = await callAsync(mongoose.connect(uri))
    if (err) {
      logger.print(3, `连接 Mongo 数据库失败: ${err.message}`, { label: 'MONGO' })
    } else {
      logger.setConnect(true)
      logger.print(6, '连接 Mongo 数据库成功', { label: 'MONGO' })
      break
    }

    // 连接失败，mongoose不会自动重试，需手动重试
    console.info('即将重试...')

    await sleep(10 * 1000)
  }

  listenMongoEvent()
}

export default loadMongoDB
