import callAsync from '@/lib/utils/callAsync'
import { Request, Response } from 'express'
import ItemDao from './item.dao'

/**
 * 查询items
 */
export async function search (req: Request, res: Response) {
    const [findItemsErr, items] = await callAsync(ItemDao.findDocsByFilter({}))
    if (findItemsErr) return res.status(500).send(`数据库查询操作失败 => ${findItemsErr}`)

    return res.json(items)
}