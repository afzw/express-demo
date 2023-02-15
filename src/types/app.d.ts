/**
 * 应用程序
 */
declare namespace App {
  /**
   * 角色
   */
  interface Role {
    permissions: string[]
  }
  /**
   * 角色字典
   */
  interface RolesMap {
    [roleName: string]: Role
  }
  /**
   * 路由
   */
  interface Route {
    path: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    middlewares?: any[]
    permission?: string
    threshold?: any
    csrf?: boolean
  }

  /**
   * 程序配置
   */
  interface Config {
    mongo: {
      name: string
      username?: string
      password?: string
      host: string
      port: number
      debug: boolean
      uri?: string
    }
  }
}
