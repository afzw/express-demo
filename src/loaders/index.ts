import express from 'express'
import loadMongoDB from './mongo'
import loadExpress from './express'
import loadRouters from './router'
import { executScripts } from './script'
import { makeLogDir } from './log'
import Schedule from './schedule'

/**
 * 初始化服务
 * @param app 应用程序
 */
async function initApp(app: express.Express, config: App.Config) {
  // 资源初始化
  await makeLogDir()

  // 程序依赖模块加载
  await loadMongoDB(config.mongo)
  loadExpress(app)
  loadRouters(app)

  // 业务逻辑初始化
  await executScripts(config.scriptDir)

  // 定时任务
  const schedule = new Schedule()
  schedule.cleanSession()
  schedule.cleanLog()
}

export { initApp }
