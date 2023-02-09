import { loadMongoDB } from './mongo'
import config from '@/config/config'
import express from 'express'
import loadExpress from './express'
import loadRbac from './rbac'
import loadRouters from './router'
import loadEventEmitter from './eventEmitter'
import { sessionCleaner } from './session'
import { executScripts } from './script'
import path from 'path'

/** 程序初始化加载器 */
async function initLoaders(app: express.Express) {
  await loadMongoDB(config.mongo)
  loadExpress(app)
  loadRouters(app)
  loadRbac()
  loadEventEmitter()

  sessionCleaner()
  await executScripts(path.join(__dirname, '..', 'scripts')) //  执行脚本
}

export default initLoaders
