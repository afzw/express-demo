import { __roles } from './roles'

/**
 * 【初始化】加载角色权限系统
 */
async function loadRbac() {
  // 每一个角色添加“公开”权限
  for (const roleName in __roles) {
    __roles[roleName]['permissions'].unshift('public')
  }
}

export default loadRbac
