/** FTP */
declare namespace FTP {
  /** FTP服务器信息 */
  interface ServerInfo {
    /** 服务器地址 */
    host: string
    /** 服务器FTP协议端口 */
    port: number
    /** 服务器用户名 */
    user: string
    /** 用户密码 */
    password: string
  }
}
