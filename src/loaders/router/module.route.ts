import { AuthRoutes } from '@/apis/auth/auth.route'
import userRoutes from '@/apis/user/user.route'
import ItemRoutes from '@/apis/item/item.route'
import { FileRoutes } from '@/apis/file/file.route'

/** 业务路由 */
const __moduleRoutes: App.Route[] = []
function addRoutes(routes: App.Route[]) {
  for (const route of routes) {
    __moduleRoutes.push(route)
  }
}

addRoutes(AuthRoutes)
addRoutes(userRoutes)
addRoutes(FileRoutes)
addRoutes(ItemRoutes)

export default __moduleRoutes
