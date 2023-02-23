import * as ItemMiddleware from '@/apis/item/item.middleware'
import { API_ITEM_CREATE, API_ITEM_DELETE_ONE, API_ITEM_SEARCH, API_ITEM_UPDATE_ONE } from './item.api'

/** item路由 */
const ItemRoutes: App.Route[] = [
  {
    path: API_ITEM_CREATE,
    method: 'POST',
    middlewares: [],
    permission: 'public'
  },
  {
    path: API_ITEM_SEARCH,
    method: 'GET',
    middlewares: [],
    permission: 'public'
  },
  {
    path: API_ITEM_UPDATE_ONE,
    method: 'PUT',
    middlewares: [ItemMiddleware.validateItemInParams],
    permission: 'public'
  },
  {
    path: API_ITEM_DELETE_ONE,
    method: 'DELETE',
    middlewares: [ItemMiddleware.validateItemInParams],
    permission: 'public'
  }
]

export default ItemRoutes
