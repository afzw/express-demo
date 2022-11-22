/**
 * 所有业务路由
 */
import userRoutes from '@src/modules/user/user.route'

//  所有的业务路由
const moduleRoutes: App.Route[] = []
function addRoutes(routes: App.Route[]) {
  for (const route of routes) {
    moduleRoutes.push(route)
  }
}

addRoutes(userRoutes)

export default moduleRoutes
