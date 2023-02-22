/** 加载路径别名机制 */
require('module-alias/register')

import { AddressInfo } from 'node:net'
import express from 'express'

import config from '@/config/config'
import initLoaders from '@/loaders'
import logger from '@/lib/utils/logger'
import { InversifyExpressServer } from 'inversify-express-utils'
import { container } from './inversify.config'
import registerRouter from './loaders/router/register'
import __moduleRoutes from './loaders/router/module.route'

/** 程序启动函数 */
async function launchApp() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const app: express.Express = new express()
  await initLoaders(app)

  const serverr = new InversifyExpressServer(container, null, null, app)

  const test = serverr.build()
  // await initLoaders(test)

  const final = test.listen(config.port, async () => {
    logger.info(`web服务器已启动，监听端口: ${(final.address() as AddressInfo).port}`, { label: 'App' })
  })
}

launchApp()

export { launchApp }
