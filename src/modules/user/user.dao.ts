import { QueryOptions } from "mongoose";
import { UserModel } from "./user.model";
import { UserDoc, UserFilter, UserProps, UserUpdate } from "./user";
import Curd from '@/lib/odm/curd'

const UserDao = {
  /**
   * 新建用户文档
   * @param createDoc 用户文档
   * @returns 新建的用户文档
   */
  create(userInfo: UserProps): Promise<UserDoc> {
    return Curd.create(UserModel, userInfo)
  },

  createMany: function (createDocs: UserProps[]) {
    return Curd.insertMany(UserModel, createDocs)
  },

  findDocsByFilter: function (filter: UserFilter, projection?: unknown, options?: QueryOptions): Promise<UserDoc[]> {
    return Curd.find(UserModel, filter, projection, options).exec()
  },

  findObjsByFilter: function (filter: UserFilter, projection?: unknown, options?: QueryOptions): Promise<UserProps[]> {
    return Curd.find(UserModel, filter, projection, options).lean().exec()
  },

  findOneDocByFilter: function (filter: UserFilter, projection?: unknown, options?: QueryOptions): Promise<UserDoc> {
    return Curd.findOne(UserModel, filter, projection, options).exec()
  },

  findOneObjByFilter: function (filter: UserFilter, projection?: unknown, options?: QueryOptions): Promise<UserProps> {
    return Curd.findOne(UserModel, filter, projection, options).lean().exec()
  },

  findOneDocAndUpdate: function (filter: UserFilter, updateDoc: UserUpdate, options?: QueryOptions): Promise<UserDoc> {
    return Curd.findOneAndUpdate(UserModel, filter, updateDoc, options).exec()
  },

  findOneObjAndUpdate: function (filter: UserFilter, updateDoc: UserUpdate, options?: QueryOptions): Promise<UserProps> {
    return Curd.findOneAndUpdate(UserModel, filter, updateDoc, options).lean().exec()
  },

  updateMany: function (filter: UserFilter, updateDoc: UserUpdate, options?: QueryOptions) {
    return Curd.updateMany(UserModel, filter, updateDoc, options).exec()
  },

  findOneDocAndDelete: function (filter: UserFilter, options?: QueryOptions): Promise<UserDoc> {
    return Curd.findOneAndDelete(UserModel, filter, options).exec()
  },

  findOneObjAndDelete: function (filter: UserFilter, options?: QueryOptions): Promise<UserProps> {
    return Curd.findOneAndDelete(UserModel, filter, options).lean().exec()
  },

  deleteMany: function (filter: UserFilter) {
    return Curd.deleteMany(UserModel, filter).exec()
  },

  count: function (filter: UserFilter): Promise<number> {
    return Curd.countDocuments(UserModel, filter).exec()
  },

  distinct: function (field: string, filter: UserFilter) {
    return Curd.distinct(UserModel, field, filter).exec()
  }
}

export default UserDao
