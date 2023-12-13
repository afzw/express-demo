/** 系统角色 */
enum SysRole {
  /** 匿名用户（游客） */
  ANON = 'anon',
  /** 普通用户 */
  USER = 'user',
  /** 系统管理员 */
  ADMIN = 'admin'
}

/** 系统权限 */
enum SysPerm {
  PUBLIC = 'public',
  OPEN = 'open',
  ANON = 'anon',
  USER = 'user',
  ADMIN = 'admin'
}

/**
 * 全局变量——系统角色
 */
const __rolesMap = new Map<string, App.Role>()
__rolesMap.set(SysRole.ANON, { permissions: [SysPerm.ANON] })
__rolesMap.set(SysRole.USER, { permissions: [SysPerm.USER] })
__rolesMap.set(SysRole.ADMIN, { permissions: [SysPerm.ADMIN, SysPerm.USER] })

/**
 * 获取某角色的权限
 */
function getPermsByRole(role: string): string[] {
  return __rolesMap.get(role).permissions
}

/**
 * 判断
 */
function judgeRoleHasPerm(role: string, perm: string): boolean {
  return __rolesMap.get(role).permissions.includes(perm)
}

export { SysRole, SysPerm, getPermsByRole, judgeRoleHasPerm }
