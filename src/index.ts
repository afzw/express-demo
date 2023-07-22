// ts编译之后不会处理ts文件中的路径映射，需要借助module-alias解析编译后js文件中的路径别名。
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moduleAlias = require('module-alias')
moduleAlias.addAlias('@', __dirname)

import { AddressInfo } from 'node:net'
import express from 'express'
import * as http from 'http'

import config from '@/_config/config'
import initLoaders from '@/loaders'
import logger from '@/lib/utils/logger'

async function launchServer(config: App.Config): Promise<http.Server> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const app: express.Express = new express()

  await initLoaders(app, config)

  const server = app.listen(config.port, () =>
    logger.info(`web服务器已启动，监听端口: ${(server.address() as AddressInfo).port}`, { label: 'App' })
  )

  return server
}

launchServer(config)

export { launchServer }
