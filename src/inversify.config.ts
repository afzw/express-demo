import { Container } from 'inversify'
import { ItemController } from '@/apis/item/item.controller'
import { CommonItemService, ItemService } from './business/item'
import { ItemControllerSymbol, ItemDaoSymbol, ItemServiceSymbol, ItemStoreSymbol } from '@/inversify.type'
import { CommonItemDao, ItemDao } from './modules/item/item.dao'
import { CommonItemStore, ItemStore } from './business/item/item.store'

const container = new Container()

container.bind<ItemController>(ItemControllerSymbol).to(ItemController)
container.bind<ItemService>(ItemServiceSymbol).to(CommonItemService)
container.bind<ItemDao>(ItemDaoSymbol).to(CommonItemDao)
container.bind<ItemStore>(ItemStoreSymbol).to(CommonItemStore)

export { container }
