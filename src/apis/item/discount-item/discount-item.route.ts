import * as DiscountItemController from '@/apis/item/discount-item/discount-item.controller'
import { API_CREATE_DISCOUNT_ITEM } from './discount-item.api'

/** discount-item路由 */
const DiscountItemRoutes: App.Route[] = [
  {
    path: API_CREATE_DISCOUNT_ITEM,
    method: 'POST',
    middlewares: [DiscountItemController.create],
    permission: 'public'
  }
]

export default DiscountItemRoutes
