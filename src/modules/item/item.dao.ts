import 'reflect-metadata'
import Curd from '@/lib/odm/curd'
import { QueryOptions } from 'mongoose'
import { ItemDoc, ItemDocPojo, ItemFilter, ItemProps, ItemUpdate } from '@/modules/item/item'
import ItemModel from '@/modules/item/item.model'
import mongodb from 'mongodb'
import { injectable } from 'inversify'

interface ItemDao {
  create(createDoc: ItemUpdate): Promise<ItemDoc>
  createMany(createDocs: ItemProps[]): Promise<ItemDoc[]>
  findDocsByFilter(filter: ItemFilter, projection?: unknown, options?: QueryOptions): Promise<ItemDoc[]>
  findPojosByFilter(filter: ItemFilter, projection?: unknown, options?: QueryOptions): Promise<ItemDocPojo[]>
  findOneDocByFilter(filter: ItemFilter, projection?: unknown, options?: QueryOptions): Promise<ItemDoc>
  findOnePojoByFilter(filter: ItemFilter, projection?: unknown, options?: QueryOptions): Promise<ItemDocPojo>
  findOneDocAndUpdate(filter: ItemFilter, updateDoc: ItemUpdate, options?: QueryOptions): Promise<ItemDoc>
  findOnePojoAndUpdate(filter: ItemFilter, updateDoc: ItemUpdate, options?: QueryOptions): Promise<ItemDocPojo>
  updateMany(filter: ItemFilter, updateDoc: ItemUpdate, options?: QueryOptions): Promise<mongodb.UpdateResult>
  findOneDocAndDelete(filter: ItemFilter, options?: QueryOptions): Promise<ItemDoc>
  findOnePojoAndDelete(filter: ItemFilter, options?: QueryOptions): Promise<ItemDocPojo>
  deleteMany(filter: ItemFilter): Promise<mongodb.DeleteResult>
  countDocuments(filter: ItemFilter): Promise<number>
  distinct(field: string, filter: ItemFilter): Promise<string[]>
}

/** 【item】Dao层操作 */
@injectable()
class CommonItemDao implements ItemDao {
  public create(createDoc: ItemProps): Promise<ItemDoc> {
    return Curd.create(ItemModel, createDoc)
  }

  public createMany(createDocs: ItemProps[]): Promise<ItemDoc[]> {
    return Curd.insertMany(ItemModel, createDocs)
  }

  public findDocsByFilter(filter: ItemFilter, projection?: unknown, options?: QueryOptions): Promise<ItemDoc[]> {
    return Curd.find(ItemModel, filter, projection, options).exec()
  }

  public findPojosByFilter(filter: ItemFilter, projection?: unknown, options?: QueryOptions): Promise<ItemDocPojo[]> {
    return Curd.find(ItemModel, filter, projection, options).lean().exec()
  }

  public findOneDocByFilter(filter: ItemFilter, projection?: unknown, options?: QueryOptions): Promise<ItemDoc> {
    return Curd.findOne(ItemModel, filter, projection, options).exec()
  }

  public findOnePojoByFilter(filter: ItemFilter, projection?: unknown, options?: QueryOptions): Promise<ItemDocPojo> {
    return Curd.findOne(ItemModel, filter, projection, options).lean().exec()
  }

  public findOneDocAndUpdate(filter: ItemFilter, updateDoc: ItemUpdate, options?: QueryOptions): Promise<ItemDoc> {
    return Curd.findOneAndUpdate(ItemModel, filter, updateDoc, options).exec()
  }

  public findOnePojoAndUpdate(filter: ItemFilter, updateDoc: ItemUpdate, options?: QueryOptions): Promise<ItemDocPojo> {
    return Curd.findOneAndUpdate(ItemModel, filter, updateDoc, options).lean().exec()
  }

  public updateMany(filter: ItemFilter, updateDoc: ItemUpdate, options?: QueryOptions): Promise<mongodb.UpdateResult> {
    return Curd.updateMany(ItemModel, filter, updateDoc, options).exec()
  }

  public findOneDocAndDelete(filter: ItemFilter, options?: QueryOptions): Promise<ItemDoc> {
    return Curd.findOneAndDelete(ItemModel, filter, options).exec()
  }

  public findOnePojoAndDelete(filter: ItemFilter, options?: QueryOptions): Promise<ItemDocPojo> {
    return Curd.findOneAndDelete(ItemModel, filter, options).lean().exec()
  }

  public deleteMany(filter: ItemFilter): Promise<mongodb.DeleteResult> {
    return Curd.deleteMany(ItemModel, filter).exec()
  }

  public countDocuments(filter: ItemFilter): Promise<number> {
    return Curd.countDocuments(ItemModel, filter).exec()
  }

  public distinct<T>(field: string, filter: ItemFilter): Promise<T[]> {
    return Curd.distinct<T, ItemProps>(ItemModel, field, filter).exec()
  }
}

export { CommonItemDao, ItemDao }
