import * as ItemController from '@/modules/item/item.controller'
import * as ItemMiddleware from '@/modules/item/item.middleware'

/** item路由 */
const ItemRoutes: App.Route[] = [
  {
    path: '/items',
    method: 'POST',
    middlewares: [ItemController.create],
    permission: 'public'
  },
  {
    path: '/items',
    method: 'GET',
    middlewares: [ItemController.search],
    permission: 'public'
  },
  {
    path: '/items/:itemId',
    method: 'PUT',
    middlewares: [ItemMiddleware.validateItemInParams, ItemController.update],
    permission: 'public'
  },
  {
    path: '/items/:itemId',
    method: 'DELETE',
    middlewares: [ItemMiddleware.validateItemInParams, ItemController.remove],
    permission: 'public'
  }
]

export default ItemRoutes
