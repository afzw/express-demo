import express from 'express'
import morgan from 'morgan'
import compression from 'compression'
import bodyParser from 'body-parser'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import dayjs from 'dayjs'
import { Redis } from 'ioredis'
import RedisStore from 'connect-redis'

import { config } from '@/_config/config'
import { localSerialize, localDeserialize } from '@/loaders/auth/local-auth'

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
  /** 日志记录 */
  app.use(morgan(':date :method :url -- [:status] :response-time ms'))
  /** response压缩 */
  app.use(compression())
  /** 跨域资源共享 */
  app.use(cors())
  /** 请求体解析（form-data使用`multer`解析） */
  app.use(bodyParser.json({ limit: '10mb' })) // 解析application/json
  app.use(bodyParser.urlencoded({ limit: '2mb', extended: true })) // 解析application/x-www-form-urlencoded
  const redisClient = new Redis(config.redis)
  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'express-demo:'
  })
  /** 使用redis存储session */
  app.use(
    session({
      name: config.session.name,
      secret: config.session.secret,
      store: redisStore,
      cookie: {
        maxAge: config.session.expireDays * 24 * 60 * 60 * 1000
      },
      resave: false,
      saveUninitialized: false
    })
  )
  /** 使用passport进行身份认证 */
  app.use(passport.initialize())
  app.use(passport.session())
  /** passport 本地策略 */
  passport.serializeUser(localSerialize)
  passport.deserializeUser(localDeserialize)
}

export default loadExpress
