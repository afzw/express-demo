import Curd from '@/lib/odm/curd'
import { QueryOptions } from 'mongoose'
import { CnItemDoc, CnItemDocPojo, CnItemFilter, CnItemProps, CnItemUpdate } from '@/custom/cn/modules/item/item'
import CnItemModel from '@/custom/cn/modules/item/item.model'
import mongodb from 'mongodb'
import { injectable } from 'inversify'
import { ItemDao } from '@/modules/item/item.dao'

/** 【cn-item】Dao层操作 */
@injectable()
class CnItemDao implements ItemDao {
  public create(createDoc: CnItemProps) {
    return Curd.create(CnItemModel, createDoc)
  }

  public createMany(createDocs: CnItemProps[]) {
    return Curd.insertMany(CnItemModel, createDocs)
  }

  public findDocsByFilter(filter: CnItemFilter, projection?: unknown, options?: QueryOptions): Promise<CnItemDoc[]> {
    return Curd.find(CnItemModel, filter, projection, options).exec()
  }

  public findPojosByFilter(
    filter: CnItemFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<CnItemDocPojo[]> {
    return Curd.find(CnItemModel, filter, projection, options).lean().exec()
  }

  public findOneDocByFilter(filter: CnItemFilter, projection?: unknown, options?: QueryOptions): Promise<CnItemDoc> {
    return Curd.findOne(CnItemModel, filter, projection, options).exec()
  }

  public findOnePojoByFilter(
    filter: CnItemFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<CnItemDocPojo> {
    return Curd.findOne(CnItemModel, filter, projection, options).lean().exec()
  }

  public findOneDocAndUpdate(
    filter: CnItemFilter,
    updateDoc: CnItemUpdate,
    options?: QueryOptions
  ): Promise<CnItemDoc> {
    return Curd.findOneAndUpdate(CnItemModel, filter, updateDoc, options).exec()
  }

  public findOnePojoAndUpdate(
    filter: CnItemFilter,
    updateDoc: CnItemUpdate,
    options?: QueryOptions
  ): Promise<CnItemDocPojo> {
    return Curd.findOneAndUpdate(CnItemModel, filter, updateDoc, options).lean().exec()
  }

  public updateMany(
    filter: CnItemFilter,
    updateDoc: CnItemUpdate,
    options?: QueryOptions
  ): Promise<mongodb.UpdateResult> {
    return Curd.updateMany(CnItemModel, filter, updateDoc, options).exec()
  }

  public findOneDocAndDelete(filter: CnItemFilter, options?: QueryOptions) {
    return Curd.findOneAndDelete(CnItemModel, filter, options).exec()
  }

  public findOnePojoAndDelete(filter: CnItemFilter, options?: QueryOptions) {
    return Curd.findOneAndDelete(CnItemModel, filter, options).lean().exec()
  }

  public deleteMany(filter: CnItemFilter): Promise<mongodb.DeleteResult> {
    return Curd.deleteMany(CnItemModel, filter).exec()
  }

  public countDocuments(filter: CnItemFilter) {
    return Curd.countDocuments(CnItemModel, filter).exec()
  }

  public distinct(field: string, filter: CnItemFilter) {
    return Curd.distinct(CnItemModel, field, filter).exec()
  }
}

export { CnItemDao }
