import { QueryOptions } from 'mongoose'
import { UserModel } from './user.model'
import { UserDoc, UserDocPojo, UserFilter, UserProps, UserUpdate } from './user'
import Curd from '@/lib/odm/curd'
import mongodb from 'mongodb'

class UserDao {
  public static create(createDoc: UserProps) {
    return Curd.create(UserModel, createDoc)
  }

  public static createMany(createDocs: UserProps[]) {
    return Curd.insertMany(UserModel, createDocs)
  }

  public static findDocsByFilter(filter: UserFilter, projection?: unknown, options?: QueryOptions): Promise<UserDoc[]> {
    return Curd.find(UserModel, filter, projection, options).exec()
  }

  public static findPojosByFilter(
    filter: UserFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<UserDocPojo[]> {
    return Curd.find(UserModel, filter, projection, options).lean().exec()
  }

  public static findOneDocByFilter(filter: UserFilter, projection?: unknown, options?: QueryOptions): Promise<UserDoc> {
    return Curd.findOne(UserModel, filter, projection, options).exec()
  }

  public static findOnePojoByFilter(
    filter: UserFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<UserDocPojo> {
    return Curd.findOne(UserModel, filter, projection, options).lean().exec()
  }

  public static findOneDocAndUpdate(
    filter: UserFilter,
    updateDoc: UserUpdate,
    options?: QueryOptions
  ): Promise<UserDoc> {
    return Curd.findOneAndUpdate(UserModel, filter, updateDoc, options).exec()
  }

  public static findOnePojoAndUpdate(
    filter: UserFilter,
    updateDoc: UserUpdate,
    options?: QueryOptions
  ): Promise<UserDocPojo> {
    return Curd.findOneAndUpdate(UserModel, filter, updateDoc, options).lean().exec()
  }

  public static updateMany(
    filter: UserFilter,
    updateDoc: UserUpdate,
    options?: QueryOptions
  ): Promise<mongodb.UpdateResult> {
    return Curd.updateMany(UserModel, filter, updateDoc, options).exec()
  }

  public static findOneDocAndDelete(filter: UserFilter, options?: QueryOptions) {
    return Curd.findOneAndDelete(UserModel, filter, options).exec()
  }

  public static findOnePojoAndDelete(filter: UserFilter, options?: QueryOptions) {
    return Curd.findOneAndDelete(UserModel, filter, options).lean().exec()
  }

  public static deleteMany(filter: UserFilter): Promise<mongodb.DeleteResult> {
    return Curd.deleteMany(UserModel, filter).exec()
  }

  public static countDocuments(filter: UserFilter) {
    return Curd.countDocuments(UserModel, filter).exec()
  }

  public static distinct(field: string, filter: UserFilter) {
    return Curd.distinct(UserModel, field, filter).exec()
  }
}

export default UserDao
