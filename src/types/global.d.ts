/**
 * 应用程序
 */
declare namespace App {
  /**
   * 程序配置
   */
  interface Config {
    /** 监听端口 */
    port: number

    /** 静态资源目录 */
    staticDir: string
    /** 文件上传目录 */
    uploadDir: string
    /** 日志目录 */
    logDir: string
    /** 脚本目录 */
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

/**
 * Http上下文
 */
declare namespace Api {
  //  请求对象--查询字符串
  type Query = {
    [x: string]: string
  }

  //  请求对象--路由参数
  type Params = {
    [x: string]: string
  }

  //  请求对象--body参数
  type Body = {
    [x: string]: any
  }
}

declare type Pojo = { [prop: string]: any }
