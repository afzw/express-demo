require('module-alias/register') //  路径别名

import { AddressInfo } from 'node:net'
import express from 'express'

import config from '@/config/config' //  加载软件配置文件
import initLoaders from '@/loaders'
import logger from '@/lib/utils/logger' //  日志打印

/** 程序启动函数 */
async function launchApp() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const app: express.Express = new express()

  await initLoaders(app)

  const server = app.listen(config.port, async () => {
    logger.info(`web服务器已启动，监听端口: ${(server.address() as AddressInfo).port}`, { label: 'App' })
  })
}

launchApp()

export { launchApp }
