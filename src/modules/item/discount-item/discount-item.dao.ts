import Curd from '@/lib/odm/curd'
import { QueryOptions } from 'mongoose'
import {
  DiscountItemDoc,
  DiscountItemDocPojo,
  DiscountItemFilter,
  DiscountItemProps,
  DiscountItemUpdate
} from '@/modules/item/discount-item/discount-item'
import DiscountItemModel from '@/modules/item/discount-item/discount-item.model'
import mongodb from 'mongodb'

class DiscountItemDao {
  public static create(createDoc: DiscountItemProps) {
    return Curd.create(DiscountItemModel, createDoc)
  }

  public static createMany(createDocs: DiscountItemProps[]) {
    return Curd.insertMany(DiscountItemModel, createDocs)
  }

  public static findDocsByFilter(
    filter: DiscountItemFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<DiscountItemDoc[]> {
    return Curd.find(DiscountItemModel, filter, projection, options).exec()
  }

  public static findPojosByFilter(
    filter: DiscountItemFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<DiscountItemDocPojo[]> {
    return Curd.find(DiscountItemModel, filter, projection, options).lean().exec()
  }

  public static findOneDocByFilter(
    filter: DiscountItemFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<DiscountItemDoc> {
    return Curd.findOne(DiscountItemModel, filter, projection, options).exec()
  }

  public static findOnePojoByFilter(
    filter: DiscountItemFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<DiscountItemDocPojo> {
    return Curd.findOne(DiscountItemModel, filter, projection, options).lean().exec()
  }

  public static findOneDocAndUpdate(
    filter: DiscountItemFilter,
    updateDoc: DiscountItemUpdate,
    options?: QueryOptions
  ): Promise<DiscountItemDoc> {
    return Curd.findOneAndUpdate(DiscountItemModel, filter, updateDoc, options).exec()
  }

  public static findOnePojoAndUpdate(
    filter: DiscountItemFilter,
    updateDoc: DiscountItemUpdate,
    options?: QueryOptions
  ): Promise<DiscountItemDocPojo> {
    return Curd.findOneAndUpdate(DiscountItemModel, filter, updateDoc, options).lean().exec()
  }

  public static updateMany(
    filter: DiscountItemFilter,
    updateDoc: DiscountItemUpdate,
    options?: QueryOptions
  ): Promise<mongodb.UpdateResult> {
    return Curd.updateMany(DiscountItemModel, filter, updateDoc, options).exec()
  }

  public static findOneDocAndDelete(filter: DiscountItemFilter, options?: QueryOptions) {
    return Curd.findOneAndDelete(DiscountItemModel, filter, options).exec()
  }

  public static findOnePojoAndDelete(filter: DiscountItemFilter, options?: QueryOptions) {
    return Curd.findOneAndDelete(DiscountItemModel, filter, options).lean().exec()
  }

  public static deleteMany(filter: DiscountItemFilter): Promise<mongodb.DeleteResult> {
    return Curd.deleteMany(DiscountItemModel, filter).exec()
  }

  public static countDocuments(filter: DiscountItemFilter) {
    return Curd.countDocuments(DiscountItemModel, filter).exec()
  }

  public static distinct(field: string, filter: DiscountItemFilter) {
    return Curd.distinct(DiscountItemModel, field, filter).exec()
  }
}

export default DiscountItemDao
