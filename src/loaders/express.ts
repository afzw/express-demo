import express from 'express'
import morgan from 'morgan'
import compression from 'compression'
import bodyParser from 'body-parser'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import dayjs from 'dayjs'
import MongoStore from 'connect-mongo'

import config from '@/_config/config'
import { permissionValidatorRegister } from '@/loaders/rbac/validator'
import { getMongoUri } from '@/loaders/mongo/mongo'
import { localSerialize, localDeserialize } from '@/loaders/auth/local-auth.service'

/**
 * 【初始化】加载express程序
 * @param app 初始的express程序
 */
function loadExpress(app: express.Express) {
  app.set('x-powered-by', false)
  app.set('trust proxy', ['1', 'true'].includes(process.env.TRUST_PROXY))

  /** 配置express静态资源目录 */
  app.use(express.static(config.publicDir))
  /** HTTP request logger */
  morgan.token('date', () => dayjs().format('YYYY/MM/DD HH:mm:ss'))
  app.use(morgan(':date :method :url -- [:status] :response-time ms'))
  /** 压缩response */
  app.use(compression())
  /** 跨域资源共享 */
  app.use(cors())
  /** 请求体解析 - 非form-data （form-data使用`multer`解析） */
  app.use(bodyParser.json({ limit: '10mb' })) // 解析application/json
  app.use(bodyParser.urlencoded({ limit: '2mb', extended: true })) // 解析application/x-www-form-urlencoded
  /** 使用mongo存储session */
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
  /** 使用passport进行身份认证 */
  app.use(passport.initialize())
  app.use(passport.session())
  /** passport 本地策略 */
  passport.serializeUser(localSerialize)
  passport.deserializeUser(localDeserialize)
  /** 注册权限校验器 */
  app.use(permissionValidatorRegister)
}

export default loadExpress
