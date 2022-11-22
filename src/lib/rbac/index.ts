/**
 * 基于角色的权限控制, rbac(Role-based access control)
 *
 * 该模块定义了NopeApp系统级别的角色和权限
 *  - 每种角色可有多种权限
 *  - 每个用户可以拥有多重角色
 *
 * NopeApp中，除了系统级别的角色和权限，还可能有业务角色和权限。
 * 我们推荐在NopeApp中使用中间件函数的方式去判断业务角色和权限。
 */
import _ from 'lodash'
import { Request, Response, NextFunction } from 'express'

/* 系统角色和系统权限，每次项目启动都会初始化 */
const _buildRoles = Object.create(null)
const _buildPermissions = Object.create(null)

/* NopeApp默认的角色及其权限 */
//  默认角色：anon 未登录用户（游客） | user 用户 | admin 管理员
//  默认权限：public 公开 | user 用户级权限 | admin 管理员级权限
const _roleNames = ['anon', 'user', 'admin']
const _roles = Object.create(null)
_roles.anon = { permissions: ['anon'] }
_roles.user = { permissions: ['user'] }
_roles.admin = { permissions: ['user', 'admin'] }

/**
 * ### 初始化系统权限和角色。
 * 根据角色的定义计算每种角色所拥有的所有权限位。
 * 判断一个用户是否有访问权限时，只要将用户角色对应的权限位与目标权限位进行位与运算即可(非0表示成功)。
 * @param appRoles NopeApp实例的自定义角色
 */
export function initPermissionsAndRoles() {
  // const roles = _.merge(_roles, appRoles) //  所有的待构建角色 = Nope默认角色 + NopeApp自定义角色
  const roles = _roles

  /* 整合所有权限 */
  let permissions = ['public']  //  所有角色均有public权限
  for (const roleName in roles) {
    Array.prototype.push.apply(permissions, roles[roleName].permissions)
  }
  permissions = _.uniq(permissions)

  /* 给每个权限生成权限位 */
  for (let i = 0; i < permissions.length; i++) {
    _buildPermissions[permissions[i]] = BigInt(1) << BigInt(i)
  }

  /* 给每种角色生成权限位 */
  for (const roleName in roles) {
    let bitMask = _buildPermissions.public
    if (!_roleNames.includes(roleName)) {
      bitMask = bitMask | _buildPermissions.user  //  appRoles default user
    }

    for (const permName of roles[roleName].permissions) {
      if (_buildPermissions[permName]) {
        bitMask = bitMask | _buildPermissions[permName]
      } else {
        throw 'unknown permission' + permName
      }
    }

    _buildRoles[roleName] = bitMask
  }
}


/**
 * 检查某角色是否具有某权限
 * @param roleName 角色名称
 * @param permName 权限名称
 */
export function hasPermission(roleName: string, permName: string) {
  if (roleName === 'admin') return true

  //  通过位运算进行判断
  if (_buildRoles[roleName] && _buildPermissions[permName])
    if (BigInt(_buildRoles[roleName]) & BigInt(_buildPermissions[permName]))
      return true

  return false
}

/**
 * Express自定义中间件：权限校验器
 */
export function permissionHandler(req: any, res: Response, next: NextFunction) {
  req.hasPermission = (permission: string) => {
    const roles = req.user?.roles || ['anon']
    for (const role of roles) {
      if (hasPermission(role, permission)) return true
    }
    return false
  }
  next()
}

/**
 * 获取角色的权限位，如果前端不支持BigInt，忽略大于1<<30的权限（1<<31将溢出）
 */
 export function getRoles(extended: boolean) {
  let roles:any = {}
  for (let role in _roles) {
    let bitMask = _buildPermissions.public
    if (role !== 'anon' && role !== 'user' && role !== 'admin') {
      bitMask = bitMask | _buildPermissions.user
    }

    for (let perm of _roles[role].permissions) {
      // 如果前端不支持BigInt，则忽略不支持的权限位
      if (extended || _buildPermissions[perm] <= BigInt(1<<30)) {
        bitMask = bitMask | _buildPermissions[perm]
      }
    }

    if (extended) {
      roles[role] = String(bitMask)
    } else {
      roles[role] = Number(bitMask)
    }
  }

  return roles
}

export function getPermissions(extended: boolean) {
  let permissions:any = {}
  for (let perm in _buildPermissions) {
    if (extended) {
      permissions[perm] = String(_buildPermissions[perm])
    } else if (_buildPermissions[perm] <= BigInt(1<<30)) {
      permissions[perm] = Number(_buildPermissions[perm])
    } else {
      // 前端不支持的权限位
      permissions[perm] = 0
    }
  }

  return permissions
}
