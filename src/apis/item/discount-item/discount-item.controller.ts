import _ from 'lodash'
import callAsync from '@/lib/utils/callAsync'
import { Request, Response, NextFunction } from 'express'
import DiscountItemService from '@/business/item/discount-item'

/** 新建discount-item */
export async function create(req: Request, res: Response, next: NextFunction) {
  const createInfo: Ctx.Body = req.body

  const [errCreate, newDiscountItem] = await callAsync(DiscountItemService.createDiscountItem(createInfo))
  if (errCreate) return next({ code: 500, title: `新建discount-item失败`, err: errCreate })

  return res.json(newDiscountItem)
}
