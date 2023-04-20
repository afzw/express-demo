import ScriptModel from '../../modules/script/script.model'
import { MongooseBase } from '@/components/mongoose'

class ScriptDao extends MongooseBase {}

const scriptDao = new ScriptDao(ScriptModel)

export default scriptDao
