import path from 'path'
import { callAsync } from '@/lib/callAsync'
import { logger } from '@/lib/logger'
import { readdirp } from '@/lib/fs/read'
import ScriptDao from '@/dao/script.dao'

/**
 * 执行脚本
 * @param scriptDir 脚本目录的绝对路径
 */
export async function executScripts(scriptDir: string): Promise<void> {
  if (!scriptDir) return

  /** 脚本总数 */
  let totalCount = 0
  /** 本次执行脚本数 */
  let doingCount = 0

  const [readDirErr, files] = await callAsync(readdirp(scriptDir))
  if (readDirErr)
    return logger.error(`脚本执行失败：读取${scriptDir}目录错误！详情：${readDirErr}`, { label: 'Script' })
  if (!files.length) return

  for (const file of files) {
    const name = path.basename(file, path.extname(file))
    totalCount++

    //  查询脚本执行状态
    const [queryScriptErr, script] = await callAsync(
      ScriptDao.findOneAndUpdate({ name }, { name }, { upsert: true, new: false })
    )
    if (queryScriptErr) {
      console.log(`查询脚本执行状态失败：${queryScriptErr}`)
      break
    }
    if (script) continue //  脚本已执行，继续查询下一个脚本

    //  脚本未执行，执行脚本
    console.log(`开始执行脚本${name}`)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const _script = require(`${scriptDir}/${name}`)
    const begin = Date.now()
    const [execScriptErr] = await callAsync(_script.start())
    if (execScriptErr) console.log(`脚本文件${name}执行失败:`, execScriptErr)
    else console.log(`脚本文件${name}执行完成。`)
    doingCount++

    //  更新脚本状态
    const update = {
      status: execScriptErr ? 'error' : 'done',
      duration: Date.now() - begin,
      message: execScriptErr ? execScriptErr.message || execScriptErr : null
    }
    await ScriptDao.findOneAndUpdate({ name }, update)
  }

  logger.info(
    `脚本执行完成，共有${totalCount}个迁移脚本，已经执行过${
      totalCount - doingCount
    }个脚本，本次执行${doingCount}个脚本`,
    { label: 'Script' }
  )
}
