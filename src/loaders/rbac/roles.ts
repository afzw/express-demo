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

/**
 * 全局变量——系统角色
 */
const __roles: App.RolesMap = Object.create(null)
__roles.anon = { permissions: ['anon'] }
__roles.user = { permissions: ['user'] }
__roles.admin = { permissions: ['admin', 'user'] }

export { __roles }
