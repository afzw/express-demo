/**
 * 应用程序
 */
declare namespace App {
  /**
   * 权限
   */
  type Permission = string
  /**
   * 角色
   */
  type Role = Permission[]
  /**
   * 角色权限字典
   */
  interface RolesMap {
    [roleName: string]: Role
  }
  /**
   * 路由
   */
  interface Route {
    path: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    middlewares?: any[],
    permission?: string,
    threshold?: any
    csrf?: boolean
  }

  /**
   * 程序配置
   */
  interface Config {
    mongo: {
      name: string,
      username?: string,
      password?: string,
      host: string,
      port: number,
      debug: boolean
      uri?: string
    }
  }
}
