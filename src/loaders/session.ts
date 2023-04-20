import sessionInfoDao from '@/business/sessionInfo/sessionInfo.dao'

/**
 * 定期清理过期会话
 */
export function sessionCleaner() {
  const filter = { expireAt: { $lt: new Date() } }
  setInterval(function () {
    sessionInfoDao.deleteMany(filter).catch((err: unknown) => console.log(`删除过期会话失败 => ${err}`))
  }, 10 * 60 * 1000)
}
