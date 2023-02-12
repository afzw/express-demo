import Curd from '@/lib/odm/curd'
import { QueryOptions } from 'mongoose'
import { ItemDoc, ItemDocPojo, ItemFilter, ItemProps, ItemUpdate } from '@/modules/item/item'
import ItemModel from '@/modules/item/item.model'
import mongodb from 'mongodb'

/** 【item】Dao层操作 */
class ItemDao {
  public static create(createDoc: ItemProps) {
    return Curd.create(ItemModel, createDoc)
  }

  public static createMany(createDocs: ItemProps[]) {
    return Curd.insertMany(ItemModel, createDocs)
  }

  public static findDocsByFilter(filter: ItemFilter, projection?: unknown, options?: QueryOptions): Promise<ItemDoc[]> {
    return Curd.find(ItemModel, filter, projection, options).exec()
  }

  public static findPojosByFilter(
    filter: ItemFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<ItemDocPojo[]> {
    return Curd.find(ItemModel, filter, projection, options).lean().exec()
  }

  public static findOneDocByFilter(filter: ItemFilter, projection?: unknown, options?: QueryOptions): Promise<ItemDoc> {
    return Curd.findOne(ItemModel, filter, projection, options).exec()
  }

  public static findOnePojoByFilter(
    filter: ItemFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<ItemDocPojo> {
    return Curd.findOne(ItemModel, filter, projection, options).lean().exec()
  }

  public static findOneDocAndUpdate(
    filter: ItemFilter,
    updateDoc: ItemUpdate,
    options?: QueryOptions
  ): Promise<ItemDoc> {
    return Curd.findOneAndUpdate(ItemModel, filter, updateDoc, options).exec()
  }

  public static findOnePojoAndUpdate(
    filter: ItemFilter,
    updateDoc: ItemUpdate,
    options?: QueryOptions
  ): Promise<ItemDocPojo> {
    return Curd.findOneAndUpdate(ItemModel, filter, updateDoc, options).lean().exec()
  }

  public static updateMany(
    filter: ItemFilter,
    updateDoc: ItemUpdate,
    options?: QueryOptions
  ): Promise<mongodb.UpdateResult> {
    return Curd.updateMany(ItemModel, filter, updateDoc, options).exec()
  }

  public static findOneDocAndDelete(filter: ItemFilter, options?: QueryOptions) {
    return Curd.findOneAndDelete(ItemModel, filter, options).exec()
  }

  public static findOnePojoAndDelete(filter: ItemFilter, options?: QueryOptions) {
    return Curd.findOneAndDelete(ItemModel, filter, options).lean().exec()
  }

  public static deleteMany(filter: ItemFilter): Promise<mongodb.DeleteResult> {
    return Curd.deleteMany(ItemModel, filter).exec()
  }

  public static countDocuments(filter: ItemFilter) {
    return Curd.countDocuments(ItemModel, filter).exec()
  }

  public static distinct(field: string, filter: ItemFilter) {
    return Curd.distinct(ItemModel, field, filter).exec()
  }
}

export default ItemDao
