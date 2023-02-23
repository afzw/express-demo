import 'reflect-metadata'
import callAsync from '@/lib/utils/callAsync'
import { Request, Response } from 'express'
import { ItemService } from '@/business/item'
import { ItemFilter } from '@/modules/item/item'
import { inject } from 'inversify'
import { controller, httpDelete, httpGet, httpPost, httpPut, request, response } from 'inversify-express-utils'
import { ItemServiceSymbol } from '@/inversify.type'

@controller('/items')
class ItemController {
  constructor(@inject(ItemServiceSymbol) private _itemService: ItemService) {}

  /**
   * 新增item
   */
  @httpPost('/')
  public async create(@request() req: Request, @response() res: Response) {
    const createInfo: Ctx.Body = req.body

    const [errCreate, newItem] = await callAsync(this._itemService.createItem(createInfo))
    if (errCreate) return res.status(500).send(`新建item失败 => ${errCreate}`)

    return res.status(200).json(newItem)
  }

  /**
   * 查询item
   */
  @httpGet('/')
  public async search(@request() req: Request, @response() res: Response) {
    const { name, price, ownerId } = req.query

    const filter: ItemFilter = {}
    if (name) filter.name = name
    if (price) filter.price = Number(price)
    if (ownerId) filter.ownerId = ownerId

    const [errSearch, items] = await callAsync(this._itemService.searchItems(filter))
    if (errSearch) return res.status(500).send(`查询item失败 => ${errSearch}`)

    return res.json(items)
  }

  /**
   * 更新某个item
   */
  @httpPut('/:itemId')
  public async update(@request() req: Request, @response() res: Response) {
    const itemId = req.params.itemId
    const filter: ItemFilter = { _id: itemId }
    const updateInfo: Ctx.Body = req.body

    const [errUpdate, newItem] = await callAsync(this._itemService.updateItem(filter, updateInfo))
    if (errUpdate) res.status(500).send(`更新item失败 => ${errUpdate}`)

    return res.json(newItem)
  }

  /**
   * 删除某个item
   */
  @httpDelete('/:itemId')
  public async remove(@request() req: Request, @response() res: Response) {
    const itemId = req.params.itemId
    const filter: ItemFilter = { _id: itemId }

    const [errRemove, removedItem] = await callAsync(this._itemService.deleteItem(filter))
    if (errRemove) return res.status(500).send(`删除item失败 => ${errRemove}`)

    return res.json(removedItem)
  }
}

export { ItemController }
