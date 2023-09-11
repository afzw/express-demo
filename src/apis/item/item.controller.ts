import callAsync from '@/lib/utils/callAsync'
import { NextFunction, Request, Response } from 'express'
import ItemService from '@/business/item/item.service'
import { ItemFilter, ItemUpdate } from '@/entities/item.model'
import { Paging } from '@/dao/utils'
import fileDao from '@/dao/file.dao'
import { FileProps } from '@/entities/file.model'
import itemDao from '@/dao/item.dao'
import { saveFile } from '@/lib/fs/service'
import config from '@/_config/config'
import path from 'path'
import { deleteFile } from '@/lib/fs/base'

/** 新建item */
class ItemController {
  public static async create(req: Request, res: Response, next: NextFunction) {
    const createInfo = req.body

    const [errCreate, newItem] = await callAsync(ItemService.createItem(createInfo))
    if (errCreate) return next(errCreate)

    return res.json(newItem)
  }

  /** 查询items */
  public static async search(req: Request, res: Response, next: NextFunction) {
    const { name, price, ownerId } = req.query
    const pagingOptions = new Paging(req.query)

    const filter: ItemFilter = {}
    if (name) filter.name = name
    if (price) filter.price = Number(price)
    if (ownerId) filter.ownerId = ownerId

    const [errSearch, result] = await callAsync(ItemService.searchItems(filter, null, pagingOptions))
    if (errSearch) return next(errSearch)

    return res.json(result)
  }

  /** 更新某个item */
  public static async update(req: Request, res: Response, next: NextFunction) {
    const itemId = req.params.itemId
    const updateInfo = req.body

    const [errUpdate, newItem] = await callAsync(ItemService.updateItem(itemId, updateInfo))
    if (errUpdate) return next(errUpdate)

    return res.json(newItem)
  }

  /** 删除某个item */
  public static async remove(req: Request, res: Response, next: NextFunction) {
    const itemId = req.params.itemId

    const [errRemove, removedItem] = await callAsync(ItemService.deleteItem(itemId))
    if (errRemove) return next(errRemove)

    return res.json(removedItem)
  }

  /** 上传item的附件 */
  public static async uploadAttachment(req: Request, res: Response, next: NextFunction) {
    const itemId = req.params.itemId
    const attachment = req.file

    // 保存文件
    const destDir = path.join(config.uploadDir, 'item', itemId)
    const [saveFileErr, savedPath] = await callAsync(saveFile(attachment.path, destDir))
    if (saveFileErr) return next(saveFileErr)

    // 创建文件记录
    const fileInfo: FileProps = {
      name: attachment.originalname,
      path: savedPath,
      size: attachment.size
    }
    const [createFileErr, newFile] = await callAsync(fileDao.create(fileInfo))
    if (createFileErr) return next(createFileErr)

    // 更新item记录
    const itemFilter: ItemFilter = { _id: itemId }
    const itemUpdate: ItemUpdate = { attachmentId: newFile._id }
    const [updateItemErr] = await callAsync(itemDao.findOneAndUpdate(itemFilter, itemUpdate))
    if (updateItemErr) return next(updateItemErr)

    return res.send(newFile)
  }
}

export { ItemController }
