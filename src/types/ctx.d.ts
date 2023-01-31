/**
 * Http上下文
 */
declare namespace Ctx {
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
