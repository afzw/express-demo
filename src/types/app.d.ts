declare namespace App {
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

  //  路由
  interface Route {
    path: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    middlewares?: any[],
    permission?: string,
    threshold?: any
    csrf?: boolean
  }

  //  角色
  interface Role {
    permissions: string[]
  }

  //  项目配置
  namespace Config {
    //  mongodb配置项
    interface Mongo {
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