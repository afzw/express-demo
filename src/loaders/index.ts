import express from 'express'
import loadMongoDB from './mongo'
import loadExpress from './express'
import initRbac from './rbac'
import loadRouters from './router'
import loadEventEmitter from './eventEmitter'
import { executScripts } from './script'
import path from 'path'
import { makeLogDir } from './log'
import Schedule from './schedule'

/** 脚本目录路径 */
const SCRIPTPATH = path.join(__dirname, '..', 'scripts')

/**
 * 初始化服务
 * @param app 应用程序
 */
async function initLoaders(app: express.Express, config: App.Config) {
  // 资源初始化
  await makeLogDir()

  // 程序依赖模块加载
  await loadMongoDB(config.mongo)
  loadExpress(app)
  loadRouters(app)
  loadEventEmitter()

  // 业务逻辑初始化
  initRbac()
  await executScripts(SCRIPTPATH)

  // 定时任务
  const schedule = new Schedule()
  schedule.cleanSession()
  schedule.cleanLog()
}

export default initLoaders
