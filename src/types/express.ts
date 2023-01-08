/**
 * 重新定义Express的部分类型声明
 */
declare namespace Express {
  interface Request {
    user?: import("@/modules/user/user").UserProps;
    hasPermission(permission: string): boolean;
    logIn(
      user: import("@/modules/user/user").UserProps,
      done: (err: unknown) => void
    ): void;
    session: any;
  }
}
