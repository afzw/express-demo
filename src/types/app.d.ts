/**
 * Http上下文
 */
declare namespace Ctx {
  //  请求对象--查询字符串
  type Query = {
    [x: string]: string
  }

  //  请求对象--路由参数
  type Param = {
    [x: string]: string
  }

  //  请求对象--body参数
  type Body = {
    [x: string]: any
  }

  //  Request附加内容
  type reqAddition = {
    user: {
      _id: any,
      [x: string]: string
    } //  IUserModel
    hasPermission: (permission: string) => boolean
  }
}

/**
 * 路由
 */
declare interface Route {
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  middlewares?: any[],
  permission?: string,
  threshold?: any
  csrf?: boolean
}

/**
 * 配置
 */
declare interface Config {
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
