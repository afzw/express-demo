/**
 * 重新定义Express的部分类型声明
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Express {
  interface Request {
    user?: import('@/modules/user/user').UserDocPojo
    hasPermission(permission: string): boolean
    logIn(user: import('@/modules/user/user').UserProps, done: (err: unknown) => void): void
    session: any
  }

  interface NextFunction {
    (err?: CustomError.ControllerError): void
  }
}
