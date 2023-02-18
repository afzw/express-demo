import Curd from '@/lib/odm/curd'
import { QueryOptions } from 'mongoose'
import {
  ExcellentItemDoc,
  ExcellentItemDocPojo,
  ExcellentItemFilter,
  ExcellentItemProps,
  ExcellentItemUpdate
} from '@/modules/item/excellent-item/excellent-item'
import ExcellentItemModel from '@/modules/item/excellent-item/excellent-item.model'
import mongodb from 'mongodb'

class ExcellentItemDao {
  public static create(createDoc: ExcellentItemProps) {
    return Curd.create(ExcellentItemModel, createDoc)
  }

  public static createMany(createDocs: ExcellentItemProps[]) {
    return Curd.insertMany(ExcellentItemModel, createDocs)
  }

  public static findDocsByFilter(
    filter: ExcellentItemFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<ExcellentItemDoc[]> {
    return Curd.find(ExcellentItemModel, filter, projection, options).exec()
  }

  public static findPojosByFilter(
    filter: ExcellentItemFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<ExcellentItemDocPojo[]> {
    return Curd.find(ExcellentItemModel, filter, projection, options).lean().exec()
  }

  public static findOneDocByFilter(
    filter: ExcellentItemFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<ExcellentItemDoc> {
    return Curd.findOne(ExcellentItemModel, filter, projection, options).exec()
  }

  public static findOnePojoByFilter(
    filter: ExcellentItemFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<ExcellentItemDocPojo> {
    return Curd.findOne(ExcellentItemModel, filter, projection, options).lean().exec()
  }

  public static findOneDocAndUpdate(
    filter: ExcellentItemFilter,
    updateDoc: ExcellentItemUpdate,
    options?: QueryOptions
  ): Promise<ExcellentItemDoc> {
    return Curd.findOneAndUpdate(ExcellentItemModel, filter, updateDoc, options).exec()
  }

  public static findOnePojoAndUpdate(
    filter: ExcellentItemFilter,
    updateDoc: ExcellentItemUpdate,
    options?: QueryOptions
  ): Promise<ExcellentItemDocPojo> {
    return Curd.findOneAndUpdate(ExcellentItemModel, filter, updateDoc, options).lean().exec()
  }

  public static updateMany(
    filter: ExcellentItemFilter,
    updateDoc: ExcellentItemUpdate,
    options?: QueryOptions
  ): Promise<mongodb.UpdateResult> {
    return Curd.updateMany(ExcellentItemModel, filter, updateDoc, options).exec()
  }

  public static findOneDocAndDelete(filter: ExcellentItemFilter, options?: QueryOptions) {
    return Curd.findOneAndDelete(ExcellentItemModel, filter, options).exec()
  }

  public static findOnePojoAndDelete(filter: ExcellentItemFilter, options?: QueryOptions) {
    return Curd.findOneAndDelete(ExcellentItemModel, filter, options).lean().exec()
  }

  public static deleteMany(filter: ExcellentItemFilter): Promise<mongodb.DeleteResult> {
    return Curd.deleteMany(ExcellentItemModel, filter).exec()
  }

  public static countDocuments(filter: ExcellentItemFilter) {
    return Curd.countDocuments(ExcellentItemModel, filter).exec()
  }

  public static distinct(field: string, filter: ExcellentItemFilter) {
    return Curd.distinct(ExcellentItemModel, field, filter).exec()
  }
}

export default ExcellentItemDao
