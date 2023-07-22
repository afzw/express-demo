import path from 'path'

const config: App.Config = {
  port: 10240,
  publicDir: path.join(__dirname, '../..', 'public'),
  assetsDir: path.join(__dirname, '../../', 'assets'),
  uploadDir: path.join(__dirname, '../..', 'uploads'),
  logDir: path.join(__dirname, '../..', 'logs'),
  scriptDir: path.join(__dirname, '..', '_scripts'),
  session: {
    name: 'ExpressDemo-sid',
    secret: 'Secret Password For ExpressDemo',
    expireDays: 7,
    maxPerUser: 0
  },
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
if (process.env.SESSION_SECRET) config.session.secret = process.env.SESSION_SECRET
if (process.env.SESSION_EXPIRE_DATY) config.session.expireDays = Number(process.env.SESSION_EXPIRE_DATY)
if (process.env.SESSION_MAX_PER_USER) config.session.maxPerUser = Number(process.env.SESSION_MAX_PER_USER)

if (process.env.MONGO_NAME) config.mongo.name = process.env.MONGO_NAME
if (process.env.MONGO_HOST) config.mongo.host = process.env.MONGO_HOST
if (process.env.MONGO_PORT) config.mongo.port = Number(process.env.MONGO_PORT)
if (process.env.MONGO_DEBUG) config.mongo.debug = Boolean(process.env.MONGO_DEBUG)
if (process.env.MONGO_USERNAME) config.mongo.username = process.env.MONGO_USERNAME
if (process.env.MONGO_PASSWORD) config.mongo.password = process.env.MONGO_PASSWORD
if (process.env.MONGO_URI) config.mongo.uri = process.env.MONGO_URI

export default config
