import { SessionInfoDoc } from "@/components/sessionInfo/sessionInfo.model"
import * as sessionInfoDao from '@/components/sessionInfo/sessionInfo.dao'
import { callAsync } from "@/lib/utils/callAsync"
import { Request } from "express"

/**
 * 用户登录，记录sessionInfo
 */
export async function saveSessionInfo (req: Request) {
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
