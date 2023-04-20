import ScriptModel from './script.model'
import { MongooseBase } from '@/components/mongoose'

class ScriptDao extends MongooseBase {}

const scriptDao = new ScriptDao(ScriptModel)

export default scriptDao
