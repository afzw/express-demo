import { SessionInfoModel } from '@/modules/sessionInfo/sessionInfo.model'
import { MongooseBase } from '@/components/mongoose'

class SessionInfoDao extends MongooseBase {}

const sessionInfoDao = new SessionInfoDao(SessionInfoModel)

export default sessionInfoDao
