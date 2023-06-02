import ScriptModel from '@/entities/script/script.model'
import { MongooseBase } from '@/components/mongoose'
import { ScriptProps } from '@/entities/script/script'

class ScriptDao extends MongooseBase<ScriptProps> {}

const scriptDao = new ScriptDao(ScriptModel)

export default scriptDao
