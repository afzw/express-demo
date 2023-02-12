import mongoose from 'mongoose'
import callAsync from '@/lib/utils/callAsync'
import logger from '@/lib/utils/logger'
import { getMongoUri, listenMongoEvent, sleep } from './mongo'

async function loadMongoDB(mongoConifg: App.Config['mongo']) {
  const uri = getMongoUri(mongoConifg)

  logger.print(6, `开始连接 Mongo 数据库: ${uri.replace(/:.*@/, ':****@')}`, { label: 'MONGO' })

  /**
   * mongoose6中，strictQuery选项是默认开启的。
   * 此时若查询对象中出现数据模型中不存在的属性，那么会返回所有该模型下所有的mongoose文档。
   * 这显然是很不合理且极其危险的，所以此处禁用该选项，等到升级mongoose7之后，该选项会默认关闭，届时可以删除此处代码。
   */
  mongoose.set('strictQuery', false)

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
