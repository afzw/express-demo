/**
 * @fileOverview 程序配置文件--示例文件
 */
import path from 'path'

const config = {
  /** 监听端口 */
  port: 10240,
  /** 前端地址 */
  frontendUrl: '',

  /** 静态资源目录 */
  staticDir: path.join(__dirname, '../../', 'assets'),
  /** 文件默认上传目录（multer上传目录） */
  uploadDir: path.join(__dirname, '../../', 'uploads'),

  /** session配置 */
  session: {
    name: 'ExpressDemo-sid',
    secret: 'Secret Password For ExpressDemo',
    expireDays: 7,
    maxPerUser: 0
  },
  /** MongoDB配置 */
  mongo: {
    name: 'ExpressDemo',
    host: '127.0.0.1',
    port: 27017,
    debug: false
    // username: '',
    // password: '',
    //  uri: '',
  }
}

//  实际部署服务时，根据服务运行环境进行动态配置
if (process.env.SESSION_NAME) config.session.name = process.env.SESSION_NAME
if (process.env.SESSION_SECRET) config.session.name = process.env.SESSION_SECRET
if (process.env.SESSION_EXPIRE_DATY) config.session.name = process.env.SESSION_EXPIRE_DATY
if (process.env.SESSION_MAX_PER_USER) config.session.name = process.env.SESSION_MAX_PER_USER

if (process.env.MONGO_NAME) config.session.name = process.env.MONGO_NAME
if (process.env.MONGO_HOST) config.session.name = process.env.MONGO_HOST
if (process.env.MONGO_PORT) config.session.name = process.env.MONGO_PORT
if (process.env.MONGO_DEBUG) config.session.name = process.env.MONGO_DEBUG
if (process.env.MONGO_USERNAME) config.session.name = process.env.MONGO_USERNAME
if (process.env.MONGO_PASSWORD) config.session.name = process.env.MONGO_PASSWORD
if (process.env.MONGO_URI) config.session.name = process.env.MONGO_URI

export default config
