import ItemRoutes from '@/apis/item/item.route'
import { addRoutes } from './util'

/** 业务路由 */
const __userRoutes: App.Route[] = []

addRoutes(__userRoutes, ItemRoutes)

export { __userRoutes }
