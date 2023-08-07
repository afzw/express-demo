/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserDocPojo, UserProps } from '@/entities/user.model'

/** 定义/继承环境声明 */
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
      /** 文件上传目录 */
      uploadDir: string
      /** 日志目录 */
      logDir: string
      /** 迁移脚本目录 */
      migrateDir: string

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
    }
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
  }

  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends UserDocPojo {}
    interface Request {
      user?: User
      hasPermission(permission: string): boolean
      logIn(user: UserProps, done: (err: unknown) => void): void
    }
  }

  type Pojo = { [prop: string]: any }

  /** 格式化的错误 */
  interface FormatError extends Error {
    /** http状态码 */
    statusCode: number
    /** 业务码 */
    businessCode?: string
  }
}

export {}
