import { SessionInfoModel } from '@/entities/sessionInfo.model'
import { MongooseBase } from '@/dao/utils'

class SessionInfoDao extends MongooseBase {}

const sessionInfoDao = new SessionInfoDao(SessionInfoModel)

export default sessionInfoDao
