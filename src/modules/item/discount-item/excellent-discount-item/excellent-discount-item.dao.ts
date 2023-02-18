import Curd from '@/lib/odm/curd'
import { QueryOptions } from 'mongoose'
import {
  ExcellentDiscountItemDoc,
  ExcellentDiscountItemDocPojo,
  ExcellentDiscountItemFilter,
  ExcellentDiscountItemProps,
  ExcellentDiscountItemUpdate
} from '@/modules/item/discount-item/excellent-discount-item/excellent-discount-item'
import ExcellentDiscountItemModel from '@/modules/item/discount-item/discount-item.model'
import mongodb from 'mongodb'

class ExcellentDiscountItemDao {
  public static create(createDoc: ExcellentDiscountItemProps) {
    return Curd.create(ExcellentDiscountItemModel, createDoc)
  }

  public static createMany(createDocs: ExcellentDiscountItemProps[]) {
    return Curd.insertMany(ExcellentDiscountItemModel, createDocs)
  }

  public static findDocsByFilter(
    filter: ExcellentDiscountItemFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<ExcellentDiscountItemDoc[]> {
    return Curd.find(ExcellentDiscountItemModel, filter, projection, options).exec()
  }

  public static findPojosByFilter(
    filter: ExcellentDiscountItemFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<ExcellentDiscountItemDocPojo[]> {
    return Curd.find(ExcellentDiscountItemModel, filter, projection, options).lean().exec()
  }

  public static findOneDocByFilter(
    filter: ExcellentDiscountItemFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<ExcellentDiscountItemDoc> {
    return Curd.findOne(ExcellentDiscountItemModel, filter, projection, options).exec()
  }

  public static findOnePojoByFilter(
    filter: ExcellentDiscountItemFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<ExcellentDiscountItemDocPojo> {
    return Curd.findOne(ExcellentDiscountItemModel, filter, projection, options).lean().exec()
  }

  public static findOneDocAndUpdate(
    filter: ExcellentDiscountItemFilter,
    updateDoc: ExcellentDiscountItemUpdate,
    options?: QueryOptions
  ): Promise<ExcellentDiscountItemDoc> {
    return Curd.findOneAndUpdate(ExcellentDiscountItemModel, filter, updateDoc, options).exec()
  }

  public static findOnePojoAndUpdate(
    filter: ExcellentDiscountItemFilter,
    updateDoc: ExcellentDiscountItemUpdate,
    options?: QueryOptions
  ): Promise<ExcellentDiscountItemDocPojo> {
    return Curd.findOneAndUpdate(ExcellentDiscountItemModel, filter, updateDoc, options).lean().exec()
  }

  public static updateMany(
    filter: ExcellentDiscountItemFilter,
    updateDoc: ExcellentDiscountItemUpdate,
    options?: QueryOptions
  ): Promise<mongodb.UpdateResult> {
    return Curd.updateMany(ExcellentDiscountItemModel, filter, updateDoc, options).exec()
  }

  public static findOneDocAndDelete(filter: ExcellentDiscountItemFilter, options?: QueryOptions) {
    return Curd.findOneAndDelete(ExcellentDiscountItemModel, filter, options).exec()
  }

  public static findOnePojoAndDelete(filter: ExcellentDiscountItemFilter, options?: QueryOptions) {
    return Curd.findOneAndDelete(ExcellentDiscountItemModel, filter, options).lean().exec()
  }

  public static deleteMany(filter: ExcellentDiscountItemFilter): Promise<mongodb.DeleteResult> {
    return Curd.deleteMany(ExcellentDiscountItemModel, filter).exec()
  }

  public static countDocuments(filter: ExcellentDiscountItemFilter) {
    return Curd.countDocuments(ExcellentDiscountItemModel, filter).exec()
  }

  public static distinct(field: string, filter: ExcellentDiscountItemFilter) {
    return Curd.distinct(ExcellentDiscountItemModel, field, filter).exec()
  }
}

export default ExcellentDiscountItemDao
