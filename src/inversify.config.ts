import { Container } from 'inversify'
import { CommonItemController, ItemController } from './apis/item/item.controller'
import { CommonItemService, ItemService } from './business/item'
import { ItemControllerSymbol, ItemServiceSymbol } from '@/inversify.type'
import CnItemService from './custom/cn/business/item'

const container = new Container()

container.bind<ItemController>(ItemControllerSymbol).to(CommonItemController)
container.bind<ItemService>(ItemServiceSymbol).to(CnItemService)

export { container }
