import ScriptModel from '@/entities/script.model'
import { MongooseBase } from '@/dao/utils'
import { ScriptProps } from '@/entities/script.model'

class ScriptDao extends MongooseBase<ScriptProps> {}

const scriptDao = new ScriptDao(ScriptModel)

export default scriptDao
