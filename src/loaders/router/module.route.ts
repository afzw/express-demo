/**
 * 所有业务路由
 */
import userRoutes from '@/modules/user/user.route'
import ItemRoutes from '@/modules/item/item.route'

//  所有的业务路由
const moduleRoutes: App.Route[] = []
function addRoutes(routes: App.Route[]) {
  for (const route of routes) {
    moduleRoutes.push(route)
  }
}

addRoutes(userRoutes)
addRoutes(ItemRoutes)

export default moduleRoutes
