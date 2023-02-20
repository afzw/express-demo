import Curd from '@/lib/odm/curd'
import { QueryOptions } from 'mongoose'
import { CnItemDoc, CnItemDocPojo, CnItemFilter, CnItemProps, CnItemUpdate } from '@/custom/cn/modules/item/item'
import CnItemModel from '@/custom/cn/modules/item/item.model'
import mongodb from 'mongodb'

/** 【cn-item】Dao层操作 */
class CnItemDao {
  public static create(createDoc: CnItemProps) {
    return Curd.create(CnItemModel, createDoc)
  }

  public static createMany(createDocs: CnItemProps[]) {
    return Curd.insertMany(CnItemModel, createDocs)
  }

  public static findDocsByFilter(
    filter: CnItemFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<CnItemDoc[]> {
    return Curd.find(CnItemModel, filter, projection, options).exec()
  }

  public static findPojosByFilter(
    filter: CnItemFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<CnItemDocPojo[]> {
    return Curd.find(CnItemModel, filter, projection, options).lean().exec()
  }

  public static findOneDocByFilter(
    filter: CnItemFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<CnItemDoc> {
    return Curd.findOne(CnItemModel, filter, projection, options).exec()
  }

  public static findOnePojoByFilter(
    filter: CnItemFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<CnItemDocPojo> {
    return Curd.findOne(CnItemModel, filter, projection, options).lean().exec()
  }

  public static findOneDocAndUpdate(
    filter: CnItemFilter,
    updateDoc: CnItemUpdate,
    options?: QueryOptions
  ): Promise<CnItemDoc> {
    return Curd.findOneAndUpdate(CnItemModel, filter, updateDoc, options).exec()
  }

  public static findOnePojoAndUpdate(
    filter: CnItemFilter,
    updateDoc: CnItemUpdate,
    options?: QueryOptions
  ): Promise<CnItemDocPojo> {
    return Curd.findOneAndUpdate(CnItemModel, filter, updateDoc, options).lean().exec()
  }

  public static updateMany(
    filter: CnItemFilter,
    updateDoc: CnItemUpdate,
    options?: QueryOptions
  ): Promise<mongodb.UpdateResult> {
    return Curd.updateMany(CnItemModel, filter, updateDoc, options).exec()
  }

  public static findOneDocAndDelete(filter: CnItemFilter, options?: QueryOptions) {
    return Curd.findOneAndDelete(CnItemModel, filter, options).exec()
  }

  public static findOnePojoAndDelete(filter: CnItemFilter, options?: QueryOptions) {
    return Curd.findOneAndDelete(CnItemModel, filter, options).lean().exec()
  }

  public static deleteMany(filter: CnItemFilter): Promise<mongodb.DeleteResult> {
    return Curd.deleteMany(CnItemModel, filter).exec()
  }

  public static countDocuments(filter: CnItemFilter) {
    return Curd.countDocuments(CnItemModel, filter).exec()
  }

  public static distinct(field: string, filter: CnItemFilter) {
    return Curd.distinct(CnItemModel, field, filter).exec()
  }
}

export default CnItemDao
