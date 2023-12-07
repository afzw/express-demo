import callAsync from '@/lib/callAsync'
import { Request, Response, NextFunction } from 'express'
import { ItemFilter } from '@/entities/item.model'
import itemDao from '@/dao/item.dao'
import { AppError } from '@/lib/error'
import { FileFilter } from '@/entities/file.model'
import fileDao from '@/dao/file.dao'

/**
 * 验证params中的item是否存在。
 */
export async function validateItemInParams(req: Request, res: Response, next: NextFunction) {
  const itemId = req.params.itemId

  const filter: ItemFilter = { _id: itemId }

  const [err, item] = await callAsync(itemDao.findOne(filter))
  if (err) return next(err)
  if (!item) return next(new AppError({ message: '没有找到item', statusCode: 404 }))

  res.locals.item = item

  next()
}

export async function validateAttachmentInParams(req: Request, res: Response, next: NextFunction) {
  const attachmentId = req.params.attachmentId

  const filter: FileFilter = { _id: attachmentId }

  const [err, attachment] = await callAsync(fileDao.findOne(filter))
  if (err) return next(err)
  if (!attachment) return next(new AppError({ message: '没有找到附件', statusCode: 404 }))

  res.locals.attachment = attachment

  next()
}
