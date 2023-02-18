import config from '@/config/config'
import express from 'express'
import loadMongoDB from './mongo'
import { loadExpressPreConfig, loadExpressPostConfig } from './express'
import loadRbac from './rbac'
import loadExpressRouters from './router'
import loadEventEmitter from './eventEmitter'
import { sessionCleaner } from './session'
import { executScripts } from './script'
import path from 'path'

/** 程序初始化加载器 */
async function initLoaders(app: express.Express) {
  // 数据持久化相关
  await loadMongoDB(config.mongo)

  // express相关
  loadExpressPreConfig(app)
  loadExpressRouters(app)
  loadExpressPostConfig(app)

  // 消息发布/订阅
  loadEventEmitter()

  // 业务逻辑相关
  loadRbac()

  // 时效性任务
  sessionCleaner()
  await executScripts(path.join(__dirname, '..', 'scripts')) //  执行脚本
}

export default initLoaders
