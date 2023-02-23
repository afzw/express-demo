/** 加载路径别名机制 */
require('module-alias/register')

import { AddressInfo } from 'node:net'
import express from 'express'
import 'reflect-metadata'

import config from '@/config/config'
import initLoaders from '@/loaders'
import logger from '@/lib/utils/logger'
import { InversifyExpressServer } from 'inversify-express-utils'
import { container } from '@/inversify.config'

/** 程序启动函数 */
async function launchApp() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const expressApp: express.Express = new express()

  await initLoaders(expressApp)

  const inversifyServerr = new InversifyExpressServer(container, null, null, expressApp)

  const app = inversifyServerr.build()

  const server = app.listen(config.port, async () => {
    logger.info(`web服务器已启动，监听端口: ${(server.address() as AddressInfo).port}`, { label: 'App' })
  })
}

launchApp()

export { launchApp }
