/** 自定义全局类型声明 */
declare global {
  /** 应用程序 */
  namespace App {
    /**
     * 程序配置
     */
    interface Config {
      /** 监听端口 */
      port: number

      /** 公开资源（express静态托管）目录 */
      publicDir: string
      /** 静态资源目录 */
      assetsDir: string
      /** 系统文件上传目录 */
      uploadDir: string
      /** 日志目录 */
      logDir: string
      /** 迁移脚本目录 */
      scriptDir: string

      /** session配置 */
      session: {
        name: string
        secret: string
        expireDays: number
        maxPerUser: number
      }

      /** mongo配置 */
      mongo: {
        name: string
        username?: string
        password?: string
        host: string
        port: number
        debug: boolean
        uri?: string
      }

      /** redis配置 */
      redis: {
        host: string
        port: number
        username?: string
        password?: string
      }
    }
    /** 用户 */
    interface User {
      /** 用户id */
      _id: string
      /** 用户角色(用户类型) */
      role: string
      /** 上次活跃时间 */
      activeAt: Date
    }
    /** 角色（用户类型） */
    interface Role {
      permissions: string[]
    }
    /** 角色字典 */
    interface RolesMap {
      [roleName: string]: Role
    }
    /** 路由 */
    interface Route {
      path: string
      method: 'GET' | 'POST' | 'PUT' | 'DELETE'
      middlewares?: unknown[]
      permission?: string
    }
    /** 程序错误 */
    interface Error extends globalThis.Error {
      /** http状态码 */
      statusCode?: number
      /** 业务码 */
      businessCode?: string
    }
  }

  /** 失败响应信息 */
  interface FailedResponseInfo {
    /** 错误信息 */
    message: string
    /** 业务码 */
    businessCode: string
  }

  // 修改Express原声明
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends App.User {
      email: string
    }
    interface Request {
      user?: User
      hasPermission(permission: string): boolean
      logIn(user: User, done: (err: unknown) => void): void
    }
  }
}

export {}
