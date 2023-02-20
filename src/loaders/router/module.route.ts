import AuthRoutes from '@/apis/auth/auth.route'
import UserRoutes from '@/apis/user/user.route'
import ItemRoutes from '@/apis/item/item.route'
import DiscountItemRoutes from '@/apis/item/discount-item/discount-item.route'

/** 业务路由 */
const __moduleRoutes: App.Route[] = []
function addRoutes(routes: App.Route[]) {
  for (const route of routes) {
    __moduleRoutes.push(route)
  }
}

addRoutes(AuthRoutes)

addRoutes(UserRoutes)
addRoutes(ItemRoutes)
addRoutes(DiscountItemRoutes)

export default __moduleRoutes
