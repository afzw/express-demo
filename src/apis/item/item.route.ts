import * as ItemController from '@/apis/item/item.controller'
import * as ItemMiddleware from '@/apis/item/item.middleware'
import ItemValidation from './item.validation'
import { validate } from 'express-validation'

/** item路由 */
const ItemRoutes: App.Route[] = [
  {
    path: '/items',
    method: 'POST',
    middlewares: [validate(ItemValidation.createItem), ItemController.create],
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
