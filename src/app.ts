require('module-alias/register') //  路径别名

import path from 'path'
import * as http from 'http'
import { AddressInfo } from 'node:net'

// 程序启动相关
import '@/modules/user/user.model' // 优先编译用户表
import config from '@/config/config' //  加载软件配置文件
import { initRoles, permissionHandler } from '@/loaders/rbac' //  初始化系统权限&系统角色
import { connectMongoDB, disconnectMongoDB, getMongoUri } from '@/loaders/mongo' //  数据库连接
import { initRouters } from '@/loaders/router/router.init' //  路由初始化
import { sessionExpireCheck } from '@/loaders/session' // session
import { startScript } from '@/loaders/script' //  脚本自动执行
import { localSerialize, localDeserialize } from '@/loaders/auth/local_auth/local_auth.service' //  Passport序列化/反序列化

// 库
import express from 'express'
import multer from 'multer'
import morgan from 'morgan'
import compression from 'compression'
import bodyParser from 'body-parser'
import session from 'express-session'
import passport from 'passport'
import moment from 'moment'
import MongoStore from 'connect-mongo'
import logger from '@/lib/utils/logger' //  日志打印
import { initProcessEventEmitter } from '@/lib/process' // 事件监听

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const app: express.Express = new express()
app.set('x-powered-by', false)
app.set('trust proxy', ['1', 'true'].includes(process.env.TRUST_PROXY))

/**
 * 程序启动函数
 */
function launchApp(options?: App.LaunchOptions, cb?: (server: http.Server) => void) {
  /* 配置中间件（注意中间件顺序） */
  app.use(multer({ dest: config.uploadDir }).any()) // multer上传文件目录
  app.use(express.static(config.staticDir)) // 静态资源目录
  morgan.token('date', () => moment().format('YYYY/MM/DD HH:mm:ss'))
  app.use(morgan(':date :method :url -- [:status] :response-time ms'))
  app.use(compression())
  app.use(bodyParser.json({ limit: '10mb' })) //  解析req.body
  app.use(bodyParser.urlencoded({ limit: '2mb', extended: true }))
  app.use(
    session({
      name: config.session.name,
      secret: config.session.name,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: getMongoUri(config.mongo) }),
      cookie: { maxAge: config.session.expireDays * 24 * 60 * 60 * 1000 }
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())
  passport.serializeUser(localSerialize)
  passport.deserializeUser(localDeserialize)
  app.use(permissionHandler)

  /* 初始化系统权限和角色 */
  initRoles()

  /* 初始化路由 */
  initRouters(app)

  /* 连接数据库 */
  connectMongoDB(config.mongo, (err: unknown) => {
    if (err) {
      console.log(err)
      process.exit(1)
    }
    //  监听端口，服务启动
    const server = app.listen(10240, () => {
      logger.info(`web服务器已启动，监听端口: ${(server.address() as AddressInfo).port}`, { label: 'App' })
      startScript(path.join(__dirname, 'scripts')) //  执行脚本
      sessionExpireCheck() // 检查过期session
      if (cb) cb(server)
    })
  })
}

/**
 * 程序结束函数
 */
function endApp(cb: (error?: unknown) => void): void {
  disconnectMongoDB(cb)
  return
}

// 监听程序事件
initProcessEventEmitter()

// 程序启动
launchApp()

export { launchApp, endApp }
