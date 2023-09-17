import * as http from 'http'
import { AddressInfo } from 'node:net'

// ts编译之后不会处理ts文件中的路径映射，需要借助module-alias解析编译后js文件中的路径别名。
/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moduleAlias = require('module-alias')
moduleAlias.addAlias('@', __dirname)

import express from 'express'
import config from '@/_config/config'
import { initApp } from '@/loaders'
import logger from '@/lib/utils/logger'

/**
 * 监听端口，启动服务
 * @param config 应用程序的配置
 * @returns 运行中的服务
 */
async function launchServer(config: App.Config): Promise<http.Server> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const app: express.Express = new express()

  await initApp(app, config)

  const server = app.listen(config.port, () =>
    logger.info(`web服务器已启动，监听端口: ${(server.address() as AddressInfo).port}`, { label: 'App' })
  )

  return server
}

launchServer(config)

export { launchServer }
