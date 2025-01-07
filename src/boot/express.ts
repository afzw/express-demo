import express from 'express'
import morgan from 'morgan'
import compression from 'compression'
import bodyParser from 'body-parser'
import cors from 'cors'
import dayjs from 'dayjs'

import { config } from '@/config/config'

/**
 * 【初始化】加载express程序
 * @param app 初始的express程序
 */
function initExpress(app: express.Express) {
  app.set('x-powered-by', false)

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
}

export { initExpress }
