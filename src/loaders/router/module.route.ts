import userRoutes from '@/modules/user/user.route'
import ItemRoutes from '@/apis/item/item.route'

/** 业务路由 */
const __moduleRoutes: App.Route[] = []
function addRoutes(routes: App.Route[]) {
  for (const route of routes) {
    __moduleRoutes.push(route)
  }
}

addRoutes(userRoutes)
addRoutes(ItemRoutes)

export default __moduleRoutes
