/**
 * 基于角色的权限控制, rbac(Role-based access control)
 *
 * 该模块定义了NopeApp系统级别的角色和权限
 *  - 每种角色可有多种权限
 *  - 每个用户可以拥有多重角色
 *
 * 除了系统级别的角色和权限，还可能有业务角色和权限。
 * 推荐使用中间件函数的方式去判断业务角色和权限。
 */
import _ from "lodash";
import { Request, Response, NextFunction } from "express";
import { __roles } from "@/loaders/rbac";

/**
 * 检查某角色是否具有某权限
 * @param roleName 角色名称
 * @param permName 权限名称
 */
export function hasPermission(roleName: string, permName: string) {
  if (roleName === "admin") return true
  if (__roles[roleName].includes(permName)) return true

  return false
}

/**
 * Express自定义中间件：权限校验器
 */
export function permissionHandler(req: Request, res: Response, next: NextFunction) {
  req.hasPermission = (permission: string) => {
    const roles = req.user?.roles || ["anon"];
    for (const role of roles) {
      if (hasPermission(role, permission)) return true;
    }
    return false;
  };
  next();
}
