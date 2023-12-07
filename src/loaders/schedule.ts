import SessionInfoDao from '@/dao/sessionInfo.dao'
import { config } from '@/_config/config'
import { exec } from 'child_process'
import schedule from 'node-schedule'

/** 清理sessionInfo的 计时规则 */
const CLEANSESSIONCORN = '* 0 * * * *'
/** 清理日志文件的 计时规则 */
const CLEANLOGCORN = '* * 0 * * *'
/** 清理日志文件命令 */
const CLEANLOGCOMMAND = `find ${config.logDir} -type f -mtime +15 -delete `

/** 定时任务 */
class Schedule {
  /**
   * 定时清理sessionInfo
   * @description 每小时清理一次
   */
  public cleanSession() {
    const filter = { expireAt: { $lt: new Date() } }
    schedule.scheduleJob(CLEANSESSIONCORN, () =>
      SessionInfoDao.deleteMany(filter).catch(err => console.log(`删除过期sessionInfo失败 => ${err}`))
    )
  }

  /**
   * 定时清理日志文件
   * @description 每天清理一次，清理15天前的日志文件。
   */
  public cleanLog() {
    schedule.scheduleJob(CLEANLOGCORN, () => {
      exec(CLEANLOGCOMMAND)
    })
  }
}

export default Schedule
