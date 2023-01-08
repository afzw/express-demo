import _ from "lodash";

/**
 * 全局变量——系统角色
 */
const __roles: App.RolesMap = Object.create(null);
__roles.anon = ["anon"]
__roles.user = ["user"]
__roles.admin = ["user", "admin"]

/**
 * 初始化系统权限和角色。
 * 初始化步骤：（1）给每一种角色添加默认权限public
 */
function initRoles() {
  for (const roleName in __roles) {
    __roles[roleName].unshift("public")
  }
}

export { __roles, initRoles }
