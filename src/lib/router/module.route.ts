/**
 * 所有业务路由
 */
import userRoutes from '@/modules/user/user.route'

//  所有的业务路由
const moduleRoutes: Route[] = []
function addRoutes(routes: Route[]) {
  for (const route of routes) {
    moduleRoutes.push(route)
  }
}

addRoutes(userRoutes)

export default moduleRoutes
