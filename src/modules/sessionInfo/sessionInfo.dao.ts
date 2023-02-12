import { QueryOptions } from 'mongoose'
import { SessionInfoModel } from '@/modules/sessionInfo/sessionInfo.model'
import {
  SessionInfoDoc,
  SessionInfoDocPojo,
  SessionInfoFilter,
  SessionInfoProps,
  SessionInfoUpdate
} from '@/modules/sessionInfo/sessionInfo'
import Curd from '@/lib/odm/curd'
import mongodb from 'mongodb'

class SessionInfoDao {
  public static create(createDoc: SessionInfoProps) {
    return Curd.create(SessionInfoModel, createDoc)
  }

  public static createMany(createDocs: SessionInfoProps[]) {
    return Curd.insertMany(SessionInfoModel, createDocs)
  }

  public static findDocsByFilter(
    filter: SessionInfoFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<SessionInfoDoc[]> {
    return Curd.find(SessionInfoModel, filter, projection, options).exec()
  }

  public static findPojosByFilter(
    filter: SessionInfoFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<SessionInfoDocPojo[]> {
    return Curd.find(SessionInfoModel, filter, projection, options).lean().exec()
  }

  public static findOneDocByFilter(
    filter: SessionInfoFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<SessionInfoDoc> {
    return Curd.findOne(SessionInfoModel, filter, projection, options).exec()
  }

  public static findOnePojoByFilter(
    filter: SessionInfoFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<SessionInfoDocPojo> {
    return Curd.findOne(SessionInfoModel, filter, projection, options).lean().exec()
  }

  public static findOneDocAndUpdate(
    filter: SessionInfoFilter,
    updateDoc: SessionInfoUpdate,
    options?: QueryOptions
  ): Promise<SessionInfoDoc> {
    return Curd.findOneAndUpdate(SessionInfoModel, filter, updateDoc, options).exec()
  }

  public static findOnePojoAndUpdate(
    filter: SessionInfoFilter,
    updateDoc: SessionInfoUpdate,
    options?: QueryOptions
  ): Promise<SessionInfoDocPojo> {
    return Curd.findOneAndUpdate(SessionInfoModel, filter, updateDoc, options).lean().exec()
  }

  public static updateMany(
    filter: SessionInfoFilter,
    updateDoc: SessionInfoUpdate,
    options?: QueryOptions
  ): Promise<mongodb.UpdateResult> {
    return Curd.updateMany(SessionInfoModel, filter, updateDoc, options).exec()
  }

  public static findOneDocAndDelete(filter: SessionInfoFilter, options?: QueryOptions) {
    return Curd.findOneAndDelete(SessionInfoModel, filter, options).exec()
  }

  public static findOnePojoAndDelete(filter: SessionInfoFilter, options?: QueryOptions) {
    return Curd.findOneAndDelete(SessionInfoModel, filter, options).lean().exec()
  }

  public static deleteMany(filter: SessionInfoFilter): Promise<mongodb.DeleteResult> {
    return Curd.deleteMany(SessionInfoModel, filter).exec()
  }

  public static countDocuments(filter: SessionInfoFilter) {
    return Curd.countDocuments(SessionInfoModel, filter).exec()
  }

  public static distinct(field: string, filter: SessionInfoFilter) {
    return Curd.distinct(SessionInfoModel, field, filter).exec()
  }
}

export default SessionInfoDao
