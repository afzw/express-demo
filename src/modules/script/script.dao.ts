import { QueryOptions } from 'mongoose'
import { ScriptDoc, ScriptDocPojo, ScriptFilter, ScriptProps, ScriptUpdate } from './script'
import ScriptModel from './script.model'
import Curd from '@/lib/odm/curd'
import mongodb from 'mongodb'

class ScriptDao {
  public static create(createDoc: ScriptProps) {
    return Curd.create(ScriptModel, createDoc)
  }

  public static createMany(createDocs: ScriptProps[]) {
    return Curd.insertMany(ScriptModel, createDocs)
  }

  public static findDocsByFilter(
    filter: ScriptFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<ScriptDoc[]> {
    return Curd.find(ScriptModel, filter, projection, options).exec()
  }

  public static findPojosByFilter(
    filter: ScriptFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<ScriptDocPojo[]> {
    return Curd.find(ScriptModel, filter, projection, options).lean().exec()
  }

  public static findOneDocByFilter(
    filter: ScriptFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<ScriptDoc> {
    return Curd.findOne(ScriptModel, filter, projection, options).exec()
  }

  public static findOnePojoByFilter(
    filter: ScriptFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<ScriptDocPojo> {
    return Curd.findOne(ScriptModel, filter, projection, options).lean().exec()
  }

  public static findOneDocAndUpdate(
    filter: ScriptFilter,
    updateDoc: ScriptUpdate,
    options?: QueryOptions
  ): Promise<ScriptDoc> {
    return Curd.findOneAndUpdate(ScriptModel, filter, updateDoc, options).exec()
  }

  public static findOnePojoAndUpdate(
    filter: ScriptFilter,
    updateDoc: ScriptUpdate,
    options?: QueryOptions
  ): Promise<ScriptDocPojo> {
    return Curd.findOneAndUpdate(ScriptModel, filter, updateDoc, options).lean().exec()
  }

  public static updateMany(
    filter: ScriptFilter,
    updateDoc: ScriptUpdate,
    options?: QueryOptions
  ): Promise<mongodb.UpdateResult> {
    return Curd.updateMany(ScriptModel, filter, updateDoc, options).exec()
  }

  public static findOneDocAndDelete(filter: ScriptFilter, options?: QueryOptions) {
    return Curd.findOneAndDelete(ScriptModel, filter, options).exec()
  }

  public static findOnePojoAndDelete(filter: ScriptFilter, options?: QueryOptions) {
    return Curd.findOneAndDelete(ScriptModel, filter, options).lean().exec()
  }

  public static deleteMany(filter: ScriptFilter): Promise<mongodb.DeleteResult> {
    return Curd.deleteMany(ScriptModel, filter).exec()
  }

  public static countDocuments(filter: ScriptFilter) {
    return Curd.countDocuments(ScriptModel, filter).exec()
  }

  public static distinct(field: string, filter: ScriptFilter) {
    return Curd.distinct(ScriptModel, field, filter).exec()
  }
}

export default ScriptDao
