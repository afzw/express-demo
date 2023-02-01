import * as Item from '@/modules/item/item.controller'

const ItemRoutes: App.Route[] = [
    // 获取item
    {
        path: '/items',
        method: 'GET',
        middlewares: [Item.search],
        permission: 'public'
    }
]

export default ItemRoutes
