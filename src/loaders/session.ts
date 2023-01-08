import * as sessionInfoDao from "@/components/sessionInfo/sessionInfo.dao";

/**
 * 定期清理过期会话
 */
export function sessionExpireCheck() {
  setInterval(function () {
    sessionInfoDao.removeExpired(function (err) {
      if (err) console.log("删除过期会话失败", err);
    });
  }, 10 * 60 * 1000);
}
