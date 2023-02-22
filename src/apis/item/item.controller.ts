import _ from 'lodash'
import callAsync from '@/lib/utils/callAsync'
import { Request, Response, NextFunction } from 'express'
import { ItemService } from '@/business/item'
import ItemStore from '@/business/item/item.store'
import { ItemFilter } from '@/modules/item/item'
import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import { container } from '@/inversify.config'
import { controller, httpPost, next, request, response } from 'inversify-express-utils'
import { ItemServiceSymbol } from '@/inversify.type'

interface ItemController {
  create(req: Request, res: Response, next: NextFunction): any
}

@controller('/items')
class CommonItemController implements ItemController {
  constructor(@inject(ItemServiceSymbol) private _itemService: ItemService) {}

  @httpPost('/')
  public async create(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    const createInfo: Ctx.Body = req.body

    const [errCreate, newItem] = await callAsync(this._itemService.createItem(createInfo))
    if (errCreate) return res.status(500).send(`新建item失败 => ${errCreate}`)

    return res.status(200).json(newItem)
  }
}

// export const itemController = new ItemController()
export { ItemController, CommonItemController }

// 以下是源代码
// /** 新建item */
// export async function create(req: Request, res: Response, next: NextFunction) {
//   const createInfo: Ctx.Body = req.body

//   const [errCreate, newItem] = await callAsync(ItemService.createItem(createInfo))
//   if (errCreate) return next({ code: 500, title: `新建item失败`, err: errCreate })

//   return res.json(newItem)
// }

// /** 查询items */
// export async function search(req: Request, res: Response, next: NextFunction) {
//   const { name, price, ownerId } = req.query

//   const filter: ItemFilter = {}
//   if (name) filter.name = name
//   if (price) filter.price = Number(price)
//   if (ownerId) filter.ownerId = ownerId

//   const [errSearch, items] = await callAsync(ItemService.searchItems(filter))
//   if (errSearch) return next({ code: 500, title: `查询item失败`, err: errSearch })

//   return res.json(items)
// }

// /** 更新某个item */
// export async function update(req: Request, res: Response, next: NextFunction) {
//   const itemId = req.params.itemId

//   const filter: ItemFilter = { _id: itemId }
//   const updateProps = _.pick(req.body, ItemStore.theCreateKeys())

//   const [errUpdate, newItem] = await callAsync(ItemService.updateItem(filter, updateProps))
//   if (errUpdate) next({ code: 500, title: `更新item失败`, err: errUpdate })

//   return res.json(newItem)
// }

// /** 删除某个item */
// export async function remove(req: Request, res: Response, next: NextFunction) {
//   const itemId = req.params.itemId

//   const [errRemove, removedItem] = await callAsync(ItemService.deleteItem(itemId))
//   if (errRemove) return next({ code: 500, title: `删除item失败`, err: errRemove })

//   return res.json(removedItem)
// }
