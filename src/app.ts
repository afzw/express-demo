require('module-alias/register') //  路径别名，在package.json中配置。

import * as http from 'http'
import { AddressInfo } from 'node:net'
import express from 'express'

import config from '@/config/config' //  加载软件配置文件
import initLoaders from '@/loaders'
import logger from '@/lib/utils/logger' //  日志打印

async function launchApp(options?: App.LaunchOptions, cb?: (server: http.Server) => void) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const app: express.Express = new express()

  await initLoaders(app)

  const server = app.listen(config.port, async () => {
    logger.info(`web服务器已启动，监听端口: ${(server.address() as AddressInfo).port}`, { label: 'App' })
    if (cb) cb(server)
  })
}

launchApp()

export { launchApp }
