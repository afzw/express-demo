// import * as ItemController from '@/apis/item/item.controller'
import * as ItemMiddleware from '@/apis/item/item.middleware'
import { API_ITEM_CREATE, API_ITEM_DELETE_ONE, API_ITEM_SEARCH, API_ITEM_UPDATE_ONE } from './item.api'
// import ItemController from './item.controller'

/** item路由 */
const ItemRoutes: App.Route[] = [
  {
    path: API_ITEM_CREATE,
    method: 'POST',
    // middlewares: [ItemController.create],
    middlewares: [],
    permission: 'public'
  }
  // {
  //   path: API_ITEM_CREATE,
  //   method: 'POST',
  //   middlewares: [ItemController.create],
  //   permission: 'public'
  // },
  // {
  //   path: API_ITEM_SEARCH,
  //   method: 'GET',
  //   middlewares: [ItemController.search],
  //   permission: 'public'
  // },
  // {
  //   path: API_ITEM_UPDATE_ONE,
  //   method: 'PUT',
  //   middlewares: [ItemMiddleware.validateItemInParams, ItemController.update],
  //   permission: 'public'
  // },
  // {
  //   path: API_ITEM_DELETE_ONE,
  //   method: 'DELETE',
  //   middlewares: [ItemMiddleware.validateItemInParams, ItemController.remove],
  //   permission: 'public'
  // }
]

export default ItemRoutes
