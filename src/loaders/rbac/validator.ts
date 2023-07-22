import { Request, Response, NextFunction } from 'express'
import { __roles } from './roles'

/**
 * 系统权限校验器的注册器
 */
export function permissionValidatorRegister(req: Request, res: Response, next: NextFunction) {
  /** 权限校验器 */
  req.hasPermission = (permission: string) => {
    const roles = req.user?.roles || ['anon']
    for (const role of roles) {
      if (role === 'admin') return true
      if (__roles[role]['permissions'].includes(permission)) return true
    }
    return false
  }
  next()
}

export { __roles }
