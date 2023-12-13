/**
 * 将cookie字符串转为Map
 * @param {string} cookieStr - cookie字符串
 * @returns {Map} cookie Map
 */
export function cookieStr2Map(cookieStr: string): Map<string, string> {
  const cookie = new Map<string, string>()
  cookieStr.split(';').forEach(item => {
    if (!item) return
    const kv = item.split('=')
    const key = kv[0].trim()
    const val = kv[1].trim()
    cookie.set(key, val)
  })

  return cookie
}
