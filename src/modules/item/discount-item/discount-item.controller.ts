import _ from 'lodash'
import callAsync from '@/lib/utils/callAsync'
import { Request, Response } from 'express'
import DiscountItemService from './discount-item.service'
import DiscountItemStore from './discount-item.store'
import ItemCurdService from '../curd.service'

/**
 * 创建discount-item
 */
export async function create(req: Request, res: Response) {
  const createProps = _.pick(req.body, DiscountItemStore.theCreateKeys())

  const [errCreate, newItem] = await callAsync(ItemCurdService.createItem(createProps))
  if (errCreate) return res.status(500).send(`创建item失败 => ${errCreate}`)

  return res.json(newItem)
}

/**
 * 商品打折
 */
export async function discount(req: Request, res: Response) {
  const itemId = req.params.itemId
  const discount = req.body.discount

  const [errDiscount, discountedItem] = await callAsync(DiscountItemService.discountItem(itemId, discount))
  if (errDiscount) return res.status(500).send(`商品打折失败 => ${errDiscount}`)

  return res.json(discountedItem)
}
