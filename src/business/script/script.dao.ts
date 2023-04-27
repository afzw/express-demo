import ScriptModel from '@/modules/script/script.model'
import { MongooseBase } from '@/components/mongoose'
import { ScriptProps } from '@/modules/script/script'

class ScriptDao extends MongooseBase<ScriptProps> {}

const scriptDao = new ScriptDao(ScriptModel)

export default scriptDao
