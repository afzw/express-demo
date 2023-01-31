import { __roles } from '@/loaders/rbac'

/**
 * 根据角色获取权限
 * @param roleNames 角色名数组
 * @returns 权限数组
 */
export function getPermissionsByRoles(roleNames: string[]): string[] {
  const permissions = []

  for (const role in __roles) {
    if (roleNames.includes(role)) {
      permissions.push(...__roles[role]['permissions'])
    }
  }
  const result = Array.from(new Set(...permissions))

  return result
}
