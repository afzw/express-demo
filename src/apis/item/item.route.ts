import { ItemController } from '@/apis/item/item.controller'
import * as ItemMiddleware from '@/apis/item/item.middleware'
import ItemValidation from './item.validation'
import { uploadSingleFile } from '@/loaders/middleware/multer'
import { validate } from 'express-validation'

/** item路由 */
const ItemRoutes: App.Route[] = [
  // 创建item
  {
    path: '/items',
    method: 'POST',
    middlewares: [validate(ItemValidation.createItem), ItemController.create],
    permission: 'public'
  },
  // 查询item
  {
    path: '/items',
    method: 'GET',
    middlewares: [ItemController.search],
    permission: 'public'
  },
  // 更新某个item
  {
    path: '/items/:itemId',
    method: 'PUT',
    middlewares: [ItemMiddleware.validateItemInParams, ItemController.update],
    permission: 'public'
  },
  // 删除某个item
  {
    path: '/items/:itemId',
    method: 'DELETE',
    middlewares: [ItemMiddleware.validateItemInParams, ItemController.remove],
    permission: 'public'
  },
  // 上传某item的附件
  {
    path: '/items/:itemId/attachment',
    method: 'POST',
    middlewares: [uploadSingleFile('attachment'), ItemMiddleware.validateItemInParams, ItemController.uploadAttachment],
    permission: 'public'
  },
  // 下载某item的附件
  {
    path: '/items/:itemId/attachment/:attachmentId',
    method: 'GET',
    middlewares: [
      ItemMiddleware.validateItemInParams,
      ItemMiddleware.validateAttachmentInParams,
      ItemController.downloadAttachment
    ],
    permission: 'public'
  },
  // 删除某item的附件
  {
    path: '/items/:itemId/attachment/:attachmentId',
    method: 'DELETE',
    middlewares: [
      ItemMiddleware.validateItemInParams,
      ItemMiddleware.validateAttachmentInParams,
      ItemController.deleteAttachment
    ],
    permission: 'public'
  }
]

export default ItemRoutes
