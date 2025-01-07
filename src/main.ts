import express from "express"
import { config, Config } from "./config/config"
import * as http from "http"
import { initApp } from "./boot/app"

// ts编译之后不会处理ts文件中的路径映射，需要借助module-alias解析编译后js文件中的路径别名。
/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moduleAlias = require('module-alias')
moduleAlias.addAlias('@', __dirname)

async function launchServer(config: Config): Promise<http.Server> {
  const app: express.Express = express()

  initApp(app, config)

  const server = app.listen(config.port, () => {
    console.log(`web服务器已启动，监听端口: ${config.port}`)}
  )

  return server
}

launchServer(config)

export { launchServer }