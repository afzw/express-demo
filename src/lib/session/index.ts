import { SessionInfoDoc } from "@/components/sessionInfo/sessionInfo.schema"
import * as sessionInfoDao from '@/components/sessionInfo/sessionInfo.dao'
import { callAsync } from "@/lib/utils/callAsync"

/**
 * 用户登录，记录sessionInfo
 */
export async function saveSessionInfo (req: any) {
  const sessionInfoDoc: SessionInfoDoc = {
    sessionId: req.sessionID,
    userId: req.user._id,
    expireAt: req.session.cookie._expires,
    ipAddress: req.ip,
    userAgent: req.headers['user-agent'],
  }
  const [createSessionInfoErr, sessionInfo] = await callAsync(sessionInfoDao.create(sessionInfoDoc))
  if (createSessionInfoErr) console.log(`记录sessionInfo失败：${createSessionInfoErr}`)
  return sessionInfo
}

/**
 * 定期清理过期会话
 */
export function sessionExpireCheck () {
  setInterval(function() {
    sessionInfoDao.removeExpired(function(err) {
      if (err) console.log('删除过期会话失败', err);
    });
  }, 10 * 60 * 1000);
}